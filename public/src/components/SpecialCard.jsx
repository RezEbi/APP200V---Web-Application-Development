import "./SpecialCard.css";
import { useCart } from "../state/CartContext";

export default function SpecialCard({ item }) {
  const { addToCart } = useCart();

  return (
    <div className="special-card card">
      <img src={item.image} alt={item.name} className="special-img" />

      <div className="special-info">
        <h3>{item.name}</h3>
        <p className="muted">{item.description}</p>

        <div className="special-footer">
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