import { useState } from "react";
import { NavLink } from "react-router-dom";
import "./Navbar.css";
import logo from "../assets/flavorhouse.png";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="navbar">
      <div className="navbar-inner">

        {/* LOGO */}
        <NavLink
          to="/"
          className="navbar-logo"
          onClick={() => setOpen(false)}
          aria-label="Flavor House"
        >
          <img src={logo} alt="Flavor House" className="logo-img" />
        </NavLink>

        {/* Hamburger (mobil) */}
        <button
          className="navbar-toggle"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
          aria-expanded={open}
        >
          <span></span><span></span><span></span>
        </button>

        {/* Backdrop */}
        <div
          className={`backdrop ${open ? "show" : ""}`}
          onClick={() => setOpen(false)}
        />

        {/* Meny */}
        <nav className={`navbar-menu ${open ? "open" : ""}`}>
          <div className="navbar-pills">
            <NavLink onClick={() => setOpen(false)} to="/" end>Home</NavLink>
            <NavLink onClick={() => setOpen(false)} to="/menu">Menu</NavLink>
            <NavLink onClick={() => setOpen(false)} to="/order">Order</NavLink>
            <NavLink onClick={() => setOpen(false)} to="/book">Book Table</NavLink>
            <NavLink onClick={() => setOpen(false)} to="/contact">Contact</NavLink>
            <NavLink onClick={() => setOpen(false)} to="/about">About</NavLink>
            <NavLink onClick={() => setOpen(false)} to="/admin">Admin</NavLink>
          </div>
        </nav>

      </div>
    </header>
  );
}