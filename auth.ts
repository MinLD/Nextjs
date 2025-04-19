import { sendRequest } from "@/app/(util)/api";
import {
  InactiveAccountError,
  InvalidEmailPasswordError,
} from "@/app/(util)/errors";

import { IUser } from "@/app/types/next-auth";
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        username: {},
        password: {},
      },
      authorize: async (credentials) => {
        console.log("🔑 credentials:", credentials); // kiểm tra log
        const res = await sendRequest<IBackendRes<ILogin>>({
          method: "POST",
          body: {
            username: credentials.username,
            password: credentials.password,
          },
          url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/auth/login`,
        });
        console.log("📦 Login API response:", res);

        if (res.statusCode === 201) {
          return {
            _id: res.data?.user?._id,
            name: res.data?.user?.name,
            email: res.data?.user?.email,
            access_token: res.data?.access_token,
          };
        } else if (+res.statusCode === 401) {
          throw new InvalidEmailPasswordError();
        } else if (+res.statusCode === 502) {
          throw new InactiveAccountError();
        } else {
          throw new Error("Internal server error");
        }
      },
    }),
  ],

  pages: {
    signIn: "/auth/login",
  },

  callbacks: {
    jwt({ token, user }) {
      if (user) {
        console.log("🔑 user:", user);
        // User is available during sign-in
        token.user = user as IUser;
      }
      return token;
    },
    session({ session, token }) {
      console.log("🔑 session:", session);
      (session.user as IUser) = token.user;
      return session;
    },
    authorized: async ({ auth }) => {
      console.log("🔑 auth:", auth);
      // Logged in users are authenticated,
      //otherwise redirect to login page
      return !!auth;
    },
  },
});
