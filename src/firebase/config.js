// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth,  } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCUUiYmS8qO6nETlMzH4YtHozJutv-J4Kc",
  authDomain: "level3-bf941.firebaseapp.com",
  projectId: "level3-bf941",
  storageBucket: "level3-bf941.appspot.com",
  messagingSenderId: "654089609225",
  appId: "1:654089609225:web:025e528cbae531b60c58d8"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);
