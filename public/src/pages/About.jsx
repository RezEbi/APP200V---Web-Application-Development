// src/pages/About.jsx
import React from "react";
import { useReveal } from "../utils/useReveal";

export default function About() {
  // aktiver scroll reveal
  useReveal();

  return (
    <div className="page">
      <div className="container">
        {/* Tittel */}
        <h1 data-reveal className="reveal">
          Om restauranten
        </h1>

        <p data-reveal className="muted reveal">
          Vi kombinerer ferske råvarer med raske leveranser – bestill på nett,
          reserver bord, eller kom innom for en hyggelig opplevelse.
        </p>

        {/* Historie + filosofi */}
        <div
          data-reveal-stagger
          className="grid grid-2 mt-4 reveal-stagger"
        >
          <div className="card">
            <h3>Historie</h3>
            <p>
              Restauranten startet som et lite kjøkkenprosjekt og har vokst til
              et lokalt møtested for matglede. Målet er å gjøre god mat lett
              tilgjengelig – både i lokalet og på nett.
            </p>
          </div>

          <div className="card">
            <h3>Filosofi</h3>
            <p>
              Enkle retter, gode råvarer, og en smidig digital opplevelse.
              Menyen oppdateres jevnlig med sesongens favoritter.
            </p>
          </div>
        </div>

        {/* Info kort */}
        <div
          data-reveal-stagger
          className="grid grid-3 mt-4 reveal-stagger"
        >
          <div className="card">
            <h4>Åpningstider</h4>
            <ul>
              <li>Man–Tor: 11:00–21:00</li>
              <li>Fre–Lør: 11:00–22:30</li>
              <li>Søndag: 12:00–20:00</li>
            </ul>
          </div>

          <div className="card">
            <h4>Adresse</h4>
            <p>Eksempelveien 12, 0001 Oslo</p>
          </div>

          <div className="card">
            <h4>Kontakt</h4>
            <p>E-post: hello@restaurant.no</p>
            <p>Telefon: 99 99 99 99</p>
          </div>
        </div>
      </div>
    </div>
  );
}