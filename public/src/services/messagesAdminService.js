// src/services/messagesAdminService.js
import { doc, updateDoc, deleteDoc, serverTimestamp } from "firebase/firestore";
import { db } from "./firebase";

/**
 * tillatte statuser (forslag): "new" | "read" | "archived"
 */
export async function markMessageStatus(id, status) {
  await updateDoc(doc(db, "messages", id), {
    status,
    updatedAt: serverTimestamp(),
  });
}

export async function deleteMessage(id) {
  await deleteDoc(doc(db, "messages", id));
}