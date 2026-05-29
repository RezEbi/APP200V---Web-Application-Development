import { useState } from "react";
import { NavLink } from "react-router-dom";
import "./Navbar.css";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  const closeMenu = () => setOpen(false);

  return (
    <header className="navbar">
      <div className="navbar-inner">
        <NavLink to="/" className="navbar-brand" onClick={closeMenu}>
  <img src="/images/logo2.png" alt="Flavor House" className="brand-logo" />
</NavLink>

        <button
          className={`navbar-toggle ${open ? "active" : ""}`}
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
          aria-expanded={open}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        <div
          className={`navbar-backdrop ${open ? "show" : ""}`}
          onClick={closeMenu}
        ></div>

        <nav className={`navbar-menu ${open ? "open" : ""}`}>
          <div className="navbar-links">
            <NavLink to="/" end onClick={closeMenu}>
              Home
            </NavLink>
            <NavLink to="/menu" onClick={closeMenu}>
              Menu
            </NavLink>
            <NavLink to="/order" onClick={closeMenu}>
              Order
            </NavLink>
            <NavLink to="/book" onClick={closeMenu}>
              Book Table
            </NavLink>
            <NavLink to="/contact" onClick={closeMenu}>
              Contact
            </NavLink>
            <NavLink to="/about" onClick={closeMenu}>
              About
            </NavLink>
            <NavLink to="/admin" onClick={closeMenu}>
              Admin
            </NavLink>
          </div>

        </nav>
      </div>
    </header>
  );
}
