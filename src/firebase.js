import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyATFptLPI7TbJ7Oj0B2_eQ4DbhHwbpC0V0",
  authDomain: "edulms-23188.firebaseapp.com",
  projectId: "edulms-23188",
  storageBucket: "edulms-23188.appspot.com", // <<< Correct!
  messagingSenderId: "562904361073",
  appId: "1:562904361073:web:6b0e4df655d50794ab93d0",
  measurementId: "G-T0QPV677XB"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

export { auth, googleProvider };
