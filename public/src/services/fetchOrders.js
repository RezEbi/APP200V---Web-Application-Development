// src/services/fetchOrders.js
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import { db } from "./firebase";

export async function getOrders() {
  const q = query(collection(db, "orders"), orderBy("createdAt", "desc"));
  const snap = await getDocs(q);
  return snap.docs.map(d => ({ id: d.id, ...d.data() })); // beholder orderNumber
}