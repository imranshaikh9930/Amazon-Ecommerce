// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
const firebaseConfig = {
  apiKey: "AIzaSyB7Bb859TOVyiTVCir_xnQz-ruFfiMVdN0",
  authDomain: "ecommerceclone-3b7dd.firebaseapp.com",
  projectId: "ecommerceclone-3b7dd",
  storageBucket: "ecommerceclone-3b7dd.appspot.com",
  messagingSenderId: "180106235796",
  appId: "1:180106235796:web:61ee5080c7e1978b878981",
  measurementId: "G-VEJ01DHTWV"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage =  getStorage(app);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);

export  {app,db,storage};