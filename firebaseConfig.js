// Firebase Connection
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth"
import { getFirestore } from "firebase/firestore";

// Importing the Firebase connection credentials from variables stored in the .env
// This is a more secure method than directly pasting the credentials directly
import {apiKey, authDomain, projectId, storageBucket, messagingSenderId, appId, measurementId} from '@env';

const firebaseConfig = {
  apiKey: apiKey,
  authDomain: authDomain,
  projectId: projectId,
  storageBucket: storageBucket,
  messagingSenderId: messagingSenderId,
  appId: appId,
  measurementId: measurementId,
};




// Initialize Firebase connection
export const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

var uid = null
if (auth.currentUser != null){
   uid = auth.currentUser.uid;
}
export const userId = uid;

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);


