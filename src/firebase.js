// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";



// Test config
const firebaseConfig = {
  apiKey: process.env.REACT_APP_APIKEY , 
  authDomain: process.env.REACT_APP_AUTHDOMAIN , 
  // databaseURL: process.env.REACT_APP_DATABSEURL , 
  projectId: process.env.REACT_APP_PROJECTID , 
  storageBucket: process.env.REACT_APP_STORAGEBUCKET ,
  messagingSenderId: process.env.REACT_APP_MESSAGINGSENDERID , 
  appId: process.env.REACT_APP_APPID , 
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const database = getFirestore(app)
export const auth = getAuth(app);






