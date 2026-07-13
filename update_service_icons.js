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

// We must use camelCase for multi-word icons because the frontend does:
// charAt(0).toUpperCase() + slice(1)
// So "shoppingCart" -> "ShoppingCart"
const serviceIcons = {
  "amazon a to z": "shoppingCart",
  "video editing": "video",
  "content writing": "penTool",
  "content creation": "sparkles",
  "graphic designing": "palette",
};

async function run() {
  console.log("Fetching services to update icons...");
  const snapshot = await db.collection("services").get();
  
  let updatedCount = 0;
  
  for (const doc of snapshot.docs) {
    const data = doc.data();
    const titleLower = data.title.toLowerCase().trim();
    
    for (const [targetTitle, icon] of Object.entries(serviceIcons)) {
      if (titleLower.includes(targetTitle) || targetTitle.includes(titleLower)) {
        console.log(`Updating "${data.title}" (${doc.id}) with icon: ${icon}`);
        await db.collection("services").doc(doc.id).update({ icon });
        updatedCount++;
        break;
      }
    }
  }
  
  console.log(`Finished. Updated icons for ${updatedCount} services.`);
}

run().catch(console.error);
