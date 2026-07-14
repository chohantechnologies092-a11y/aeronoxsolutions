import { initializeApp, cert, getApps } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";
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

const liveUrls = {
  "accomodation-corner": "https://www.accommodationcorner.com",
  "emirates-visa-express": "https://emiratesvisaexpress.com",
  "eco-green-thermal": "https://ecogreenthermal.co.uk",
  "budget-bargainz": "https://budgetbargainz.co.uk",
  "perfumish": "https://perfumish.com",
  "ducting-delivered": "https://ductingdelivered.com",
  "ducting-supplies": "https://ductingsuppliesuk.com",
  "bluetech-cloud": "https://bluetechcloud.com",
  "bluecloud-tech": "https://bluecloudtech.com",
  "pinnacle-builder": "https://pinnaclebuilder.co.uk",
  "luxora-haus": "https://luxorahaus.com"
};

async function updateLiveUrls() {
  const snapshot = await db.collection("projects").get();
  
  for (const doc of snapshot.docs) {
    const slug = doc.id;
    if (liveUrls[slug]) {
      await doc.ref.update({ liveUrl: liveUrls[slug] });
      console.log(`Updated ${slug} with ${liveUrls[slug]}`);
    }
  }
  console.log("All project live URLs updated successfully!");
}

updateLiveUrls().catch(console.error);
