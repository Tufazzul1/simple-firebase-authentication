// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC-cedB6Tjx4wC4p3SoAxzqNQTini9ZvWM",
  authDomain: "user-email-pass-auth-94979.firebaseapp.com",
  projectId: "user-email-pass-auth-94979",
  storageBucket: "user-email-pass-auth-94979.appspot.com",
  messagingSenderId: "363036285624",
  appId: "1:363036285624:web:e4c4bcd9be26eef936324d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app)
 
export default auth