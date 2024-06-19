
import { getFirestore } from "firebase/firestore";
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyDixvimHovdeu5raYj4LTnkXH6YVdBOgFg",
  authDomain: "mingle-3b8ec.firebaseapp.com",
  projectId: "mingle-3b8ec",
  storageBucket: "mingle-3b8ec.appspot.com",
  messagingSenderId: "701325819599",
  appId: "1:701325819599:web:3de1e240c8881178f681ba"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)
export default app;