// src/services/ordersService.js
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "./firebase";

/**
 * Lagrer ordre i Firestore (uten orderNumber), slik det var før.
 * items: [{ id, name, price, qty }]
 * customer: { name, email, phone, pickupTime, note }
 */
export async function createOrder({ items, customer, note }) {
  // beregn linjetotaler og total som før
  const enriched = (items || []).map((it) => ({
    id: it.id,
    name: it.name,
    price: it.price,
    qty: it.qty,
    lineTotal: (it.price || 0) * (it.qty || 0),
  }));
  const total = enriched.reduce((s, it) => s + it.lineTotal, 0);

  const order = {
    items: enriched,
    customer: {
      name: customer?.name || "",
      email: customer?.email || "",
      phone: customer?.phone || "",
      pickupTime: customer?.pickupTime || "",
      note: customer?.note || "",
    },
    email: customer?.email || "",       // toppnivå for Admin
    note: note || customer?.note || "",
    total,
    status: "new",
    createdAt: serverTimestamp(),
    // ingen orderNumber i gammel versjon
  };

  const ref = await addDoc(collection(db, "orders"), order);
  return ref; // ref.id tilgjengelig om du ønsker
}