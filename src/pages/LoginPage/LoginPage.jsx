// src/pages/LoginPage.jsx
import React, { useState } from "react";
import {
  FaEnvelope,
  FaLock,
  FaEye,
  FaEyeSlash,
  FaGoogle,
  FaApple,
} from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { API_BASE } from "../../config";
import "./LoginPage.css";

export default function LoginPage() {
  const [emailOrUsername, setEmailOrUsername] = useState(""); // nhập username hoặc email (nếu bạn map email -> username)
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const extractErr = (obj) => {
    if (!obj) return "";
    if (typeof obj === "string") return obj;
    if (Array.isArray(obj)) return obj.join(", ");
    return Object.entries(obj)
      .map(([k, v]) => `${k}: ${Array.isArray(v) ? v.join(", ") : v}`)
      .join(" | ");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    if (!emailOrUsername || !password) {
      setMessage("Please enter username and password!");
      return;
    }

    try {
      setLoading(true);

      // 1) Lấy token từ SimpleJWT
      const tokenRes = await fetch(`${API_BASE}/api/auth/token/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          username: emailOrUsername,
          password,
        }),
      });

      // log thêm
      console.log("📌 tokenRes status:", tokenRes.status);

      const tokenJson = await tokenRes.json().catch(() => ({}));
      console.log("📌 tokenJson:", tokenJson);

      if (!tokenRes.ok) {
        throw new Error(
          tokenJson?.detail ||
            JSON.stringify(tokenJson) ||
            `${tokenRes.status} ${tokenRes.statusText}`
        );
      }

      const { access, refresh } = tokenJson || {};
      if (!access || !refresh)
        throw new Error("Response does not contain access/refresh token.");

      localStorage.setItem("access", access);
      localStorage.setItem("refresh", refresh);

      // 2) (Khuyến nghị) Lấy thông tin user để hiển thị header/profile
      try {
        const meRes = await fetch(`${API_BASE}/api/auth/me/`, {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${access}`,
          },
        });
        if (meRes.ok) {
          const me = await meRes.json();
          localStorage.setItem("user", JSON.stringify(me));
        } else {
          localStorage.removeItem("user");
        }
      } catch {
        localStorage.removeItem("user");
      }

      // 3) Điều hướng về trang chủ
      navigate("/", { replace: true });
    } catch (err) {
      setMessage(err.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <div className="brand-section">
          <div className="brand-logo">
            <FaLock />
          </div>
          <h1>Welcome Back</h1>
          <p>Login to continue</p>
        </div>

        <form onSubmit={handleSubmit} className="login-form" noValidate>
          <label>Username</label>
          <div className="input-group">
            <FaEnvelope />
            <input
              type="text"
              value={emailOrUsername}
              onChange={(e) => setEmailOrUsername(e.target.value)}
              placeholder="username"
              autoComplete="username"
              required
            />
          </div>

          <label>Password</label>
          <div className="input-group">
            <FaLock />
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••"
              autoComplete="current-password"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              aria-label="Show/hide password"
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>

          <div className="form-options">
            <label>
              <input type="checkbox" /> Remember me
            </label>
            <Link to="/forgot-password">Forgot password?</Link>
          </div>

          <button type="submit" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        {message && <p style={{ color: "red", marginTop: 10 }}>{message}</p>}

        <p>
          Don't have an account? <Link to="/register">Register</Link>
        </p>
      </div>
    </div>
  );
}
