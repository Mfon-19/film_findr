import NextAuth from "next-auth/next";
import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";
import { authSchema } from "./lib/zod";
import { login, refreshAccessToken } from "./lib/actions";
import { NextAuthOptions } from "next-auth";

export const authOptions = {
  providers: [
    Credentials({
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials) => {
        try {
          const { email, password } = await authSchema
            .omit({ username: true })
            .parseAsync(credentials);

          const response = await login({ email, password });
          if (!response) return null;
          console.log(
            `Login response from spring: ${JSON.stringify(response)}`
          );

          return {
            id: response.user.id.toString(),
            email: response.user.email,
            username: response.user.username,
            accessToken: response.accessToken,
            refreshToken: response.refreshToken,
            accessTokenExpires: Date.now() + response.accessExpiresIn * 1000,
          };
        } catch (error) {
          console.error("Authentication error: ", error);
          return null;
        }
      },
    }),
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  session: { strategy: "jwt", maxAge: 30 * 24 * 60 * 60 },
  pages: {
    signIn: "/login",
  },
  callbacks: {
    jwt: async ({ token, user }) => {
      if (user) {
        token.id = user.id.toString();
        token.accessToken = user.accessToken!;
        token.refreshToken = user.refreshToken!;
        token.accessTokenExpires = user.accessTokenExpires;
        return token;
      }
      
      if (Date.now() < (token.accessTokenExpires as number) - 60_000) {
        return token;
      }
      return await refreshAccessToken(token);
    },
    session: async ({ session, token }) => {
      if (token) {
        session.user.id = token.id as string;
        session.accessToken = token.accessToken as string;
        session.accessTokenExpires = token.accessTokenExpires as string;
      }
      return session;
    },
    // redirect({ url, baseUrl }) {
    //   // Allows relative URLs
    //   if (url.startsWith("/")) return `${baseUrl}${url}`;
    //   // Allows callback URLs on the same origin
    //   else if (new URL(url).origin === baseUrl) return url;
    //   return baseUrl;
    // },

    // TODO: create google authentication flow
    // async signIn({ account, profile }) {
    //   if (account?.provider === "google") {
    //     const user = await getUser({ email: profile?.email as string });

    //     if (!user) await createUser({ fullName: profile?.name as string, email: profile?.email as string, password: "google signin" });
    //   }

    //   return true;
    // },
  },
} satisfies NextAuthOptions;

const handler = NextAuth(authOptions);
export default handler;
