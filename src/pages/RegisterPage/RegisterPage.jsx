// src/pages/RegisterPage.jsx
import React, { useState } from "react";
import {
  FaEnvelope,
  FaLock,
  FaUser,
  FaEye,
  FaEyeSlash,
  FaGoogle,
  FaApple,
} from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import "./RegisterPage.css";

const API_BASE = import.meta?.env?.VITE_API_BASE || "http://127.0.0.1:8888";

export default function RegisterPage() {
  const [fullName, setFullName] = useState(""); // Họ và tên
  const [username, setUsername] = useState(""); // BẮT BUỘC theo bảng
  const [email, setEmail] = useState(""); // TÙY CHỌN (blank được)
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [loading, setLoading] = useState(false);
  const [serverErr, setServerErr] = useState("");

  const navigate = useNavigate();

  // Gom lỗi DRF
  const extractErrorMsg = (errObj) => {
    if (!errObj) return "";
    if (typeof errObj === "string") return errObj;
    if (Array.isArray(errObj)) return errObj.join(", ");
    return Object.entries(errObj)
      .map(([k, v]) => `${k}: ${Array.isArray(v) ? v.join(", ") : v}`)
      .join(" | ");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setServerErr("");

    if (!fullName || !username || !password || !confirmPassword) {
      return setServerErr("Please fill in all required fields (*).");
    }
    if (password.length < 6) {
      return setServerErr("Password must be at least 6 characters.");
    }
    if (password !== confirmPassword) {
      return setServerErr("Passwords do not match!");
    }

    // Tách họ tên (đơn giản)
    const [first_name, ...rest] = fullName.trim().split(" ");
    const last_name = rest.join(" ");

    // Khớp serializer/back-end: username (bắt buộc), email (optional), role default 'user'
    const payload = {
      username, // <- BẮT BUỘC, unique
      email: email || "", // <- Có thể rỗng
      password,
      first_name,
      last_name,
      role: "user", // <- choices: user/admin, default 'user'
    };

    try {
      setLoading(true);
      const res = await fetch(`${API_BASE}/api/auth/register/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        let msg = `${res.status} ${res.statusText}`;
        try {
          msg = extractErrorMsg(await res.json()) || msg;
        } catch {}
        throw new Error(msg);
      }

      // Tuỳ backend: có thể trả { user, access, refresh }.
      // Ở luồng “đăng ký xong → sang login”, KHÔNG lưu token tại đây:
      // const json = await res.json();
      // (Nếu muốn auto-login, có thể lưu json.access/json.refresh + json.user rồi navigate("/"))

      navigate("/login", { replace: true });
    } catch (e) {
      setServerErr(e.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-container">
      <div className="register-box">
        {/* Brand */}
        <div className="brand-section">
          <div className="brand-logo">
            <FaUser />
          </div>
          <h1 className="brand-title">Create New Account</h1>
          <p className="brand-subtitle">Register to start your journey</p>
        </div>

        {/* Social (placeholder) */}
        <div className="social-login">
          <button type="button" className="social-btn google">
            <FaGoogle />
            <span>Sign up with Google</span>
          </button>
          <button type="button" className="social-btn apple">
            <FaApple />
            <span>Sign up with Apple</span>
          </button>
        </div>

        <div className="divider">
          <span>or</span>
        </div>

        {/* Error */}
        {serverErr && <div className="server-error">{serverErr}</div>}

        {/* Form */}
        <form onSubmit={handleSubmit} className="register-form" noValidate>
          <div className="form-group">
            <label className="form-label">Full Name *</label>
            <div className="input-group">
              <FaUser className="input-icon" />
              <input
                type="text"
                placeholder="Enter your full name"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="form-input"
                autoComplete="name"
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Username *</label>
            <div className="input-group">
              <FaUser className="input-icon" />
              <input
                type="text"
                placeholder="Username (letters/numbers and @/./+/-/_ only)"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="form-input"
                autoComplete="username"
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Email (optional)</label>
            <div className="input-group">
              <FaEnvelope className="input-icon" />
              <input
                type="email"
                placeholder="example@gmail.com (can be left empty)"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="form-input"
                autoComplete="email"
              />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Password *</label>
            <div className="input-group">
              <FaLock className="input-icon" />
              <input
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="form-input"
                autoComplete="new-password"
                minLength={6}
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="password-toggle"
                aria-label="Show/hide password"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Confirm Password *</label>
            <div className="input-group">
              <FaLock className="input-icon" />
              <input
                type={showConfirmPassword ? "text" : "password"}
                placeholder="••••••••"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="form-input"
                autoComplete="new-password"
                minLength={6}
                required
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="password-toggle"
                aria-label="Show/hide confirm password"
              >
                {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>

          <div className="form-options">
            <label className="terms-checkbox">
              <input type="checkbox" required />
              <span>
                I agree to the <a href="#">Terms of Service</a> and{" "}
                <a href="#">Privacy Policy</a>
              </span>
            </label>
          </div>

          <button type="submit" className="register-btn" disabled={loading}>
            {loading ? "Creating..." : "Create Account"}
          </button>
        </form>

        <p className="login-link">
          Already have an account? <Link to="/login">Login now</Link>
        </p>

        <div className="footer">
          <p>
            By registering, you confirm that you have read and understand{" "}
            <a href="#">our terms</a>.
          </p>
        </div>
      </div>
    </div>
  );
}
