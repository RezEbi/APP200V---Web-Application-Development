// src/pages/Home.jsx
import { useState, useEffect } from "react";
import heroImage from "../assets/hero.jpg"; // <-- HERO-BILDE

import SpecialCard from "../components/SpecialCard";

export default function Home() {
  const [specials, setSpecials] = useState([]);

  useEffect(() => {
    fetch("/menu.json")
      .then((res) => res.json())
      .then((data) => {
        setSpecials(data.filter((item) => item.special));
      });
  }, []);

  return (
    <div className="page">

      {/* HERO */}
      <div className="hero container">
        <div className="hero-content">
          <h1>Fresh • Local • Fast</h1>
          <p>Bestill på nett, reserver bord eller oppdag dagens spesialiteter.</p>

          <div className="hero-cta">
            <a href="/order" className="btn primary">Order now</a>
            <a href="/book" className="btn">Book a table</a>
          </div>
        </div>

        {/* HERO IMAGE */}
        <div className="hero-visual card">
          <img src={heroImage} alt="Restaurant hero" className="hero-image" />
        </div>
      </div>

      {/* SPECIALS */}
      <section className="container mt-4">
        <h2>Dagens spesialiteter</h2>
        <p className="muted">Utvalgte retter anbefalt av kokkene våre</p>

        <div className="specials-grid grid grid-3 mt-4">
          {specials.map((item) => (
            <SpecialCard key={item.id} item={item} />
          ))}
        </div>
      </section>

    </div>
  );
}