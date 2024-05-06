import { NextFetchEvent, NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';
import { Locale, i18n } from '@/i18n.config';
import { CustomMiddleware } from './chain';

const protectedRoute = ['/dashboard'];
    
function getProtectedRoute(protectedPaths: string[], locales: Locale[]) {
  let protectedPathsWithLocale: string[] = [...protectedPaths];

  protectedPaths.forEach((route) => {
    locales.forEach((locale) => {
      protectedPathsWithLocale.push(`/${locale}${route}`);
    });

    protectedPathsWithLocale.push(route);
  });

  return protectedPathsWithLocale;
}


export function authMiddleware(middleware: CustomMiddleware){
  return async(request: NextRequest, event: NextFetchEvent) => {
    const response = NextResponse.next();
    const token = await getToken({ req: request});
    
    // @ts-ignore
    request.nextauth = request.nextauth || {};
  
    // Assign the token value to request.nextauth.token only if it's available
    if (token) {
      // @ts-ignore
      request.nextauth.token = token;
    }

    const pathname = request.nextUrl.pathname;
    const protectedPathsWithLocale = getProtectedRoute(protectedRoute, [
      ...i18n.locales,
    ]);

    if (!token && protectedPathsWithLocale.includes(pathname)) {
      const signInUrl = new URL('/signin', request.url);
      signInUrl.searchParams.set('callbackUrl', pathname);
      return NextResponse.redirect(signInUrl);
    }
    
    // If user is logged in and trying to access sign-in page, redirect to dashboard
    // if (token && (token != null && pathname === '/signin')) {
    //   return NextResponse.redirect('/dashboard');
    // }

    
    
    return middleware(request, event, response);
  }
}