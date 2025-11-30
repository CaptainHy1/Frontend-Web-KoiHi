import React from "react";
import { FaBell, FaFire } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import "./Header.css";

function Header() {
  const navigate = useNavigate();

  // Lấy user từ localStorage
  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
    localStorage.removeItem("user");
    navigate("/login"); // đưa về trang login
  };

  return (
    <header className="header">
      <div className="header-left">
        <h3>Good day!</h3>
      </div>

      <div className="header-right">
        {user ? (
          <>
            <span className="username">Hello {user.username}</span>
            <button className="btn logout" onClick={handleLogout}>
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="btn login">
              Login
            </Link>
            <Link to="/register" className="btn register">
              Register
            </Link>
          </>
        )}

        <div className="dropdown">
          <button className="flag-btn">🇺🇸</button>
        </div>

        <FaBell className="icon bell" />
        <FaFire className="icon fire" />
      </div>
    </header>
  );
}

export default Header;
