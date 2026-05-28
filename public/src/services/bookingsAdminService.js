// src/services/bookingsAdminService.js
import { doc, updateDoc, deleteDoc, serverTimestamp } from "firebase/firestore";
import { db } from "./firebase";

/**
 * tillatte statuser (forslag): "new" | "confirmed" | "seated" | "completed" | "cancelled"
 */
export async function updateBookingStatus(id, status) {
  await updateDoc(doc(db, "bookings", id), {
    status,
    updatedAt: serverTimestamp(),
  });
}

export async function deleteBooking(id) {
  await deleteDoc(doc(db, "bookings", id));
}