import "./MenuItemCard.css";
import { useCart } from "../state/CartContext";
import { useState } from "react";

export default function MenuItemCard({ item }) {
  const { addToCart } = useCart();
  const [added, setAdded] = useState(false);

  const handleAdd = () => {
    addToCart(item);
    setAdded(true);

    setTimeout(() => {
      setAdded(false);
    }, 1500);
  };

  return (
    <div className="menu-card card">
      <div className="menu-info">
        <h3>{item.name}</h3>
        <p className="muted">{item.description}</p>

        <div className="menu-footer">
          <span className="price">{item.price} kr</span>

          <button
            className="add-btn"
            onClick={handleAdd}
          >
            {added ? "Added ✓" : "Add"}
          </button>
        </div>
      </div>
    </div>
  );
}
