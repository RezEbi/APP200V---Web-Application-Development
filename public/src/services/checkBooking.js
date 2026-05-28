import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "./firebase";

/**
 * Returnerer TRUE hvis bordet er ledig
 */
export async function isTableAvailable(table, date, time) {
  const q = query(
    collection(db, "bookings"),
    where("table", "==", table),
    where("date", "==", date),
    where("time", "==", time)
  );

  const snap = await getDocs(q);

  return snap.empty;  // empty = ingen kollisjon (ledig)
}