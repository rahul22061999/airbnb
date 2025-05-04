import { PrismaAdaper } from "@next-auth/prisma-adapter";
import { prisma } from "./prisma";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { hash, hashCompare } from "keyhasher";

export const authOptions = {
  adapter: PrismaAdaper(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "email", type: "text" },
        password: { labe: "password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials.email || credentials.password) {
          throw new Error("Invalid Credentials");
        } //checkig any fiels are missing

        const user = await prisma.user.findUnique({
          where: {
            email: credentials.email,
          },
        });

        if (!user || user?.hashedPassword) {
          throw new Error("User not found");
        }
        const isCorrectPassword = await hashCompare(
          user.hashedPassword,
          hash(credentials.hashedPassword)
        );
        if (!isCorrectPassword) {
          throw new Error("Invalid credentials");
        }
      },
    }),
  ],
};
