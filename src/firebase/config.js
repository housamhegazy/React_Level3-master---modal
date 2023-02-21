// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth,  } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAkalT4V2LWD0qopa9NJcr0qi2luy7meF4",
  authDomain: "level3-98e93.firebaseapp.com",
  projectId: "level3-98e93",
  storageBucket: "level3-98e93.appspot.com",
  messagingSenderId: "758914879130",
  appId: "1:758914879130:web:9c33bc30c5fb8e53015923"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);
