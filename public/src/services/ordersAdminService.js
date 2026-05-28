// src/services/ordersAdminService.js
import { doc, updateDoc, deleteDoc, serverTimestamp } from "firebase/firestore";
import { db } from "./firebase";

/**
 * Oppdaterer ordrestatuser: "new" | "preparing" | "ready" | "completed" | "cancelled"
 */
export async function updateOrderStatus(orderId, status) {
  const ref = doc(db, "orders", orderId);
  await updateDoc(ref, {
    status,
    updatedAt: serverTimestamp(),
  });
}

/** Slett en ordre permanent */
export async function deleteOrder(orderId) {
  const ref = doc(db, "orders", orderId);
  await deleteDoc(ref);
}