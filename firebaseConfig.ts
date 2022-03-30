// Import the functions you need from the SDKs you need
import { getApps, initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"
import { getAnalytics } from "firebase/analytics";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { GoogleAuthProvider } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBt-eE9YBGumQTH2D1aMGcEEa89AMGmQBM",
  authDomain: "chakra-chat-8605d.firebaseapp.com",
  projectId: "chakra-chat-8605d",
  storageBucket: "chakra-chat-8605d.appspot.com",
  messagingSenderId: "593574936062",
  appId: "1:593574936062:web:6400758121638b639614af",
  measurementId: "G-5KLHT2RQL2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig) 
const db = getFirestore(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { app, db, auth, provider };