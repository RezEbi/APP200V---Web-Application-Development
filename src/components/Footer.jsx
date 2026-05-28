import { FaFacebookF, FaWhatsapp } from "react-icons/fa";
import "./Footer.css";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">

        <div className="footer-brand">
          <h2>Flavor House</h2>
          <p>Taste the world</p>
        </div>

        <div className="footer-contact">
          <h4>Contact</h4>

          <span>📍 Karl Johans gate 22, Oslo</span>
          <span>✉️ flavourhouse@restaurant.no</span>
          <span>📞 +47 318 84 217</span>
        </div>

        <div className="footer-social">
          <h4>Follow Us</h4>

          <div className="social-icons">
            <a href="#">
              <FaFacebookF />
            </a>

            <a href="#">
              <FaWhatsapp />
            </a>
          </div>
        </div>

      </div>

      <div className="footer-bottom">
        © 2026 Flavor House. All rights reserved.
      </div>
    </footer>
  );
}
