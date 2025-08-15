import React from "react";
import "../assets/css/Header.css";

function Header() {
  return (
    <header className="header">
      <div className="container">
        <h1 className="logo">Từ điển tiếng Nhật</h1>
        <nav>
          <ul>
            <li>
              <a href="/">Trang chủ</a>
            </li>
            <li>
              <a href="/about">Giới thiệu</a>
            </li>
            <li>
              <a href="/contact">Liên hệ</a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Header;
