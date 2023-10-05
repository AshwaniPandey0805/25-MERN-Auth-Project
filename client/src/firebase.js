// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY, 
    authDomain: "mern-auth-5733d.firebaseapp.com",
    projectId: "mern-auth-5733d",
    storageBucket: "mern-auth-5733d.appspot.com",
    messagingSenderId: "106650577246",
    appId: "1:106650577246:web:3b5c1004a54cfd3ce387cf"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;