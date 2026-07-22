import { initializeApp, cert, getApps } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";
import * as fs from "fs";
import * as path from "path";

// Initialize Firebase
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

const artifactDir = "C:\\Users\\hp\\.gemini\\antigravity-ide\\brain\\475b258a-8beb-4705-839e-ea41263790f7";
const targetDir = path.resolve("public", "images", "services");

if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true });
}
const imageMap = {
  "amazon a to z": "amazon_a_to_z",
  "video editing": "video_editing",
  "content writing": "content_writing",
  "content creation": "content_creation",
  "graphic designing": "graphic_designing",
  "technical seo": "technical_seo",
  "performance ads": "performance_ads",
};

async function run() {
  const files = fs.readdirSync(artifactDir);
  const snapshot = await db.collection("services").get();

  for (const doc of snapshot.docs) {
    const data = doc.data();
    const titleLower = data.title.toLowerCase().trim();

    for (const [key, prefix] of Object.entries(imageMap)) {
      if (titleLower.includes(key) || key.includes(titleLower)) {
        // Find the image file
        const imageFile = files.find(f => f.startsWith(prefix) && f.endsWith(".png"));
        if (imageFile) {
          const sourcePath = path.join(artifactDir, imageFile);
          const targetPath = path.join(targetDir, imageFile);
          
          // Copy image
          fs.copyFileSync(sourcePath, targetPath);
          console.log(`Copied ${imageFile} to public/images/services`);

          // Update database
          const imageUrl = `/images/services/${imageFile}`;
          await db.collection("services").doc(doc.id).update({ image: imageUrl });
          console.log(`Updated ${data.title} with image URL: ${imageUrl}`);
        }
      }
    }
  }
  console.log("Finished updating images!");
}

run().catch(console.error);
