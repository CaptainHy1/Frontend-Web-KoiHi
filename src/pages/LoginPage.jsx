import React, { useState } from "react";
import { FaEnvelope, FaLock } from "react-icons/fa";
import "../assets/css/LoginPage.css";
import Sidebar from "../components/Sidebar";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) {
      alert("Vui lòng nhập email và mật khẩu!");
      return;
    }
    console.log("Email:", email, "Password:", password);
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Đăng nhập với</h2>
        <div className="social-login">
          <button className="google">Google</button>
          <button className="apple">Apple</button>
        </div>
        <p className="divider">hoặc dùng email và mật khẩu</p>

        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <FaEnvelope className="icon" />
            <input
              type="email"
              placeholder="Nhập email của bạn"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="input-group">
            <FaLock className="icon" />
            <input
              type="password"
              placeholder="Nhập mật khẩu"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="options">
            <a href="#">Quên mật khẩu?</a>
          </div>

          <button type="submit" className="login-btn">
            Đăng nhập
          </button>
        </form>

        <p className="register">
          Bạn chưa có tài khoản? <a href="#">Đăng ký</a>
        </p>
      </div>
    </div>
  );
}

export default LoginPage;
