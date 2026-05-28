// src/pages/Admin.jsx
import { useEffect, useState } from "react";
import { useAuth } from "../state/AuthContext";
import { getOrders } from "../services/fetchOrders";
import { getBookings } from "../services/getBookings";
import { getMessages } from "../services/getMessages";
import { updateOrderStatus, deleteOrder } from "../services/ordersAdminService";
import { updateBookingStatus, deleteBooking } from "../services/bookingsAdminService";
import { markMessageStatus, deleteMessage } from "../services/messagesAdminService";

import { useReveal } from "../utils/useReveal";

export default function Admin() {
  const { logout, loading } = useAuth();
  useReveal();

  const [tab, setTab] = useState("orders");
  const [orders, setOrders] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [messages, setMessages] = useState([]);
  const [error, setError] = useState("");

  // Normaliser som før (ingen orderNumber)
  function normalizeOrders(list) {
    return (list || []).map((o) => {
      const items = Array.isArray(o.items) ? o.items : [];
      const total = items.reduce((sum, it) => {
        const price = Number(it.price || 0);
        const qty = Number(it.qty || 0);
        return sum + price * qty;
      }, 0);

      const createdAt = o.createdAt?.toDate ? o.createdAt.toDate() : null;

      return {
        id: o.id ?? "(mangler id)",
        email: o.email ?? o.customer?.email ?? "Ukjent",
        status: o.status ?? "new",
        createdAt,
        total,
        items,
      };
    });
  }

  // LAST DATA
  useEffect(() => {
    async function load() {
      try {
        setError("");
        const [o, b, m] = await Promise.all([getOrders(), getBookings(), getMessages()]);
        setOrders(normalizeOrders(o));
        setBookings(b || []);
        setMessages(m || []);
      } catch (err) {
        console.error(err);
        setError("Feil ved lasting av data.");
      }
    }
    load();
  }, []);

  // ORDRE ACTIONS
  async function onOrderStatusChange(id, next) {
    setOrders((prev) => prev.map((o) => (o.id === id ? { ...o, status: next } : o)));
    await updateOrderStatus(id, next);
  }

  async function onOrderDelete(id) {
    if (!window.confirm("Slette denne ordren?")) return;
    setOrders((prev) => prev.filter((o) => o.id !== id));
    await deleteOrder(id);
  }

  if (loading) {
    return (
      <div className="page">
        <div className="container">
          <p>Laster admin...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="page">
      <div className="container">
        {/* HEADER */}
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 20 }}>
          <div>
            <h1>Admin Dashboard</h1>
            <p className="muted">Oversikt over ordre, reservasjoner og meldinger</p>
          </div>
          <button className="btn" onClick={logout}>Logg ut</button>
        </div>

        {error && <p className="err">{error}</p>}

        {/* TABS */}
        <div className="admin-tabs">
          <button className={tab === "orders" ? "active" : ""} onClick={() => setTab("orders")}>Orders</button>
          <button className={tab === "bookings" ? "active" : ""} onClick={() => setTab("bookings")}>Bookings</button>
          <button className={tab === "messages" ? "active" : ""} onClick={() => setTab("messages")}>Messages</button>
        </div>

        {/* ORDERS TABLE */}
        {tab === "orders" && (
          <div className="admin-table-wrapper">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Order ID</th>
                  <th>Email</th>
                  <th>Status</th>
                  <th>Total</th>
                  <th>Items</th>
                  <th>Actions</th>
                </tr>
              </thead>

              <tbody>
                {orders.length === 0 && (
                  <tr><td colSpan="6">Ingen ordre.</td></tr>
                )}

                {orders.map((o) => (
                  <tr key={o.id}>
                    <td>{o.id}</td>
                    <td>{o.email}</td>
                    <td><span className={`status-badge ${o.status}`}>{o.status}</span></td>
                    <td>{o.total} kr</td>
                    <td>{o.items.map(it => `${it.name} × ${it.qty}`).join(", ")}</td>

                    <td className="actions-column">
                      <button className="btn-table" onClick={() => onOrderStatusChange(o.id, "preparing")}>Preparing</button>
                      <button className="btn-table" onClick={() => onOrderStatusChange(o.id, "ready")}>Ready</button>
                      <button className="btn-table" onClick={() => onOrderStatusChange(o.id, "completed")}>Fullfør</button>
                      <button className="btn-table danger" onClick={() => onOrderDelete(o.id)}>Slett</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* BOOKINGS (kortvisning som før) */}
        {tab === "bookings" && (
          <div className="admin-grid">
            {bookings.length === 0 && <p className="muted">Ingen reservasjoner.</p>}
            {bookings.map((b) => (
              <div className="card admin-card" key={b.id}>
                <h3>Reservasjon #{b.id}</h3>
                <p><strong>Status:</strong> <span className={`status-badge ${b.status || "new"}`}>{b.status || "new"}</span></p>
                <p><strong>Navn:</strong> {b.name || "Ukjent"}</p>
                <p><strong>Email:</strong> {b.email || "Ukjent"}</p>
                <p><strong>Dato:</strong> {b.date || "?"}</p>
                <p><strong>Tid:</strong> {b.time || "?"}</p>
                <p><strong>Gjester:</strong> {b.guests || 0}</p>
                {b.note && <p><strong>Notat:</strong> {b.note}</p>}
              </div>
            ))}
          </div>
        )}

        {/* MESSAGES (kortvisning som før) */}
        {tab === "messages" && (
          <div className="admin-grid">
            {messages.length === 0 && <p className="muted">Ingen meldinger.</p>}
            {messages.map((m) => (
              <div className="card admin-card" key={m.id}>
                <h3>{m.subject || "Ingen emne"}</h3>
                <p><strong>Status:</strong> <span className={`status-badge ${m.status || "new"}`}>{m.status || "new"}</span></p>
                <p><strong>Fra:</strong> {m.name || "Ukjent"} — {m.email || "Ukjent"}</p>
                <p>{m.message || "Ingen melding"}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}