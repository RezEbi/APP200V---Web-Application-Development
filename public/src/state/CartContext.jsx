import { createContext, useContext, useState } from "react";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);

  // Legg til vare i handlekurven
  function addToCart(item) {
    setCart(prev => {
      const exists = prev.find(p => p.id === item.id);
      if (exists) {
        return prev.map(p =>
          p.id === item.id ? { ...p, qty: p.qty + 1 } : p
        );
      }
      return [...prev, { ...item, qty: 1 }];
    });
  }

  // Fjern vare fra handlekurven
  function removeFromCart(id) {
    setCart(prev => prev.filter(item => item.id !== id));
  }

  // Oppdater antall (qty) for en vare
  function updateQty(id, qty) {
    setCart(prev =>
      prev.map(item => (item.id === id ? { ...item, qty: Number(qty) } : item))
    );
  }

  // Total pris
  function total() {
    return cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  }

  // Tøm hele handlekurven
  function clearCart() {
    setCart([]);
  }

  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, updateQty, total, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
}

// Hook for å bruke handlekurven
export function useCart() {
  return useContext(CartContext);
}