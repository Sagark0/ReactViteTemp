// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD64hEF7O-kCV8bUbUaGCt-23SocyUONhs",
  authDomain: "blockchaindata-c64d9.firebaseapp.com",
  projectId: "blockchaindata-c64d9",
  storageBucket: "blockchaindata-c64d9.appspot.com",
  messagingSenderId: "525504716452",
  appId: "1:525504716452:web:476cbc45c61c92b7a81031"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export default app;