const { initializeApp, cert } = require('firebase-admin/app');
const { getFirestore } = require('firebase-admin/firestore');
const fs = require('fs');
require('dotenv').config({ path: '.env.local' });

let privateKey = process.env.FIREBASE_PRIVATE_KEY;
if (privateKey) {
  privateKey = privateKey.replace(/^"|"$/g, '').replace(/\\n/g, '\n');
}

initializeApp({
  credential: cert({
    projectId: process.env.FIREBASE_PROJECT_ID,
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
    privateKey: privateKey,
  })
});

const db = getFirestore();

const testimonials = [
  {
    author: "Sarah Jenkins",
    role: "CEO at TechFlow",
    quote: "Aeronox Solutions transformed our online presence completely. Their attention to detail and modern design approach helped us increase our conversion rate by 150% within the first month of launch.",
    rating: 5,
    isActive: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    author: "Marcus Chen",
    role: "Founder, GrowthX",
    quote: "Working with this team was a game-changer. They don't just build websites; they build scalable digital businesses. The performance optimization they did was absolutely incredible.",
    rating: 5,
    isActive: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    author: "Emma Roberts",
    role: "Marketing Director",
    quote: "I've worked with dozens of agencies, but Aeronox is different. Their UI/UX design is world-class, and their communication throughout the project was flawless. Highly recommended.",
    rating: 5,
    isActive: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }
];

async function seed() {
  for (const t of testimonials) {
    await db.collection('testimonials').add(t);
  }
  console.log('Seeded');
}
seed();
