// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCW98d5AF9xQpFoT6JnpSZKMQdSKUCVi8k",
  authDomain: "vrutalay-3d828.firebaseapp.com",
  projectId: "vrutalay-3d828",
  storageBucket: "vrutalay-3d828.appspot.com",
  messagingSenderId: "390659850233",
  appId: "1:390659850233:web:6e1f81dfb2970c30ad8728",
  measurementId: "G-6KCDF27P12"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
