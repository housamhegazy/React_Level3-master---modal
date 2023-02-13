// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth,  } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDmcimHJSzIjblLOREJ9Yi9JNk6R2eVQuo",
  authDomain: "level2-11b83.firebaseapp.com",
  projectId: "level2-11b83",
  storageBucket: "level2-11b83.appspot.com",
  messagingSenderId: "458316123238",
  appId: "1:458316123238:web:889f4a81ef124d93aa31a7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);