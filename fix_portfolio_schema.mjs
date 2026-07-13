import { initializeApp, cert, getApps } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";
import * as fs from "fs";
import * as path from "path";
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Initialize Firebase Admin
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

if (!serviceAccount.projectId || !serviceAccount.clientEmail || !serviceAccount.privateKey) {
  console.error("Missing Firebase credentials in .env.local");
  process.exit(1);
}

if (!getApps().length) {
  initializeApp({
    credential: cert(serviceAccount),
  });
}

const db = getFirestore();

async function fixProjectSchema() {
  console.log("Fixing portfolio schema...");
  
  const snapshot = await db.collection("projects").get();
  let count = 0;
  
  for (const doc of snapshot.docs) {
    const data = doc.data();
    
    // Map my seeded fields to the fields the frontend expects
    const description = data.description || data.shortDescription || "";
    const tags = data.tags || data.category || "";
    
    // Build an HTML content field from the challenge, solution, results
    let content = data.content || "";
    if (!data.content && data.challenge) {
      content = `
        <h2>The Challenge</h2>
        <p>${data.challenge}</p>
        <h2>Our Solution</h2>
        <p>${data.solution}</p>
        <h2>Results</h2>
        <ul>
          ${(data.results || []).map((r) => `<li>${r}</li>`).join('')}
        </ul>
      `;
    }
    
    await doc.ref.update({
      description,
      tags,
      content,
      featured: data.featured || true,
    });
    
    console.log(`Updated schema for ${doc.id}`);
    count++;
  }
  
  console.log(`Successfully updated ${count} project schemas!`);
}

fixProjectSchema().catch(console.error);
