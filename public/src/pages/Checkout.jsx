// src/pages/Checkout.jsx
import { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../state/CartContext";
import { createOrder } from "../services/ordersService";

export default function Checkout({ compact = false }) {
  const navigate = useNavigate();
  const { cart, total, clearCart } = useCart();
  const safeCart = cart || [];
  const safeTotal = typeof total === "function" ? total() : 0;

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    pickupTime: "",
    note: "",
  });

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    phone: "",
    pickupTime: "",
  });

  const [status, setStatus] = useState({ loading: false, ok: false, err: "" });

  const itemsCount = useMemo(
    () => safeCart.reduce((acc, it) => acc + (it.qty || 0), 0),
    [safeCart]
  );

  // --- Live validation helpers ---
  const debounceTimer = useRef(null);
  const DEBOUNCE_MS = 200; // juster til 0 hvis du vil ha "helt live"

  function validateField(field, value) {
    const v = (value ?? "").trim();

    if (field === "name") {
      if (!v) return "Vennligst fyll inn navn.";
      if (v.length < 2) return "Navnet må være minst 2 tegn.";
      if (!/^[A-Za-zÆØÅæøå \-]+$/.test(v)) return "Ugyldige tegn i navn.";
    }

    if (field === "email") {
      if (!v) return "Vennligst fyll inn e-post.";
      if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(v)) return "Ugyldig e‑post.";
    }

    if (field === "pickupTime") {
      if (!v) return "Velg hentetid.";
    }

    if (field === "phone" && v) {
      const digits = v.replace(/\s+/g, "");
      if (!/^\+?\d{8,15}$/.test(digits)) return "Ugyldig telefonnummer.";
    }

    return "";
  }

  function validateAll(nextForm = form) {
    const e = {
      name: validateField("name", nextForm.name),
      email: validateField("email", nextForm.email),
      phone: validateField("phone", nextForm.phone),
      pickupTime: validateField("pickupTime", nextForm.pickupTime),
    };
    setErrors(e);
    return e;
  }

  // valider løpende ved endring (debounced)
  function onChange(e) {
    const { name, value } = e.target;
    const nextForm = { ...form, [name]: value };
    setForm(nextForm);

    // Debounce live validation
    if (debounceTimer.current) clearTimeout(debounceTimer.current);
    debounceTimer.current = setTimeout(() => {
      const msg = validateField(name, value);
      setErrors((prev) => ({ ...prev, [name]: msg }));
    }, DEBOUNCE_MS);
  }

  useEffect(() => {
    return () => {
      if (debounceTimer.current) clearTimeout(debounceTimer.current);
    };
  }, []);

  const cartError = safeCart.length === 0 ? "Handlekurven er tom." : "";

  // Skjema er gyldig hvis ingen feilmeldinger og påkrevde felter er fylte
  const isFormValid = useMemo(() => {
    const anyErr =
      !!errors.name || !!errors.email || !!errors.phone || !!errors.pickupTime;
    const requiredFilled =
      form.name.trim() && form.email.trim() && form.pickupTime.trim();
    return !anyErr && requiredFilled && !cartError;
  }, [errors, form, cartError]);

  async function onSubmit(e) {
    e.preventDefault();
    // Endelig sjekk
    const eMap = validateAll();
    if (
      eMap.name ||
      eMap.email ||
      eMap.phone ||
      eMap.pickupTime ||
      cartError
    ) {
      return;
    }

    try {
      setStatus({ loading: true, ok: false, err: "" });

      await createOrder({
        items: safeCart.map(({ id, name, price, qty }) => ({
          id,
          name,
          price,
          qty,
        })),
        customer: {
          name: form.name.trim(),
          email: form.email.trim(),
          phone: form.phone.trim(),
          pickupTime: form.pickupTime,
          note: form.note.trim(),
        },
        note: form.note.trim(),
      });

      if (typeof clearCart === "function") clearCart();
      setStatus({ loading: false, ok: true, err: "" });
      setTimeout(() => navigate("/order"), 1200);
    } catch (err) {
      setStatus({
        loading: false,
        ok: false,
        err: err?.message || "Kunne ikke sende ordren",
      });
    }
  }

  const Wrapper = ({ children }) =>
    compact ? (
      <div style={{ marginTop: 0 }}>{children}</div>
    ) : (
      <div className="page">
        <div className="container">{children}</div>
      </div>
    );

  return (
    <Wrapper>
      {!compact && (
        <>
          <h1>Checkout</h1>
          <p className="muted">Fullfør bestillingen din og velg hentetid.</p>
        </>
      )}

      <div className="card mt-4">
        {compact ? <h3>Oppsummering</h3> : <h2>Oppsummering</h2>}

        {safeCart.length === 0 ? (
          <p className="muted">Handlekurven er tom.</p>
        ) : (
          <ul className="checkout-list">
            {safeCart.map((it) => (
              <li key={it.id} className="checkout-row">
                <span className="checkout-title">
                  {it.name} <span className="muted">× {it.qty}</span>
                </span>
                <span className="checkout-price">{it.price * it.qty} kr</span>
              </li>
            ))}
            <li className="checkout-row total">
              <span>Total ({itemsCount} stk)</span>
              <span>{safeTotal} kr</span>
            </li>
          </ul>
        )}

        {cartError && <p className="err">{cartError}</p>}
      </div>

      <form className="card mt-4 checkout-form" onSubmit={onSubmit} noValidate>
        {compact ? <h3>Kundeinformasjon</h3> : <h2>Kundeinformasjon</h2>}

        <div className="grid grid-2">
          <div>
            <label htmlFor="name">Fullt navn</label>
            <input
              id="name"
              name="name"
              value={form.name}
              onChange={onChange}
              placeholder="Ditt navn"
              aria-invalid={!!errors.name}
              aria-describedby={errors.name ? "err-name" : undefined}
              autoComplete="name"
            />
            {errors.name && (
              <p id="err-name" className="err">
                {errors.name}
              </p>
            )}
          </div>

          <div>
            <label htmlFor="email">E-post</label>
            <input
              id="email"
              type="text"        // unngå native invalid-blink
              inputMode="email"   // mobil får e-post-tastatur
              name="email"
              value={form.email}
              onChange={onChange}
              placeholder="navn@domene.no"
              aria-invalid={!!errors.email}
              aria-describedby={errors.email ? "err-email" : undefined}
              autoComplete="email"
            />
            {errors.email && (
              <p id="err-email" className="err">
                {errors.email}
              </p>
            )}
          </div>

          <div>
            <label htmlFor="phone">Telefon (valgfritt)</label>
            <input
              id="phone"
              name="phone"
              value={form.phone}
              onChange={onChange}
              placeholder="+47 …"
              aria-invalid={!!errors.phone}
              aria-describedby={errors.phone ? "err-phone" : undefined}
              autoComplete="tel"
            />
            {errors.phone && (
              <p id="err-phone" className="err">
                {errors.phone}
              </p>
            )}
          </div>

          <div>
            <label htmlFor="pickupTime">Hentetid</label>
            <input
              id="pickupTime"
              type="time"
              name="pickupTime"
              value={form.pickupTime}
              onChange={onChange}
              aria-invalid={!!errors.pickupTime}
              aria-describedby={errors.pickupTime ? "err-pickupTime" : undefined}
            />
            {errors.pickupTime && (
              <p id="err-pickupTime" className="err">
                {errors.pickupTime}
              </p>
            )}
          </div>
        </div>

        <div className="mt-4">
          <label htmlFor="note">Notat (allergier, ønsker…)</label>
          <textarea
            id="note"
            name="note"
            rows="3"
            value={form.note}
            onChange={onChange}
            placeholder="Valgfritt"
          />
        </div>

        <div className="checkout-actions">
          {compact && (
            <button
              type="button"
              className="btn"
              onClick={() => navigate("/order")}
            >
              Tilbake
            </button>
          )}

          <button className="btn primary" disabled={status.loading || !isFormValid}>
            {status.loading ? "Sender…" : "Send bestilling"}
          </button>
        </div>

        {status.err && <p className="err mt-4">Feil: {status.err}</p>}
        {status.ok && <p className="ok mt-4">✅ Bestilling sendt!</p>}
      </form>
    </Wrapper>
  );
}
``