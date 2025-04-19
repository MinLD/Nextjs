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
        email: {},
        password: {},
      },
      authorize: async (credentials) => {
        console.log("🔑 credentials:", credentials); // kiểm tra log
        const res = await sendRequest<IBackendRes<ILogin>>({
          method: "POST",
          body: {
            username: credentials.email,
            password: credentials.password,
          },
          url: "http://localhost:1000/api/v1/auth/login",
        });
        console.log("📦 Login API response:", res);

        if (res.statusCode === 201) {
          return {
            id: res?.data?._id,
            name: res?.data?.name,
            email: res?.data?.email,
            access_token: res?.data?.access_token,
          };
        }
        //sai mật khẩu
        else if (+res.statusCode === 401) {
          // throw new InvalidEmailPasswordError();
          throw new Error("Email hoặc mật khẩu không đúng");
        } else if (+res.statusCode === 400) {
          throw new Error("Tài khoản chưa được xác thực");
          // throw new InactiveAccountError();
        } else {
          // throw new Error("Internal server error");
          throw new Error("Lỗi không xác định");
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
        console.log("🧠 user in jwt:", user);
        token.user = user as IUser;
      }
      return token;
    },
    session({ session, token }) {
      console.log("💬 token.user in session callback:", token.user);
      (session.user as IUser) = token.user;
      return session;
    },
  },
});
