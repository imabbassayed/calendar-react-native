// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth, onAuthStateChanged} from "firebase/auth"
import { getFirestore } from "firebase/firestore";

import {apiKey, authDomain, projectId, storageBucket, messagingSenderId, appId, measurementId} from '@env';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: apiKey,
  authDomain: authDomain,
  projectId: projectId,
  storageBucket: storageBucket,
  messagingSenderId: messagingSenderId,
  appId: appId,
  measurementId: measurementId,
};



// Initialize Firebase
export const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

var uid = null
if (auth.currentUser != null){
   uid = auth.currentUser.uid;
}
export const userId = uid;

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);


