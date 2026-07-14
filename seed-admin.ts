import { config } from "dotenv";
config();

import { db } from "./src/lib/firebase-admin";
import bcrypt from "bcryptjs";

async function main() {
  console.log("Creating Admin User...");

  const email = "admin@aeronox.com";
  const password = "password123";
  const hashedPassword = await bcrypt.hash(password, 10);

  // Check if exists
  const snapshot = await db.collection("users").where("email", "==", email).get();
  
  if (snapshot.empty) {
    await db.collection("users").add({
      email: email,
      password: hashedPassword,
      name: "Admin User",
      role: "admin",
      createdAt: new Date().toISOString()
    });
    console.log(`Admin user created: ${email}`);
  } else {
    // Update existing
    await snapshot.docs[0].ref.update({
      password: hashedPassword
    });
    console.log(`Admin user updated: ${email}`);
  }

  process.exit(0);
}

main().catch(console.error);
