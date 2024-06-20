// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-blog-113e8.firebaseapp.com",
  projectId: "mern-blog-113e8",
  storageBucket: "mern-blog-113e8.appspot.com",
  messagingSenderId: "856696576394",
  appId: "1:856696576394:web:b8ecbe1b35ced6e835d073"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

