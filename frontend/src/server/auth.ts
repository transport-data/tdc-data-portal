/* eslint-disable @typescript-eslint/non-nullable-type-assertion-style */

import { type GetServerSidePropsContext } from "next";
import {
  getServerSession,
  type NextAuthOptions,
  type DefaultSession,
  type User,
} from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { env } from "@/env.mjs";
import type { CkanResponse } from "@schema/ckan.schema";
import CkanRequest from "@datopian/ckan-api-client-js";

/**
 * Module augmentation for `next-auth` types. Allows us to add custom properties to the `session`
 * object and keep type safety.
 *
 * @see https://next-auth.js.org/getting-started/typescript#module-augmentation
 */
declare module "next-auth" {
  interface Session extends DefaultSession {
    user: DefaultSession["user"] & {
      id: string;
      email: string;
      username: string;
      apikey: string;
      sysadmin: boolean;
    };
  }

  interface User {
    email: string;
    username: string;
    apikey: string;
    frontend_token: string;
    sysadmin: boolean;
    onboarding_completed?: boolean;
  }
}

/**
 * Options for NextAuth.js used to configure adapters, providers, callbacks, etc.
 *
 * @see https://next-auth.js.org/configuration/options
 */
export const authOptions: NextAuthOptions = {
  callbacks: {
    jwt({ token, user }) {
      if (user) {
        token.apikey = user.apikey;
        token.sysadmin = user.sysadmin
      }
      return token;
    },
    session: ({ session, token }) => {
      return {
        ...session,
        user: {
          ...session.user,
          apikey: token.apikey ? token.apikey : "",
          id: token.sub,
          sysadmin: token.sysadmin
        },
      };
    },
  },
  pages: {
    signIn: "/auth/signin",
  },
  providers: [
    CredentialsProvider({
      // The name to display on the sign in form (e.g. "Sign in with...")
      name: "Credentials",
      // `credentials` is used to generate a form on the sign in page.
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        username: { label: "Username", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, _req) {
        if (!credentials) return null;
        const user = await CkanRequest.post<CkanResponse<User>>("user_login", {
          json: {
            id: credentials.username,
            password: credentials.password,
            client_secret: env.FRONTEND_AUTH_SECRET
          },
        });

        if (user.result.id) {
          return {
            ...user.result,
            image: "",
            apikey: user.result.frontend_token,
            sysadmin: user.result.sysadmin
          };
        } else {
          return Promise.reject(
            "/auth/signin?error=Could%20not%20login%20user%20please%20check%20your%20password%20and%20username"
          );
        }
      },
    }),
  ],
};

/**
 * Wrapper for `getServerSession` so that you don't need to import the `authOptions` in every file.
 *
 * @see https://next-auth.js.org/configuration/nextjs
 */
export const getServerAuthSession = (ctx: {
  req: GetServerSidePropsContext["req"];
  res: GetServerSidePropsContext["res"];
}) => {
  return getServerSession(ctx.req, ctx.res, authOptions);
};
