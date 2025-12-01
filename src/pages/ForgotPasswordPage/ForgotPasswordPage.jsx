// src/pages/ForgotPasswordPage/ForgotPasswordPage.jsx
import React, { useState } from "react";
import { FaEnvelope, FaArrowLeft, FaPaperPlane } from "react-icons/fa";
import { Link } from "react-router-dom";
import "./ForgotPasswordPage.css";

const API_BASE = import.meta?.env?.VITE_API_BASE || "http://127.0.0.1:8888";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  const extractErrorMsg = (errObj) => {
    if (!errObj) return "";
    if (typeof errObj === "string") return errObj;
    if (Array.isArray(errObj)) return errObj.join(", ");
    if (errObj.detail) return errObj.detail;
    return Object.entries(errObj)
      .map(([k, v]) => `${k}: ${Array.isArray(v) ? v.join(", ") : v}`)
      .join(" | ");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setIsSuccess(false);

    if (!email) {
      setMessage("Please enter your email address.");
      return;
    }

    try {
      setLoading(true);
      const res = await fetch(`${API_BASE}/api/auth/forgot-password/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const json = await res.json().catch(() => ({}));

      if (!res.ok) {
        throw new Error(extractErrorMsg(json) || `${res.status} ${res.statusText}`);
      }

      setIsSuccess(true);
      setMessage(json.detail || "Password reset email has been sent. Please check your inbox.");
    } catch (err) {
      setMessage(err.message || "Failed to send reset email.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="forgot-password-container">
      <div className="forgot-password-box">
        {/* Back link */}
        <Link to="/login" className="back-link">
          <FaArrowLeft /> Back to Login
        </Link>

        {/* Brand */}
        <div className="brand-section">
          <div className="brand-logo">
            <FaEnvelope />
          </div>
          <h1 className="brand-title">Forgot Password?</h1>
          <p className="brand-subtitle">
            Enter your email address and we'll send you a link to reset your password.
          </p>
        </div>

        {/* Success state */}
        {isSuccess ? (
          <div className="success-state">
            <div className="success-icon">
              <FaPaperPlane />
            </div>
            <h2>Check your email</h2>
            <p>{message}</p>
            <p className="email-sent-to">
              We sent a password reset link to: <strong>{email}</strong>
            </p>
            <div className="success-actions">
              <Link to="/login" className="back-to-login-btn">
                Back to Login
              </Link>
              <button
                type="button"
                className="resend-btn"
                onClick={handleSubmit}
                disabled={loading}
              >
                {loading ? "Sending..." : "Resend Email"}
              </button>
            </div>
          </div>
        ) : (
          <>
            {/* Error message */}
            {message && <div className="error-message">{message}</div>}

            {/* Form */}
            <form onSubmit={handleSubmit} className="forgot-password-form" noValidate>
              <div className="form-group">
                <label className="form-label">Email Address</label>
                <div className="input-group">
                  <FaEnvelope className="input-icon" />
                  <input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="form-input"
                    autoComplete="email"
                    autoFocus
                    required
                  />
                </div>
              </div>

              <button type="submit" className="submit-btn" disabled={loading}>
                {loading ? "Sending..." : "Send Reset Link"}
              </button>
            </form>

            <p className="login-link">
              Remember your password? <Link to="/login">Login</Link>
            </p>
          </>
        )}
      </div>
    </div>
  );
}
