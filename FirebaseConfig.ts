// FirebaseApp.ts
import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

// Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyDsQZHVxEyTp0ttB_YOsXo2EFD_QRMhSSY",
  authDomain: "codecadet-c0264.firebaseapp.com",
  projectId: "codecadet-c0264",
  storageBucket: "codecadet-c0264.firebasestorage.app",
  messagingSenderId: "993727005281",
  appId: "1:993727005281:web:2ddf0960c60f6584eb2020"
};

// Initialize Firebase

const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)
export const db = getFirestore(app)