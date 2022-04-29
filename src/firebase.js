// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"
import { getAuth } from "firebase/auth"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBOQk8O_baUUXIXEloXHGHTQva_8MfeOq8",
    authDomain: "test-123-25113.firebaseapp.com",
    projectId: "test-123-25113",
    storageBucket: "test-123-25113.appspot.com",
    messagingSenderId: "109328740397",
    appId: "1:109328740397:web:682d39e59e2f8a2a41c8a4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

//firestore database lưu trữ csdl

const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth };