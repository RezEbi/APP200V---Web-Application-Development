import { db } from "./firebase";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";

/** Lagrer ordre i Firestore (orders-collection) */
export async function saveOrder(order) {
  const ref = await addDoc(collection(db, "orders"), {
    ...order,
    createdAt: serverTimestamp(),
  });
  return ref.id;
}

/** Følgende trenger vi snart for Book Table og Contact */
export async function saveBooking(booking) {
  const ref = await addDoc(collection(db, "bookings"), {
    ...booking,
    createdAt: serverTimestamp(),
  });
  return ref.id;
}

export async function saveMessage(message) {
  const ref = await addDoc(collection(db, "messages"), {
    ...message,
    createdAt: serverTimestamp(),
  });
  return ref.id;
}