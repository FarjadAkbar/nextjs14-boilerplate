import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { login, refreshToken } from "@/hooks/auth/index";

interface CredentialInput {
  email: string;
  password: string;
};

interface Token {
  token: string;
  accessTokenExpires: number;
  refreshToken: string;
  error?: string;
}

async function refreshAccessToken(token: Token): Promise<Token> {
  try {
    const refreshedTokens = await refreshToken(token.token)    
    return {
      token: refreshedTokens.token,
      accessTokenExpires: Date.now() + 10 * 1000,
      refreshToken: refreshedTokens.refreshToken,
    }
  } catch (error) {
    return {
      ...token,
      error: "RefreshAccessTokenError",
    }
  }
}

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: {
          label: "Email",
          type: "text",
          placeholder: "johndoe@test.com",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials: CredentialInput | undefined): Promise<any>  {
        try {
          if (!credentials) {
            throw new Error("Credentials are undefined");
          }
      
          const resp = await login({
            email: credentials.email,
            password: credentials.password,
          });
      
          // Assuming your performLogin function returns a response similar to the provided response structure
          const { token, refreshToken, user } = resp;
          return {
            token,
            refreshToken,
            user,
          };
        } catch (e: any) {
          return Promise.reject(new Error(e?.message || "Something Wrong"));
        }
      }
      
    })
  ],
  pages: {
    signIn: "/auth/signin",
    newUser: "/auth/signup",
  },
  callbacks: {
    async signIn({ user }: any) {
      if (user?.token) {
        return Promise.resolve(true);
      }
      return Promise.resolve(false);
    },
    async session({ session, token }: any) {
      if (!token.token) {
        return Promise.resolve(session);
      }
      
      session.token = token.token;
      session.user = token.user;
      
      return Promise.resolve(session);
    },
    async jwt({ token, user }: any) {
      if (user?.token) {
        token = {
          token: user.token,
          accessTokenExpires: Date.now() + 10 * 1000,
          refreshToken: user.refreshToken,
          user: user,
        };
      }

      // if (token.token && !token.user) {
      //   token.user = await getUser(token.token as string);
      // }

      if (Date.now() < token.accessTokenExpires) {
        return token
      }
      return refreshAccessToken(token)
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
