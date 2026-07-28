import { getApps, initializeApp, cert } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";
import { getAuth } from "firebase-admin/auth";
import { getStorage } from "firebase-admin/storage";

if (!getApps().length) {
  try {
    let privateKey = process.env.FIREBASE_PRIVATE_KEY;
    if (privateKey) {
      privateKey = privateKey.replace(/^"|"$/g, "").replace(/\\n/g, "\n");
    }

    if (process.env.FIREBASE_PROJECT_ID && process.env.FIREBASE_CLIENT_EMAIL && privateKey) {
      initializeApp({
        credential: cert({
          projectId: process.env.FIREBASE_PROJECT_ID,
          clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
          privateKey: privateKey,
        }),
        storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || `${process.env.FIREBASE_PROJECT_ID}.appspot.com`,
      });
    }
  } catch (error) {
    console.error("Firebase admin initialization error", error);
  }
}

export const db: any = getApps().length ? getFirestore() : {
  collection: () => ({
    get: async () => ({ docs: [] }),
    doc: () => ({
      get: async () => ({ exists: false, data: () => null }),
      set: async () => {},
      delete: async () => {},
    }),
    where: () => ({
      limit: () => ({
        get: async () => ({ empty: true, docs: [] })
      }),
      get: async () => ({ empty: true, docs: [] })
    })
  }),
  batch: () => ({
    set: () => {},
    commit: async () => {}
  })
};

export const auth: any = getApps().length ? getAuth() : {} as any;
export const storage: any = getApps().length ? getStorage() : {} as any;
