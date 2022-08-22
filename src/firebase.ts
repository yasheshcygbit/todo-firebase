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
  doc,
  updateDoc,
  Timestamp,
  QueryDocumentSnapshot,
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

export const UserCollection = collection(db, "users");
export const ToDoCollection = collection(db, "todos");

const provider = new GoogleAuthProvider();

export const signInWithGoogle = async () => {
  try {
    const res = await signInWithPopup(auth, provider);
    const user: User = res.user;
    console.log('[GOOGLE_LOGIN res]', res);
    console.log('[GOOGLE_LOGIN user]', user);
    if (user) {
      const q = query(UserCollection, where("uid", "==", user.uid));
      const dataFound = await getDocs(q);
      console.log('[USERDB_CREATE dataFound]', dataFound);
      if (dataFound && dataFound.docs.length <= 0) {
        console.log('[USERDB_CREATE user create]');
        const docRef = await addDoc(UserCollection, {
          email: res.user.email,
          uid: res.user.uid,
          emailVerified: res.user.emailVerified,
          photoURL: res.user.photoURL,
          providerData: res.user.providerData,
        });
        console.log('[GOOGLE_LOGIN docRef]', docRef);
      } else {
        console.log('[USERDB_CREATE user already there]');
        const dataRef = doc(db, 'users', dataFound.docs[0].id);
        await updateDoc(dataRef, {
          updatedAt: Timestamp.fromDate(new Date()),
        });
      }
    }
  } catch (error) {
    
  }
}

export const createUserWithEmail = async (email: string, password: string) => {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    console.log('[EMAIL_LOGIN res]', res);
    if (res && res.user) {
      // new user created so create in db

      // first check if the document is already present
      const q = query(UserCollection, where("uid", "==", res.user.uid));
      const dataFound = await getDocs(q);
      console.log('[USERDB_CREATE dataFound]', dataFound);
      if (dataFound && dataFound.docs.length <= 0) {
        console.log('[USERDB_CREATE user create]');
        const docRef = await addDoc(UserCollection, {
          email,
          password,
          uid: res.user.uid,
          emailVerified: res.user.emailVerified,
          photoURL: res.user.photoURL,
          providerData: res.user.providerData,
        });
        console.log('[GOOGLE_LOGIN docRef]', docRef);
      } else {
        console.log('[USERDB_CREATE user already there]');
        const dataRef = doc(db, 'users', dataFound.docs[0].id);
        await updateDoc(dataRef, {
          updatedAt: Timestamp.fromDate(new Date()),
        });
      }
    }
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

export const createToDo = async (todo: string, userId: string) => {
  try {
    const resp = await addDoc(ToDoCollection, {
      userId,
      title: todo,
      isCompleted: false,
    })
    console.log('[TODO_CREATE resp]', resp);
    
  } catch (error) {
    throw error;
  }
}

export const getAllTodos = async (): Promise<QueryDocumentSnapshot[]> => {
  try {
    const user = auth.currentUser;
    const q = query(ToDoCollection, where("userId", "==", user?.uid));
    const dataFound = await getDocs(q);
    if (dataFound && dataFound.docs.length >= 0) {
      return dataFound.docs;
    } else {
      return [];
    }
  } catch (error) {
    throw error;
  }
}

export const updateToDo = async (todoId: string, isCompleted: boolean) => {
  try {
    const dataRef = doc(db, 'todos', todoId);
    await updateDoc(dataRef, { isCompleted });
  } catch (error) {
    throw error;
  }
}