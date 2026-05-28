import { collection, getDocs, query, orderBy } from "firebase/firestore";
import { db } from "./firebase";

export async function getMessages() {
  const q = query(collection(db, "messages"), orderBy("createdAt", "desc"));
  const snap = await getDocs(q);
  return snap.docs.map(d => ({ id: d.id, ...d.data() }));
}