// src/services/messageService.js

import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "./firebase";

export async function sendMessage({ name, email, subject, message }) {
  const data = {
    name,
    email,
    subject,
    message,
    status: "new",          // ← nye meldinger får status "new"
    createdAt: serverTimestamp(),
  };

  return addDoc(collection(db, "messages"), data);
}