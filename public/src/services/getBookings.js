import { collection, getDocs, query, orderBy } from "firebase/firestore";
import { db } from "./firebase";

export async function getBookings() {
  const q = query(collection(db, "bookings"), orderBy("createdAt", "desc"));
  const snap = await getDocs(q);
  return snap.docs.map(d => ({ id: d.id, ...d.data() }));
}