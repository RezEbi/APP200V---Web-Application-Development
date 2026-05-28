// src/pages/Order.jsx
import { useState } from "react";
import { useCart } from "../state/CartContext";
import Checkout from "./Checkout"; // vi rendrer denne direkte (kompakt)

export default function Order() {
  const { cart, updateQty, removeFromCart, total } = useCart();
  const [showCheckout, setShowCheckout] = useState(false);

  return (
    <div className="page">
      <div className="container">

        <h1>Din bestilling</h1>

        {/* Tom handlekurv */}
        {cart.length === 0 && (
          <p className="muted">Handlekurven er tom.</p>
        )}

        {/* Liste over varer */}
        <div className="order-list">
          {cart.map((item) => (
            <div className="order-item card" key={item.id}>

              {/* Info */}
              <div>
                <h3>{item.name}</h3>
                <p className="muted">{item.description}</p>
              </div>

              {/* Mengde og fjern knapp */}
              <div className="order-controls">
                <input
                  type="number"
                  min="1"
                  value={item.qty}
                  onChange={(e) => updateQty(item.id, e.target.value)}
                />
                <button
                  className="remove-btn"
                  onClick={() => removeFromCart(item.id)}
                >
                  Fjern
                </button>
              </div>

              {/* Pris */}
              <div className="order-price">{item.price * item.qty} kr</div>
            </div>
          ))}
        </div>

        {/* Oppsummering */}
        {cart.length > 0 && !showCheckout && (
          <div className="order-summary card">
            <h2>Total: {total()} kr</h2>

            <button
              className="btn primary"
              style={{ marginTop: "16px" }}
              onClick={() => setShowCheckout(true)}
            >
              Gå til Checkout
            </button>
          </div>
        )}

        {/* Kompakt Checkout seksjon */}
        {showCheckout && (
          <div style={{ marginTop: "30px" }}>
            <Checkout compact />
          </div>
        )}

      </div>
    </div>
  );
}
