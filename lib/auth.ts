import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import connectDB from "./mongodb";
import User from "./models/User";

export const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        uniqueId: { label: "Unique ID", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          if (!credentials?.uniqueId || !credentials?.password) {
            console.log("Missing credentials");
            return null;
          }

          await connectDB();

          const user = await User.findOne({
            uniqueId: credentials.uniqueId,
          });

          if (!user) {
            console.log("User not found:", credentials.uniqueId);
            return null;
          }

          const isPasswordValid = await bcrypt.compare(
            credentials.password,
            user.passwordHash
          );

          if (!isPasswordValid) {
            console.log("Invalid password for user:", credentials.uniqueId);
            return null;
          }

          return {
            id: user._id.toString(),
            name: user.fullName,
            email: user.email,
            uniqueId: user.uniqueId,
            department: user.department,
          };
        } catch (error) {
          console.error("Auth error:", error);
          return null;
        }
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.uniqueId = user.uniqueId as string;
        token.department = user.department as string;
      }
      return token;
    },
    async session({ session, token }) {
      if (token && session.user) {
        session.user.id = token.sub!;
        session.user.uniqueId = token.uniqueId as string;
        session.user.department = token.department as string;
      }
      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
};
