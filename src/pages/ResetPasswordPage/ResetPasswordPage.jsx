import { useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import "./ResetPasswordPage.css";

const API_BASE = import.meta.env.VITE_API_BASE || "http://127.0.0.1:8888";

function ResetPasswordPage() {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");

  const [verifying, setVerifying] = useState(true);
  const [tokenValid, setTokenValid] = useState(false);
  const [tokenError, setTokenError] = useState("");

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  // Verify token on page load
  useEffect(() => {
    const verifyToken = async () => {
      if (!token) {
        setVerifying(false);
        setTokenError("No reset token provided. Please request a new password reset link.");
        return;
      }

      try {
        const response = await fetch(
          `${API_BASE}/api/auth/verify-reset-token/?token=${token}`
        );
        const data = await response.json();

        if (response.ok && data.valid) {
          setTokenValid(true);
        } else {
          setTokenError(
            data.error || "This password reset link is invalid or has expired."
          );
        }
      } catch {
        setTokenError("Unable to verify the reset link. Please try again.");
      } finally {
        setVerifying(false);
      }
    };

    verifyToken();
  }, [token]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // Validate passwords
    if (password.length < 8) {
      setError("Password must be at least 8 characters long.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(`${API_BASE}/api/auth/reset-password/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          token: token,
          new_password: password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess(true);
      } else {
        setError(
          data.error ||
            data.new_password?.[0] ||
            "Failed to reset password. Please try again."
        );
      }
    } catch {
      setError("An error occurred. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  // Loading state while verifying token
  if (verifying) {
    return (
      <div className="reset-password-container">
        <div className="reset-password-box">
          <div className="verifying-state">
            <div className="spinner"></div>
            <h2>Verifying Reset Link</h2>
            <p>Please wait while we verify your password reset link...</p>
          </div>
        </div>
      </div>
    );
  }

  // Invalid token state
  if (!tokenValid && !success) {
    return (
      <div className="reset-password-container">
        <div className="reset-password-box">
          <div className="error-state">
            <div className="error-icon">⚠️</div>
            <h2>Invalid Reset Link</h2>
            <p>{tokenError}</p>
            <div className="error-actions">
              <Link to="/forgot-password" className="request-new-link-btn">
                Request New Reset Link
              </Link>
              <Link to="/login" className="back-to-login-link">
                Back to Login
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Success state
  if (success) {
    return (
      <div className="reset-password-container">
        <div className="reset-password-box">
          <div className="success-state">
            <div className="success-icon">✓</div>
            <h2>Password Reset Successful!</h2>
            <p>Your password has been successfully reset.</p>
            <p>You can now log in with your new password.</p>
            <Link to="/login" className="login-btn">
              Go to Login
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Reset password form
  return (
    <div className="reset-password-container">
      <div className="reset-password-box">
        <div className="brand-section">
          <div className="brand-logo">🔐</div>
          <h1 className="brand-title">Create New Password</h1>
          <p className="brand-subtitle">
            Enter your new password below. Make sure it's at least 8 characters
            long.
          </p>
        </div>

        {error && <div className="error-message">{error}</div>}

        <form onSubmit={handleSubmit} className="reset-password-form">
          <div className="form-group">
            <label className="form-label">New Password</label>
            <div className="input-group">
              <span className="input-icon">🔒</span>
              <input
                type={showPassword ? "text" : "password"}
                className="form-input"
                placeholder="Enter new password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={8}
              />
              <button
                type="button"
                className="toggle-password"
                onClick={() => setShowPassword(!showPassword)}
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? "👁️" : "👁️‍🗨️"}
              </button>
            </div>
            <p className="input-hint">Minimum 8 characters</p>
          </div>

          <div className="form-group">
            <label className="form-label">Confirm New Password</label>
            <div className="input-group">
              <span className="input-icon">🔒</span>
              <input
                type={showConfirmPassword ? "text" : "password"}
                className="form-input"
                placeholder="Confirm new password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                minLength={8}
              />
              <button
                type="button"
                className="toggle-password"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                aria-label={
                  showConfirmPassword ? "Hide password" : "Show password"
                }
              >
                {showConfirmPassword ? "👁️" : "👁️‍🗨️"}
              </button>
            </div>
          </div>

          <button type="submit" className="submit-btn" disabled={loading}>
            {loading ? "Resetting Password..." : "Reset Password"}
          </button>
        </form>

        <p className="login-link">
          Remember your password? <Link to="/login">Back to Login</Link>
        </p>
      </div>
    </div>
  );
}

export default ResetPasswordPage;
