// src/pages/Login.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../state/AuthContext";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");

  const ctx = useAuth();
  const login = ctx?.login;
  const navigate = useNavigate();

  async function onSubmit(e) {
    e.preventDefault();
    setErr("");

    if (!login) {
      setErr("Auth ikke initialisert. Sjekk AuthProvider i main.jsx.");
      return;
    }

    try {
      await login(email, password);
      navigate("/admin");
    } catch (error) {
      if (error.code === "auth/wrong-password" || error.code === "auth/invalid-credential") {
        setErr("Feil e‑post eller passord.");
      } else if (error.code === "auth/user-not-found") {
        setErr("Bruker finnes ikke.");
      } else if (error.code === "auth/too-many-requests") {
        setErr("For mange forsøk. Prøv igjen senere.");
      } else {
        setErr(`Innlogging feilet: ${error.code || error.message}`);
      }
    }
  }

  return (
    <div className="page">
      <div className="container">
        <h1>Logg inn</h1>

        <form onSubmit={onSubmit}>
          <input
            type="email"
            placeholder="E‑post"
            value={email}
            required
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Passord"
            value={password}
            required
            onChange={(e) => setPassword(e.target.value)}
          />

          <button type="submit" className="btn primary">
            Logg inn
          </button>

          {err && <p style={{ color: "red" }}>{err}</p>}
        </form>
      </div>
    </div>
  );
}