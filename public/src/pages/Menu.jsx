// src/pages/Menu.jsx
import { useEffect, useState } from "react";
import MenuItemCard from "../components/MenuItemCard";

export default function Menu() {
  const [items, setItems] = useState([]);
  const [activeCategory, setActiveCategory] = useState("Alle");
  const [search, setSearch] = useState("");

  // Last inn menyen
  useEffect(() => {
    fetch("/menu.json")
      .then((res) => res.json())
      .then((data) => setItems(data));
  }, []);

  // Lag liste over kategorier + "Alle"
  const categories = ["Alle", ...new Set(items.map((i) => i.category))];

  // Filtrering basert på kategori og søk
  const filtered = items.filter((item) => {
    const matchesCategory =
      activeCategory === "Alle" || item.category === activeCategory;
    const matchesSearch =
      item.name.toLowerCase().includes(search.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="page">
      <div className="container">

        <h1>Meny</h1>
        <p className="muted">Finn din favoritt blant våre retter</p>

        {/* KATEGORI-KNAPPER */}
        <div className="menu-categories">
          {categories.map((cat) => (
            <button
              key={cat}
              className={`menu-category ${activeCategory === cat ? "active" : ""}`}
              onClick={() => setActiveCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* SØK */}
        <input
          className="menu-search"
          placeholder="Søk etter rett..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        {/* GRID MED RETTER */}
        <div className="menu-grid grid grid-3 mt-4">
          {filtered.map((item) => (
            <MenuItemCard key={item.id} item={item} />
          ))}
        </div>
      </div>
    </div>
  );
}