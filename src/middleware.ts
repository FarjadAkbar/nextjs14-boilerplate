import { withAuth } from 'next-auth/middleware';
import createIntlMiddleware from 'next-intl/middleware';
import { NextRequest, NextFetchEvent } from 'next/server';

const locales = ['en', 'de'];

const intlMiddleware = createIntlMiddleware({
  locales,
  defaultLocale: 'de',
  localePrefix: 'as-needed'
});


const authMiddleware = withAuth(
  function onSuccess(request: NextRequest) {
    return intlMiddleware(request);
  },
  {
    callbacks: {
      authorized: ({ token }) => token != null
    },
    pages: {
      signIn: '/signin'
    }
  }
);

export default function middleware(request: NextRequest, event: NextFetchEvent) {
  const protectedRoutes = ['/dashboard']; // Add your protected routes here
  const pathname = request.nextUrl.pathname;

  // If it's a locale-related route, apply internationalization middleware
  if (locales.filter(locale => locale !== 'de').some(locale => pathname.startsWith(`/${locale}/`))) {
    return intlMiddleware(request);
  } else {
    // If it's a protected route, apply authentication middleware
    if (protectedRoutes.some(route => pathname.startsWith(route))) {
      return (authMiddleware as any)(request);
    } else {
      // For all other routes, apply internationalization middleware
      return intlMiddleware(request);
    }
  }
}

export const config = {
  matcher: ['/((?!api|_next|.*\\..*).*)']
};