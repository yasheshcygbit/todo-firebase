import { DocumentData, QueryDocumentSnapshot } from "firebase/firestore";

export interface ProfileUpdate {
  displayName?: string | null;
  photoURL?: string | null;
}

export interface TitleInputProps {
  title: string,
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
  name: string,
  id: string,
  type: React.HTMLInputTypeAttribute | undefined
}