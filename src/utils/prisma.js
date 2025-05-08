// utils/prisma.ts
import { PrismaClient } from "@/generated/prisma"; // ← your custom output
let prisma = PrismaClient;

if (process.env.NODE_ENV === "production") {
  prisma = new PrismaClient();
} else {
  if (!globalThis.prisma) globalThis.prisma = new PrismaClient();
  prisma = globalThis.prisma;
}

export { prisma };
