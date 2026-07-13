const { initializeApp, cert } = require('firebase-admin/app');
const { getFirestore } = require('firebase-admin/firestore');
const bcrypt = require('bcryptjs');

initializeApp({
  credential: cert({
    projectId: process.env.FIREBASE_PROJECT_ID,
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
    privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
  }),
});

const db = getFirestore();

async function reset() {
  const usersRef = db.collection('users');
  const snapshot = await usersRef.where('email', '==', 'admin@aeronox.com').get();
  
  if (snapshot.empty) {
    console.log('User not found');
    return;
  }
  
  const doc = snapshot.docs[0];
  const newHash = await bcrypt.hash('password123', 10);
  
  await doc.ref.update({ password: newHash });
  console.log('Password successfully reset to: password123');
}

reset().catch(console.error);
