import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const email = "admin@aeronox.com";
  const password = "admin123";

  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) {
    console.log("Admin user already exists:", email);
    return;
  }

  const hashed = await bcrypt.hash(password, 12);
  await prisma.user.create({
    data: { email, password: hashed },
  });

  console.log("✅ Admin user created!");
  console.log("   Email:   ", email);
  console.log("   Password:", password);
  console.log("\n⚠️  Please change these credentials after first login.");
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
