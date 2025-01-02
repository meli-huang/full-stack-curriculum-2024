// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import { GoogleAuthProvider, getAuth } from "firebase/auth";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCx7N11ODsBeE2pTjdn_C9rEp96-JxFC_c",
  authDomain: "backend-demo-2ac29.firebaseapp.com",
  projectId: "backend-demo-2ac29",
  storageBucket: "backend-demo-2ac29.firebasestorage.app",
  messagingSenderId: "542716558266",
  appId: "1:542716558266:web:81290ecc862cff0fbdbb83",
  measurementId: "G-7Y076ZFMTL"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();