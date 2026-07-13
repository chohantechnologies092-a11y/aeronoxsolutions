import { initializeApp, cert, getApps } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";
import * as fs from "fs";
import * as path from "path";

const envPath = path.resolve(".env.local");
if (fs.existsSync(envPath)) {
  const envFile = fs.readFileSync(envPath, "utf8");
  envFile.split("\n").forEach((line) => {
    const match = line.match(/^\s*([\w.-]+)\s*=\s*(.*)?\s*$/);
    if (match) {
      let key = match[1];
      let value = match[2] || "";
      if (value.startsWith('"') && value.endsWith('"')) {
        value = value.substring(1, value.length - 1);
      }
      process.env[key] = value;
    }
  });
}

let privateKey = process.env.FIREBASE_PRIVATE_KEY;
if (privateKey) {
  privateKey = privateKey.replace(/^"|"$/g, "").replace(/\\n/g, "\n");
}

if (!getApps().length) {
  initializeApp({
    credential: cert({
      project_id: process.env.FIREBASE_PROJECT_ID,
      client_email: process.env.FIREBASE_CLIENT_EMAIL,
      private_key: privateKey,
    }),
  });
}

const db = getFirestore();

const serviceColors = {
  "amazon a to z": "#f59e0b",     // Amber/Orange (Amazon style)
  "content creation": "#8b5cf6",  // Purple
  "content making": "#8b5cf6",    // Just in case it's named this
};

async function run() {
  console.log("Fetching services...");
  const snapshot = await db.collection("services").get();
  
  let updatedCount = 0;
  
  for (const doc of snapshot.docs) {
    const data = doc.data();
    const titleLower = data.title.toLowerCase().trim();
    
    for (const [targetTitle, color] of Object.entries(serviceColors)) {
      if (titleLower.includes(targetTitle) || targetTitle.includes(titleLower)) {
        console.log(`Updating "${data.title}" (${doc.id}) with color ${color}`);
        await db.collection("services").doc(doc.id).update({ color });
        updatedCount++;
        break;
      }
    }
  }
  
  console.log(`Finished. Updated ${updatedCount} services.`);
}

run().catch(console.error);
