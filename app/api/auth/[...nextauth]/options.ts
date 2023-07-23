import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";
import NextAuth, { NextAuthOptions } from "next-auth";

import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";
import EmailProvider from "next-auth/providers/email";
import { prisma } from "@/lib/prisma";
import sendVerificationRequest from "@/lib/email";

export const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET!,
  debug: process.env.NODE_ENV === "development",
  pages: {
    signIn: "/auth/signin",
  },
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
    updateAge: 24 * 60 * 60, // 24 hours
  },
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
    }),

    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    // EmailProvider({
    //   server: process.env.EMAIL_SERVER,
    //   from: process.env.EMAIL_FROM,
    //   sendVerificationRequest: ({
    //     identifier: email,
    //     url,
    //     provider,
    //     theme,
    //     expires,
    //     token,
    //   }) => {
    //     sendVerificationRequest({
    //       identifier: email,
    //       url,
    //       provider,
    //       theme,
    //       expires,
    //       token,
    //     });
    //   },
    // }),
  ],
  adapter: PrismaAdapter(prisma),
  events: {
    async createUser(message) {
      console.log("createUser", { message }, message.user.email);
    },
  },
};
