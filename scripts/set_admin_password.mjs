import { initializeApp, cert, getApps } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";
import bcrypt from "bcryptjs";
import * as fs from "fs";
import * as path from "path";

const envPath = path.resolve(".env.local");
if (fs.existsSync(envPath)) {
  const envConfig = fs.readFileSync(envPath, "utf8");
  envConfig.split("\n").forEach((line) => {
    const match = line.match(/^([^=]+)=(.*)$/);
    if (match) {
      const key = match[1].trim();
      const value = match[2].trim().replace(/^['"]|['"]$/g, '');
      process.env[key] = value;
    }
  });
}

const serviceAccount = {
  projectId: process.env.FIREBASE_PROJECT_ID,
  clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
  privateKey: process.env.FIREBASE_PRIVATE_KEY ? process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n') : undefined,
};

if (!getApps().length) {
  initializeApp({
    credential: cert(serviceAccount),
  });
}

const db = getFirestore();

async function setAdminPassword() {
  const email = "admin@aeronoxsolutions.com";
  const password = "AdminPassword2026!";
  const hashedPassword = await bcrypt.hash(password, 10);
  
  const usersRef = db.collection("users");
  const snapshot = await usersRef.where("email", "==", email).get();
  
  if (snapshot.empty) {
    await usersRef.add({
      email,
      password: hashedPassword,
      createdAt: new Date(),
    });
    console.log(`Created new admin user: ${email}`);
  } else {
    const userDoc = snapshot.docs[0];
    await userDoc.ref.update({
      password: hashedPassword
    });
    console.log(`Updated password for existing admin: ${email}`);
  }
  
  console.log(`Password is set to: ${password}`);
}

setAdminPassword().catch(console.error);
