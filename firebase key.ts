// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDts_h4IJQz0w2tVh_gRwuy-KXJusctQiY",
  authDomain: "weather-app-si-v1.firebaseapp.com",
  projectId: "weather-app-si-v1",
  storageBucket: "weather-app-si-v1.firebasestorage.app",
  messagingSenderId: "886354899498",
  appId: "1:886354899498:web:03c72b06dd2db0d72ac953",
  measurementId: "G-5K3TBFK5MT"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);
export { app, auth, analytics, db };