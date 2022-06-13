
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";



const firebaseConfig = {
  apiKey: "AIzaSyCGebhPBwMnKShY847tBFM-44hwE-l3z74",
  authDomain: "e-commerce-dev-7ed99.firebaseapp.com",
  projectId: "e-commerce-dev-7ed99",
  storageBucket: "e-commerce-dev-7ed99.appspot.com",
  messagingSenderId: "1062281450549",
  appId: "1:1062281450549:web:3966f619c2863053658d7c",
  measurementId: "G-9059BEWGQR"
};


const app = initializeApp(firebaseConfig);
const fireDB=getFirestore(app)

export default fireDB