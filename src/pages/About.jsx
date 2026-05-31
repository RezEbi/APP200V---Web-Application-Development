// src/pages/About.jsx
import React from "react";
import { useReveal } from "../utils/useReveal";
import "../styles/about.css";

export default function About() {
  // aktiver scroll reveal
  useReveal();

  return (
    <div className="about-page">
      <div className="about-container">

        {/* HERO */}
        <div className="about-hero reveal" data-reveal>
          <h1>Flavour House</h1>
          <p>
            More than taste - an experience you can feel.
          </p>
        </div>

        {/* INTRO */}
        <p className="muted mt-3 reveal" data-reveal>
          At Flavour House, we believe that food is not just about what you eat -
          it's about how it makes you feel. Every visit should be more than a meal.
          It should be a moment.
        </p>

        {/* STORY */}
        <div className="card mt-4 reveal" data-reveal>
          <h3>Our Story</h3>
          <p>
            Flavour House was created with a simple idea - to bring people together
            through meaningful dining experiences. We wanted to create a space where
            guests can slow down, disconnect from everyday stress, and truly enjoy
            the moment.
          </p>

          <p>
            What started as a small vision has grown into a place where atmosphere,
            details, and emotions matter just as much as the food itself.
          </p>
        </div>

        {/* EXPERIENCE */}
        <div className="card mt-4 reveal" data-reveal>
          <h3>The Experience</h3>

          <p>
            Dining with us is about more than taste. It's about the atmosphere,
            the sounds, the energy in the room - and the feeling you get when
            everything comes together.
          </p>

          <p>
            A single dish can remind you of somewhere else. A place, a memory,
            or a moment you didn't even know you missed.
          </p>

          <p>
            That is what we aim to create - not just meals, but experiences that stay with you.
          </p>
        </div>

        {/* VALUES */}
        <div className="grid grid-3 mt-4 reveal-stagger" data-reveal-stagger>
          <div className="card">
            <h4>Atmosphere</h4>
            <p>
              A warm and welcoming space where you can relax and enjoy the moment.
            </p>
          </div>

          <div className="card">
            <h4>Quality</h4>
            <p>
              Carefully selected ingredients and attention to every detail.
            </p>
          </div>

          <div className="card">
            <h4>Experience</h4>
            <p>
              Every visit is designed to feel special, memorable, and unique.
            </p>
          </div>
        </div>

        {/* INFO */}
        <div className="grid grid-3 mt-4 reveal-stagger" data-reveal-stagger>
          <div className="card">
            <h4>Opening Hours</h4>
            <ul>
              <li>Mon-Thu: 11:00-21:00</li>
              <li>Fri-Sat: 11:00-22:30</li>
              <li>Sunday: 12:00-20:00</li>
            </ul>
          </div>

          <div className="card">
            <h4>Good to Know</h4>
            <p>
              Every dish is presented with both flavor and atmosphere in mind.
            </p>
          </div>

          <div className="card">
            <h4>Perfect For</h4>
            <p>
              Casual dinners, celebrations, date nights, and relaxed meals with friends.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
