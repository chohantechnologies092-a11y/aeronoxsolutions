import { initializeApp, cert, getApps } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";
import * as fs from "fs";
import * as path from "path";

// Load environment variables manually since dotenv might not be installed
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

// Color mappings based on common vibrant design choices
const serviceColors = {
  "graphic designing": "#ec4899", // Pink
  "content writing": "#3b82f6",   // Blue
  "content making": "#8b5cf6",    // Purple
  "video editing": "#ef4444",     // Red
};

const serviceIcons = {
  "graphic designing": "pen-tool",
  "content writing": "pen-line",
  "content making": "clapperboard",
  "video editing": "video",
};

async function run() {
  console.log("Fetching services...");
  const snapshot = await db.collection("services").get();
  
  let updatedCount = 0;
  
  for (const doc of snapshot.docs) {
    const data = doc.data();
    const titleLower = data.title.toLowerCase().trim();
    
    // Check if the title matches any of our target services
    for (const [targetTitle, color] of Object.entries(serviceColors)) {
      if (titleLower.includes(targetTitle) || targetTitle.includes(titleLower)) {
        const updates = {};
        
        // Update color if it's black, default, or not set properly
        if (!data.color || data.color === "#000000" || data.color === "#24182e" || data.color === "var(--accent)") {
          updates.color = color;
        } else {
          // Force update to make it vibrant anyway
          updates.color = color;
        }
        
        if (Object.keys(updates).length > 0) {
          console.log(`Updating "${data.title}" (${doc.id}) with color ${color}`);
          await db.collection("services").doc(doc.id).update(updates);
          updatedCount++;
        }
        break;
      }
    }
  }
  
  console.log(`Finished. Updated ${updatedCount} services.`);
}

run().catch(console.error);
