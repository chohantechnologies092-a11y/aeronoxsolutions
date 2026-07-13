import { initializeApp, cert, getApps } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";
import * as fs from "fs";
import * as path from "path";

// Load environment variables manually
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

function truncateToThreeLines(text) {
  if (!text) return text;
  
  // Clean up any extra whitespace
  text = text.trim();
  
  // 140 chars is roughly 3-4 lines on a typical desktop card
  const MAX_CHARS = 140;
  
  if (text.length <= MAX_CHARS) {
    return text;
  }
  
  // Try to cut at the end of a sentence if it's within limits
  const firstSentenceMatch = text.match(/^[^.!?]+[.!?]/);
  if (firstSentenceMatch && firstSentenceMatch[0].length > 50 && firstSentenceMatch[0].length <= MAX_CHARS + 20) {
    return firstSentenceMatch[0].trim();
  }
  
  // Otherwise, cut at the last word within the limit
  let truncated = text.substring(0, MAX_CHARS);
  const lastSpace = truncated.lastIndexOf(' ');
  if (lastSpace > 0) {
    truncated = truncated.substring(0, lastSpace);
  }
  
  // Remove trailing punctuation before adding ellipsis
  truncated = truncated.replace(/[.,;:\-]$/, '');
  
  return truncated + "...";
}

async function run() {
  console.log("Fetching services to truncate short descriptions...");
  const snapshot = await db.collection("services").get();
  
  let updatedCount = 0;
  
  for (const doc of snapshot.docs) {
    const data = doc.data();
    const currentDesc = data.shortDescription || "";
    
    if (currentDesc.length > 145) { // Only update if it's actually long
      const newDesc = truncateToThreeLines(currentDesc);
      
      console.log(`\nService: ${data.title}`);
      console.log(`OLD (${currentDesc.length} chars): ${currentDesc}`);
      console.log(`NEW (${newDesc.length} chars): ${newDesc}`);
      
      await db.collection("services").doc(doc.id).update({ 
        shortDescription: newDesc,
        updatedAt: new Date().toISOString()
      });
      updatedCount++;
    } else {
      console.log(`\nService: ${data.title} - Already short enough (${currentDesc.length} chars)`);
    }
  }
  
  console.log(`\nFinished. Truncated descriptions for ${updatedCount} services.`);
}

run().catch(console.error);
