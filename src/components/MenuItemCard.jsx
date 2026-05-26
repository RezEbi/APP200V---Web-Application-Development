import "./MenuItemCard.css";
import { useCart } from "../state/CartContext";

export default function MenuItemCard({ item }) {
  const { addToCart } = useCart();

  return (
    <div className="menu-card card">
      

      <div className="menu-info">
        <h3>{item.name}</h3>
        <p className="muted">{item.description}</p>

        <div className="menu-footer">
          <span className="price">{item.price} kr</span>

          <button
            className="add-btn"
            onClick={() => addToCart(item)}
          >
            Add
          </button>
        </div>
      </div>
    </div>
  );
}
