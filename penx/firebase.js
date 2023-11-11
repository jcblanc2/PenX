// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAYOcUaOqj34iHcAC4zYFiVWFQ1o65PtPA",
    authDomain: "penx-9c053.firebaseapp.com",
    projectId: "penx-9c053",
    storageBucket: "penx-9c053.appspot.com",
    messagingSenderId: "351235073820",
    appId: "1:351235073820:web:ec010206c6b131d6fdfcd9",
    measurementId: "G-N0V76ES2TD"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);