// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getAnalytics } from "firebase/analytics";
import { getStorage } from 'firebase/storage';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCwtNmeX47Fic9_eeduvKRjio1OJfuvDIw",
  authDomain: "calmconnect-71f70.firebaseapp.com",
  projectId: "calmconnect-71f70",
  storageBucket: "calmconnect-71f70.appspot.com",
  messagingSenderId: "673423631481",
  appId: "1:673423631481:web:c555da3e8bbb7ff9ad20a8",
  measurementId: "G-EP100N3DJG"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const analytics = getAnalytics(app);
const database = getFirestore(app);
const storage = getStorage(app);

export{app,auth,analytics,database,storage};