
const { initializeApp, cert } = require('firebase-admin/app');
const { getFirestore } = require('firebase-admin/firestore');

// Initialize Firebase Admin
initializeApp({
  credential: cert({
    projectId: process.env.FIREBASE_PROJECT_ID,
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
    privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
  }),
});

const db = getFirestore();

async function getUsers() {
  const snapshot = await db.collection('users').get();
  if (snapshot.empty) {
    console.log("NO USERS FOUND IN DATABASE");
    return;
  }
  
  console.log("--- FOUND USERS ---");
  snapshot.forEach(doc => {
    const data = doc.data();
    console.log(`Email: ${data.email}`);
  });
}

getUsers().catch(console.error);
