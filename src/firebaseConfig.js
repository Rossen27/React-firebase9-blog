import { initializeApp } from "firebase/app";

import {getFirestore} from 'firebase/firestore';
import {getStorage} from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyCEtPVTNaAJft5VSP9TyT5CSGvfUKnSTwA",
  authDomain: "react-blog-59b2a.firebaseapp.com",
  databaseURL: "https://react-blog-59b2a-default-rtdb.firebaseio.com",
  projectId: "react-blog-59b2a",
  storageBucket: "react-blog-59b2a.appspot.com",
  messagingSenderId: "973565008699",
  appId: "1:973565008699:web:3a9832edccb5e5c502b51e"
};

const app = initializeApp(firebaseConfig);

export const storage = getStorage(app);
export const db = getFirestore(app);
