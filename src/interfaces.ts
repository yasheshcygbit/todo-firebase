import { DocumentData, QueryDocumentSnapshot } from "firebase/firestore";

export interface ProfileUpdate {
  displayName?: string | null;
  photoURL?: string | null;
}
