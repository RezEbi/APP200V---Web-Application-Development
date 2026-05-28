// src/pages/BookTable.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createBooking } from "../services/bookingService";
import { isTableAvailable } from "../services/checkBooking"; // ✅ import for bord-sjekk

const TABLES = [
  { id: "T1", seats: 2 },
  { id: "T2", seats: 2 },
  { id: "T3", seats: 4 },
  { id: "T4", seats: 4 },
  { id: "T5", seats: 6 },
];

export default function BookTable() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [guests, setGuests] = useState(1);
  const [note, setNote] = useState("");
  const [table, setTable] = useState("");

  function isTimeWithinOpeningHours(dateStr, timeStr) {
    const day = new Date(dateStr).getDay();
    const [h, m] = timeStr.split(":").map(Number);
    const minutes = h * 60 + m;

    let open = 0;
    let close = 0;

    if (day === 0) { // søndag
      open = 12 * 60;
      close = 20 * 60;
    } else if (day >= 1 && day <= 4) { // man–tor
      open = 11 * 60;
      close = 21 * 60;
    } else { // fre–lør
      open = 11 * 60;
      close = 22.5 * 60; // 22:30
    }

    return minutes >= open && minutes <= close;
  }

  async function handleSubmit(e) {
    e.preventDefault();

    // 1️⃣ Sjekk åpningstid
    if (!isTimeWithinOpeningHours(date, time)) {
      alert("Valgt tid er utenfor åpningstidene.");
      return;
    }

    // 2️⃣ Sjekk at brukeren har valgt bord
    if (!table) {
      alert("Velg et bord.");
      return;
    }

    // 3️⃣ Sjekk at bordet er ledig
    const available = await isTableAvailable(table, date, time);
    if (!available) {
      alert("Dette bordet er allerede reservert på den valgte tiden.");
      return;
    }

    // 4️⃣ Lagre bookingen
    try {
      await createBooking({
        name,
        email,
        date,
        time,
        guests,
        note,
        table
      });

      alert("Booking mottatt!");

      // Reset feltene
      setName("");
      setEmail("");
      setDate("");
      setTime("");
      setGuests(1);
      setTable("");
      setNote("");

      navigate("/");

    } catch (error) {
      alert("Kunne ikke lagre booking.");
      console.error(error);
    }
  }

  return (
    <div className="page">
      <div className="container">
        <h1>Reserver bord</h1>
        <p className="muted">Velg dato, tid og antall personer.</p>

        <form className="card mt-4" onSubmit={handleSubmit}>
          <div className="grid grid-2">
            <div>
              <label>Fullt navn</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Ditt navn"
                required
              />
            </div>

            <div>
              <label>E‑post</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="navn@epost.no"
                required
              />
            </div>

            <div>
              <label>Dato</label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                required
              />
            </div>

            <div>
              <label>Tid</label>
              <input
                type="time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                required
              />
            </div>

            <div>
              <label>Antall gjester</label>
              <input
                type="number"
                min="1"
                value={guests}
                onChange={(e) => setGuests(Number(e.target.value))}
                required
              />
            </div>

            <div>
              <label>Bord</label>
              <select
                value={table}
                onChange={(e) => setTable(e.target.value)}
                required
              >
                <option value="">Velg bord</option>
                {TABLES.filter(t => t.seats >= guests).map(t => (
                  <option key={t.id} value={t.id}>
                    {t.id} – {t.seats} personer
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="mt-4">
            <label>Notat (allergier, ønsker…)</label>
            <textarea
              rows="3"
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="Valgfritt"
            />
          </div>

          <div className="checkout-actions mt-4">
            <button
              type="button"
              className="btn"
              onClick={() => navigate("/")}
            >
              Avbryt
            </button>

            <button type="submit" className="btn primary">
              Reserver bord
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}