import fs from 'fs';
import path from 'path';
import { initializeApp, cert } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import dotenv from 'dotenv';

dotenv.config({ path: '.env' });

let privateKey = process.env.FIREBASE_PRIVATE_KEY;
if (privateKey) {
  privateKey = privateKey.replace(/^"|"$/g, "").replace(/\\n/g, "\n");
}

const app = initializeApp({
  credential: cert({
    projectId: process.env.FIREBASE_PROJECT_ID,
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
    privateKey: privateKey,
  })
});

const db = getFirestore(app);

const COLLECTIONS = ["services", "projects", "clients", "blogs", "seo"];
const EXPORT_DIR = path.join(process.cwd(), "devlyx-export");
const IMAGES_DIR = path.join(EXPORT_DIR, "images");

if (!fs.existsSync(EXPORT_DIR)) fs.mkdirSync(EXPORT_DIR);
if (!fs.existsSync(IMAGES_DIR)) fs.mkdirSync(IMAGES_DIR);

let imgCounter = 0;

async function downloadImage(url, dest) {
  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`Failed to fetch ${url}: ${res.statusText}`);
    const buffer = await res.arrayBuffer();
    fs.writeFileSync(dest, Buffer.from(buffer));
    return true;
  } catch (err) {
    console.error("Error downloading image:", url, err.message);
    return false;
  }
}

async function exportData() {
  const data = {};
  
  for (const collectionName of COLLECTIONS) {
    console.log(`Exporting ${collectionName}...`);
    const snapshot = await db.collection(collectionName).get();
    data[collectionName] = [];
    
    for (const doc of snapshot.docs) {
      let docData = doc.data();
      const id = doc.id;
      
      for (const [key, value] of Object.entries(docData)) {
        if (typeof value === 'string') {
          // If it's a direct image URL
          if (value.startsWith('http') && (value.match(/\.(jpeg|jpg|gif|png|webp|svg)$/i) || value.includes('res.cloudinary.com') || value.includes('firebasestorage') || value.includes('unsplash') || key.toLowerCase().includes('image') || key.toLowerCase().includes('logo'))) {
             imgCounter++;
             const filename = `img_${imgCounter}.jpg`;
             const filepath = path.join(IMAGES_DIR, filename);
             console.log(`Downloading ${key}: ${value.substring(0, 40)}... -> ${filename}`);
             const success = await downloadImage(value, filepath);
             if (success) {
                docData[key] = `./images/${filename}`;
             }
          } 
          
          // If it's HTML content, replace <img> tags
          if (key === 'content' || key === 'overview') {
            const regex = /<img[^>]+src="([^">]+)"/g;
            let match;
            let newContent = value;
            while ((match = regex.exec(value)) !== null) {
              const imgUrl = match[1];
              if (imgUrl.startsWith('http')) {
                imgCounter++;
                const filename = `content_img_${imgCounter}.jpg`;
                const filepath = path.join(IMAGES_DIR, filename);
                console.log(`Downloading content image ${imgUrl.substring(0, 40)}... -> ${filename}`);
                const success = await downloadImage(imgUrl, filepath);
                if (success) {
                   newContent = newContent.replace(imgUrl, `./images/${filename}`);
                }
              }
            }
            docData[key] = newContent;
          }
        }
        
        // Handle array of images (like galleryImages)
        if (Array.isArray(value) && key === 'galleryImages') {
          const newArray = [];
          for (let i = 0; i < value.length; i++) {
             const imgUrl = value[i];
             if (typeof imgUrl === 'string' && imgUrl.startsWith('http')) {
               imgCounter++;
               const filename = `gallery_${imgCounter}.jpg`;
               const filepath = path.join(IMAGES_DIR, filename);
               console.log(`Downloading gallery image ${imgUrl.substring(0, 40)}... -> ${filename}`);
               const success = await downloadImage(imgUrl, filepath);
               if (success) {
                  newArray.push(`./images/${filename}`);
               } else {
                  newArray.push(imgUrl);
               }
             } else {
               newArray.push(imgUrl);
             }
          }
          docData[key] = newArray;
        }
      }
      
      data[collectionName].push({ id, ...docData });
    }
  }
  
  fs.writeFileSync(path.join(EXPORT_DIR, "data.json"), JSON.stringify(data, null, 2));
  console.log("Export complete! Saved to ./devlyx-export");
}

exportData().catch(console.error);
