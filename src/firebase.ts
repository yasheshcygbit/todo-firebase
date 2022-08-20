import {
  GoogleAuthProvider,
  getAuth,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut,
  User,
  updateProfile,
} from "firebase/auth";

import { FirebaseError, initializeApp } from 'firebase/app';

import {
  getFirestore,
  query,
  getDocs,
  collection,
  where,
  addDoc,
} from "firebase/firestore";
import { ProfileUpdate } from "./interfaces";

const firebaseConfig = {
  apiKey: "AIzaSyAJWJ2mPcUM115vCDc3ms3RoHMz6z9TCpQ",
  authDomain: "fir-todo-ea103.firebaseapp.com",
  projectId: "fir-todo-ea103",
  storageBucket: "fir-todo-ea103.appspot.com",
  messagingSenderId: "438284799004",
  appId: "1:438284799004:web:3d1a70ee63b6fd7ab6a3d9"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
console.log('[GOOGLE_LOGIN auth]', auth);
const db = getFirestore(app);

const UserCollection = collection(db, "users");

const provider = new GoogleAuthProvider();

export const signInWithGoogle = async () => {
  try {
    const res = await signInWithPopup(auth, provider);
    const user: User = res.user;
    console.log('[GOOGLE_LOGIN res]', res);
    console.log('[GOOGLE_LOGIN user]', user);
    // const q = query(User, where("uid", "==", user.uid));
    // const docs = await getDocs(q);
    // if (docs.docs.length === 0) {
    //   await addDoc(User, {
    //     uid: user.uid,
    //     name: user.displayName
    //   })
    // }
  } catch (error) {
    
  }
}

export const createUserWithEmail = async (email: string, password: string) => {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    console.log('[EMAIL_LOGIN res]', res);
  } catch (error) {
    throw error;
  }
}

export const loginUserWithEmail = async (email: string, password: string) => {
  try {
    const res = await signInWithEmailAndPassword(auth, email, password);
    console.log('[EMAIL_LOGIN res]', res);
  } catch (error) {
    console.log('[EMAIL_LOGIN error]', error);
  }
}

export const updateUserProfile = async (currentUser: User, newDetails: ProfileUpdate) => {
  try {
    const detailsToUpdate: ProfileUpdate = {};
    if (newDetails.displayName) {
      detailsToUpdate.displayName = newDetails.displayName;
    }
    if (newDetails.photoURL) {
      detailsToUpdate.photoURL = newDetails.photoURL;
    }
    const response = await updateProfile(currentUser, detailsToUpdate);
  } catch (error) {
    
  }
}