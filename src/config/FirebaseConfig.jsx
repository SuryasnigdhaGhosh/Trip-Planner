// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCBvE1a6k84WHX16b56heTsmRdCls985Fg",
  authDomain: "myapp-f103d.firebaseapp.com",
  projectId: "myapp-f103d",
  storageBucket: "myapp-f103d.firebasestorage.app",
  messagingSenderId: "580269280671",
  appId: "1:580269280671:web:37151814086d2c88c301aa",
  measurementId: "G-FQDKP2QHLX"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)
// const analytics = getAnalytics(app);