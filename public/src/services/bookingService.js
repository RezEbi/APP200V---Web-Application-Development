// src/services/bookingService.js
import { addDoc, collection, serverTimestamp, query, where, getDocs } from "firebase/firestore";
import { db } from "./firebase";

// Opprett booking med bord
export async function createBooking({ name, email, date, time, guests, note, table }) {
  const data = {
    name,
    email,
    date,
    time,
    guests,
    note: note || "",
    table,           // 💙 bordnummer lagres her
    status: "new",
    createdAt: serverTimestamp(),
  };

  return addDoc(collection(db, "bookings"), data);
}

// Sjekk om bordet er ledig
export async function isTableAvailable(tableId, date, time) {
  const q = query(
    collection(db, "bookings"),
    where("table", "==", tableId),
    where("date", "==", date),
    where("time", "==", time)
  );

  const snap = await getDocs(q);
  return snap.empty; // true = ledig, false = opptatt
}