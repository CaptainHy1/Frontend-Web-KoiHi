import React, { useState } from "react";
import {
  FaEnvelope,
  FaLock,
  FaEye,
  FaEyeSlash,
  FaGoogle,
  FaApple,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import "./LoginPage.css";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) {
      alert("Vui lòng nhập email và mật khẩu!");
      return;
    }
    console.log("Email:", email, "Password:", password);
    // TODO: gọi API login tại đây
  };

  return (
    <div className="login-container">
      <div className="login-box">
        {/* Logo/Brand */}
        <div className="brand-section">
          <div className="brand-logo">
            <FaLock />
          </div>
          <h1 className="brand-title">Chào mừng trở lại</h1>
          <p className="brand-subtitle">Đăng nhập để tiếp tục</p>
        </div>

        {/* Social Login */}
        <div className="social-login">
          <button className="social-btn google">
            <FaGoogle />
            <span>Tiếp tục với Google</span>
          </button>

          <button className="social-btn apple">
            <FaApple />
            <span>Tiếp tục với Apple</span>
          </button>
        </div>

        <div className="divider">
          <span>hoặc</span>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label className="form-label">Email</label>
            <div className="input-group">
              <FaEnvelope className="input-icon" />
              <input
                type="email"
                placeholder="example@gmail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="form-input"
              />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Mật khẩu</label>
            <div className="input-group">
              <FaLock className="input-icon" />
              <input
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="form-input"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="password-toggle"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>

          <div className="form-options">
            <label className="remember-me">
              <input type="checkbox" />
              <span>Nhớ tôi</span>
            </label>
            <Link to="/forgot-password" className="forgot-password">
              Quên mật khẩu?
            </Link>
          </div>

          <button type="submit" className="login-btn">
            Đăng nhập
          </button>
        </form>

        <p className="register">
          Chưa có tài khoản? <Link to="/register">Đăng ký ngay</Link>
        </p>

        {/* Footer */}
        <div className="footer">
          <p>
            Bằng việc đăng nhập, bạn đồng ý với{" "}
            <a href="#">Điều khoản dịch vụ</a> và{" "}
            <a href="#">Chính sách bảo mật</a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
