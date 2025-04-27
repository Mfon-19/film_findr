/* eslint-disable @typescript-eslint/no-explicit-any */
import Google from "next-auth/providers/google";
import { OAuthConfig } from "next-auth/providers/oauth";

const googleProvider = Google({
  clientId: process.env.GITHUB_ID!,
  clientSecret: process.env.GITHUB_SECRET!,
});

const springOAuthProvider: OAuthConfig<any> = {
  id: "spring",
  name: "Spring Auth Server",
  type: "oauth",
  version: "2",
  authorization: "http://localhost:9000/oauth2/authorize",
  token: "http://localhost:9000/oauth2/token",
  userinfo: "http://localhost:9000/userinfo",
  clientId: process.env.SPRING_CLIENT_ID,
  clientSecret: process.env.SPRING_CLIENT_SECRET,
  clientAuthMethod: "client_secret_basic",
  redirectUri: "http://localhost:3000/api/auth/callback",
  scope: "openid",
  idToken: true,
  issuer: "http://localhost:9000",
  // jwks_endpoint: 'http://localhost:9000/oauth2/jwks',
  wellKnown: "http://localhost:9000/.well-known/openid-configuration",
  profile: (profile: any) => {
    console.log("profile", profile);
    return {
      id: profile.user.id.toString(),
      name: profile.user.username,
      email: profile.user.email,
    };
  },
};

export const authOptions = {
  providers: [googleProvider, springOAuthProvider],
};
