import { useState } from "react";
import { sendMessage } from "../services/messageService";

export default function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [feedback, setFeedback] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    setFeedback("");

    try {
      await sendMessage({
        name,
        email,
        subject,
        message,
      });

      setFeedback("Meldingen din ble sendt!");

      // Tøm alle felt
      setName("");
      setEmail("");
      setSubject("");
      setMessage("");
    } catch (error) {
      console.error("Feil ved lagring av melding:", error);
      setFeedback("Kunne ikke sende melding. Prøv igjen.");
    }
  }

  return (
    <div className="page">
      <div className="container">
        <h1>Kontakt oss</h1>
        <p className="muted">
          Har du spørsmål? Send oss en melding.
        </p>

        <form onSubmit={handleSubmit} className="contact-form">
          <input
            type="text"
            placeholder="Navn"
            value={name}
            required
            onChange={(e) => setName(e.target.value)}
          />

          <input
            type="email"
            placeholder="E‑post"
            value={email}
            required
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="text"
            placeholder="Emne"
            value={subject}
            required
            onChange={(e) => setSubject(e.target.value)}
          />

          <textarea
            placeholder="Melding"
            rows="5"
            value={message}
            required
            onChange={(e) => setMessage(e.target.value)}
          />

          <button type="submit" className="btn primary">
            Send melding
          </button>
        </form>

        {feedback && <p style={{ marginTop: "1rem", color: "green" }}>{feedback}</p>}
      </div>
    </div>
  );
}