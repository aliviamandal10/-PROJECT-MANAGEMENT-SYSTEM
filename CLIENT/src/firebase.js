// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

import {getFirestore} from "firebase/firestore";
import {getAuth}from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDDjZxQBY-nmlfWITDr1CZNERamlU92Bpc",
  authDomain: "project-management-5e028.firebaseapp.com",
  projectId: "project-management-5e028",
  storageBucket: "project-management-5e028.firebasestorage.app",
  messagingSenderId: "927062646803",
  appId: "1:927062646803:web:6c180c47eb5847fb9cdfe6",
  measurementId: "G-WBXMGV60EC"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// export services
export const auth = getAuth(app);
export const db = getFirestore(app);