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
      projectId: process.env.FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      privateKey: privateKey,
    }),
  });
}

const db = getFirestore();
const artifactDir = "C:\\Users\\hp\\.gemini\\antigravity-ide\\brain\\475b258a-8beb-4705-839e-ea41263790f7";
const targetDir = path.resolve("public", "images", "services");

const map = {
  "digital pr": "digital_pr_links_1784010290766.png",
  "conversion rate": "conversion_rate_1784010315696.png"
};

async function run() {
  const snapshot = await db.collection("services").get();
  
  for (const doc of snapshot.docs) {
    const data = doc.data();
    const title = data.title.toLowerCase();
    
    for (const [key, filename] of Object.entries(map)) {
      if (title.includes(key)) {
        const sourcePath = path.join(artifactDir, filename);
        const targetPath = path.join(targetDir, filename);
        
        fs.copyFileSync(sourcePath, targetPath);
        console.log(`Copied ${filename} to public/images/services/`);
        
        const imageUrl = `/images/services/${filename}`;
        await db.collection("services").doc(doc.id).update({ image: imageUrl });
        console.log(`Updated ${data.title} with image: ${imageUrl}`);
      }
    }
  }
}

run().catch(console.error);
