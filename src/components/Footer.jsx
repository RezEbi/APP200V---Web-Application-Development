import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="fh-footer">
      <div className="container fh-footer-inner">
        <div className="fh-footer-brand">
          <h3>Flavor House</h3>
          <p>Taste the world in one place.</p>
        </div>

        <div className="fh-footer-links">
          <Link to="/">Home</Link>
          <Link to="/menu">Menu</Link>
          <Link to="/order">Order</Link>
          <Link to="/book">Book Table</Link>
          <Link to="/contact">Contact</Link>
          <Link to="/about">About</Link>
        </div>

        <div className="fh-footer-contact">
          <p>📍 Oslo, Norway</p>
          <p>📞 +47 000 00 000</p>
          <p>✉️ hello@flavorhouse.com</p>
        </div>
      </div>

      <div className="fh-footer-bottom">
        <p>© 2026 Flavor House. All rights reserved.</p>
      </div>
    </footer>
  );
}
