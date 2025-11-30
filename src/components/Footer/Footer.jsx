import React from "react";
import {
  FaFacebookF,
  FaTiktok,
  FaYoutube,
  FaInstagram,
  FaLine,
  FaApple,
  FaGooglePlay,
  FaChrome,
  FaFirefox,
} from "react-icons/fa";
import "./Footer.css"; // Import your CSS file

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Cột 1 - Thông tin liên hệ */}
        <div className="footer-col">
          {/* <h3 className="logo">mazii</h3> */}
          <p>Koihi - Your trusted Japanese companion</p>
          <p>📍 54 Nguyen Luong Bang, Hoa Khanh, Da Nang</p>
          <p>📧 khoibene@gmail.com</p>
          <p>📞 (+84) 762 601 342</p>
        </div>

        {/* Cột 2 - Mạng xã hội & Tiện ích */}
        <div className="footer-col">
          <h4>Social network</h4>
          <div className="social-icons">
            <FaFacebookF />
            <FaTiktok />
            <FaYoutube />
            <FaInstagram />
            <FaLine />
          </div>

          <h4>Utilities</h4>
          <div className="browser-icons">
            <FaChrome />
            <FaFirefox />
          </div>
        </div>

        {/* Cột 3 - Liên kết */}
        <div className="footer-col">
          <h4>About Koihi</h4>
          <ul>
            <li>Introduction</li>
            <li>Partners</li>
            <li>Help</li>
            <li>Report Issues</li>
            <li>Terms of Use</li>
            <li>Privacy Policy</li>
          </ul>
        </div>

        {/* Cột 4 - Chính sách giao dịch */}
        <div className="footer-col">
          <h4>Transaction Policies</h4>
          <ul>
            <li>Payment Policy</li>
            <li>Shipping Policy</li>
            <li>Return Policy</li>
            <li>Payment Guide</li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© 2025 KOIHI</p>
      </div>
    </footer>
  );
}

export default Footer;
