// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCmdD_Zv9o7n_Mx8gKPmBAvT2dZWLm0fPk",
  authDomain: "fir-audio-f9a91.firebaseapp.com",
  projectId: "fir-audio-f9a91",
  storageBucket: "fir-audio-f9a91.firebasestorage.app",
  messagingSenderId: "91604884195",
  appId: "1:91604884195:web:3331e4fd6f6099d852c3d6",
  measurementId: "G-99TC6QVH07"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const auth = getAuth(app);
export { app, auth, analytics };