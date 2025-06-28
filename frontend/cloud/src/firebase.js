// src/firebase.js
import { initializeApp } from 'firebase/app'
import { getAuth }      from 'firebase/auth'

// TODO: замените эти параметры на свои из Firebase Console
const firebaseConfig = {
  apiKey: "AIzaSyBSBFjMtBN9lgtTXypMySobQpDDf_HQDes",
  authDomain: "cloud-8547c.firebaseapp.com",
  projectId: "cloud-8547c",
  storageBucket: "cloud-8547c.firebasestorage.app",
  messagingSenderId: "512122883636",
  appId: "1:512122883636:web:4958a56ee33cf3b675c461",
  measurementId: "G-1NJT2N71MZ"
};

const app  = initializeApp(firebaseConfig)
export const auth = getAuth(app)
