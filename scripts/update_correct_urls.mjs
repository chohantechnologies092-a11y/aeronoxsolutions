import { initializeApp, cert, getApps } from "firebase-admin/app";
import { getFirestore, FieldValue } from "firebase-admin/firestore";
import * as fs from "fs";
import * as path from "path";

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

if (!getApps().length) {
  initializeApp({
    credential: cert(serviceAccount),
  });
}

const db = getFirestore();

// The specific correct URLs provided by the user
const validLiveUrls = {
  "accomodation-corner": "https://www.accommodationcorner.co.uk/",
  "emirates-visa-express": "https://emiratesvisaexpress.online/",
  "eco-green-thermal": "https://ecogreenthermalsolutionltd.com/",
  "budget-bargainz": "https://www.budgetbargainz.co.uk/",
  "ducting-supplies": "https://ductingsuppliesuk.com/"
};

async function updateLiveUrls() {
  const snapshot = await db.collection("projects").get();
  
  for (const doc of snapshot.docs) {
    const slug = doc.id;
    if (validLiveUrls[slug]) {
      // Update to the correct URL
      await doc.ref.update({ liveUrl: validLiveUrls[slug] });
      console.log(`✅ Updated ${slug} to ${validLiveUrls[slug]}`);
    } else {
      // Remove the invalid guessed URL from other projects so they don't break
      await doc.ref.update({ liveUrl: FieldValue.delete() });
      console.log(`❌ Removed broken liveUrl for ${slug}`);
    }
  }
  console.log("\nAll project live URLs updated successfully!");
}

updateLiveUrls().catch(console.error);
