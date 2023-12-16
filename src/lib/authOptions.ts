// lib/nextauthOptions.ts
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";
import clientPromise from "@/lib/mongobd";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import { AuthOptions } from "next-auth";
import { toast } from "react-hot-toast";
// import { MongoDBAdapter } from "@auth/mongodb-adapter";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const authOptions: AuthOptions = {
  adapter: PrismaAdapter(prisma),

  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID as string,
      clientSecret: process.env.GOOGLE_SECRET as string,
      allowDangerousEmailAccountLinking: true,
      profile(profile) {
        return {
          id: profile.sub,
          name: profile.name,
          email: profile.email,
          image: profile.picture,
          recipes: [],
        };
      },
      // profile(profile) {
      //   return {
      //     // Return all the profile information you need.
      //     // The only truly required field is `id`
      //     // to be able identify the account when added to a database
      //     id: profile.id,
      //     name: profile.name,
      //     email: profile.email,
      //     image: profile.picture,

      //   }
      // }
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
      // allowDangerousEmailAccountLinking: true,
    }),
    CredentialsProvider({
      // The name to display on the sign in form (e.g. "Sign in with...")
      name: "credentials",
      // `credentials` is used to generate a form on the sign in page.
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        // username: { label: "Username", type: "text", placeholder: "jsmith" },
        // password: {
        //   label: "Password",
        //   type: "password",
        //   placeholder: "********",
        // },
        // email: {
        //   label: "Email",
        //   type: "email",
        //   placeholder: "jsmail@email.com",
        // },
      },

      async authorize(credentials: any) {
        if (!credentials?.email || !credentials?.password) {
          return null
        }
        const user = await prisma.user.findUnique({
          where: {
            email: credentials.email,
          },
        });
        if (!user || !user.password) {
          return null;
        }
        const passwordMatch = await bcrypt.compare(
          credentials.password,
          user.password
        );
        if (!passwordMatch) {
          return null
        }
        return user;
      },
    }),
  ],

  session: {
    // strategy: "database",
    strategy: "jwt",
  },

  secret: process.env.NEXTAUTH_SECRET,

  pages: {
    signIn: "/login",
    // newUser: "/regiser",
  },
  callbacks: {
    async signIn({ user, account, profile }) {
      if (account?.provider === "google") {
        const customUser = {
          email: user.email,
          name: user.name,
          image: user.image,
          recipes: ["test"],

          // Set additional custom fields if needed
        };

        return true;
      }
      return true;
    },
  },
  // debug: process.env.NODE_ENV === "development",
};

// import type { OAuthConfig, OAuthUserConfig } from "."

// export interface GoogleProfile extends Record<string, any> {
//   aud: string
//   azp: string
//   email: string
//   email_verified: boolean
//   exp: number
//   family_name: string
//   given_name: string
//   hd: string
//   iat: number
//   iss: string
//   jti: string
//   name: string
//   nbf: number
//   picture: string
//   sub: string
// }

// export default function Google<P extends GoogleProfile>(
//   options: OAuthUserConfig<P>
// ): OAuthConfig<P> {
//   return {
//     id: "google",
//     name: "Google",
//     type: "oauth",
//     wellKnown: "https://accounts.google.com/.well-known/openid-configuration",
//     authorization: { params: { scope: "openid email profile" } },
//     idToken: true,
//     checks: ["pkce", "state"],
//     profile(profile) {
//       return {
//         id: profile.sub,
//         name: profile.name,
//         email: profile.email,
//         image: profile.picture,
//       }
//     },
//     style: { logo: "/google.svg", bg: "#fff", text: "#000" },
//     options,
//   }
// }
