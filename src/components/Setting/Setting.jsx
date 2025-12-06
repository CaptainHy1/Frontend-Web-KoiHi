import React, { useEffect, useState } from "react";
import { API_BASE } from "../../config";

export default function SettingPage() {
  const [user, setUser] = useState(null);
  const [infoForm, setInfoForm] = useState({ username: "", email: "" });
  const [passForm, setPassForm] = useState({
    old_password: "",
    new_password: "",
  });
  const [loading, setLoading] = useState(true);
  const [savingInfo, setSavingInfo] = useState(false);
  const [changingPass, setChangingPass] = useState(false);

  // Thêm state type để phân biệt màu sắc thông báo (success/error)
  const [message, setMessage] = useState({ text: "", type: "" });

  // 🔹 Helper để hiển thị thông báo
  const showMessage = (text, type = "success") => {
    setMessage({ text, type });
    // Tự động ẩn sau 3s
    setTimeout(() => setMessage({ text: "", type: "" }), 3000);
  };

  // 🔹 Fetch user info
  const fetchUser = () => {
    const token = localStorage.getItem("access");
    if (!token) {
      setUser(null);
      setLoading(false);
      return;
    }

    fetch(`${API_BASE}/api/auth/me/`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setUser(data);
        setInfoForm({ username: data.username, email: data.email });
      })
      .catch((err) => {
        console.error("❌ Lỗi fetch user:", err);
        setUser(null);
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const handleInfoChange = (e) =>
    setInfoForm({ ...infoForm, [e.target.name]: e.target.value });

  const handlePassChange = (e) =>
    setPassForm({ ...passForm, [e.target.name]: e.target.value });

  // 🔹 Submit info update
  const handleInfoSubmit = (e) => {
    e.preventDefault();
    const token = localStorage.getItem("access");
    if (!token) return showMessage("Chưa đăng nhập", "error");

    setSavingInfo(true);
    setMessage({ text: "", type: "" });

    fetch(`${API_BASE}/api/auth/update/`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(infoForm),
    })
      .then((res) => res.json())
      .then((data) => {
        showMessage(data.detail || "Cập nhật thông tin thành công!", "success");
        fetchUser();
      })
      .catch((err) => {
        console.error("❌ Lỗi update info:", err);
        showMessage("Cập nhật thất bại, vui lòng thử lại.", "error");
      })
      .finally(() => setSavingInfo(false));
  };

  // 🔹 Submit password change
  const handlePassSubmit = (e) => {
    e.preventDefault();
    const token = localStorage.getItem("access");
    if (!token) return showMessage("Chưa đăng nhập", "error");

    setChangingPass(true);
    setMessage({ text: "", type: "" });

    fetch(`${API_BASE}/api/auth/change-password/`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(passForm),
    })
      .then((res) => res.json())
      .then((data) => {
        showMessage(data.detail || "Đổi mật khẩu thành công!", "success");
        setPassForm({ old_password: "", new_password: "" });
      })
      .catch((err) => {
        console.error("❌ Lỗi đổi mật khẩu:", err);
        showMessage("Đổi mật khẩu thất bại.", "error");
      })
      .finally(() => setChangingPass(false));
  };

  if (loading)
    return (
      <div style={styles.loadingContainer}>
        <div className="spinner"></div>
        <p style={{ marginTop: "10px", color: "#0056b3" }}>
          Đang tải dữ liệu...
        </p>
        {/* CSS Spinner inline */}
        <style>{`.spinner { border: 4px solid #f3f3f3; border-top: 4px solid #3498db; border-radius: 50%; width: 30px; height: 30px; animation: spin 1s linear infinite; } @keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }`}</style>
      </div>
    );

  if (!user)
    return (
      <div style={styles.errorContainer}>
        Vui lòng đăng nhập để xem trang này.
      </div>
    );

  return (
    <div style={styles.pageBackground}>
      {/* Inject CSS for hover effects */}
      <style>
        {`
          .input-field:focus { border-color: #4facfe !important; box-shadow: 0 0 5px rgba(79, 172, 254, 0.5); outline: none; }
          .btn-primary:hover { background: linear-gradient(to right, #0056b3, #004494) !important; transform: translateY(-1px); }
          .btn-primary:active { transform: translateY(0); }
        `}
      </style>

      <div style={styles.container}>
        <div style={styles.header}>
          <h2 style={styles.title}>Account settings</h2>
          <p style={styles.subtitle}>Personal information management and security</p>
        </div>

        {/* --- Thông báo --- */}
        {message.text && (
          <div
            style={{
              ...styles.messageBox,
              backgroundColor: message.type === "error" ? "#ffe6e6" : "#e6fffa",
              color: message.type === "error" ? "#cc0000" : "#008060",
              border:
                message.type === "error"
                  ? "1px solid #ffcccc"
                  : "1px solid #b3ffec",
            }}
          >
            {message.type === "success" ? "✅ " : "⚠️ "} {message.text}
          </div>
        )}

        <div style={styles.grid}>
          {/* ===== Form update info ===== */}
          <div style={styles.card}>
            <h3 style={styles.cardTitle}>Personal information</h3>
            <form onSubmit={handleInfoSubmit} style={styles.form}>
              <div style={styles.formGroup}>
                <label style={styles.label}>Username</label>
                <input
                  className="input-field"
                  type="text"
                  name="username"
                  value={infoForm.username}
                  onChange={handleInfoChange}
                  required
                  style={styles.input}
                  placeholder="username input..."
                />
              </div>

              <div style={styles.formGroup}>
                <label style={styles.label}>Email</label>
                <input
                  className="input-field"
                  type="email"
                  name="email"
                  value={infoForm.email}
                  onChange={handleInfoChange}
                  required
                  style={styles.input}
                  placeholder="email input..."
                />
              </div>

              <button
                type="submit"
                disabled={savingInfo}
                className="btn-primary"
                style={{ ...styles.button, opacity: savingInfo ? 0.7 : 1 }}
              >
                {savingInfo ? "Saving..." : "Update Information"}
              </button>
            </form>
          </div>

          {/* ===== Form change password ===== */}
          <div style={styles.card}>
            <h3 style={styles.cardTitle}>Security</h3>
            <form onSubmit={handlePassSubmit} style={styles.form}>
              <div style={styles.formGroup}>
                <label style={styles.label}>Current Password</label>
                <input
                  className="input-field"
                  type="password"
                  name="old_password"
                  value={passForm.old_password}
                  onChange={handlePassChange}
                  required
                  style={styles.input}
                  placeholder="••••••"
                />
              </div>

              <div style={styles.formGroup}>
                <label style={styles.label}>New Password</label>
                <input
                  className="input-field"
                  type="password"
                  name="new_password"
                  value={passForm.new_password}
                  onChange={handlePassChange}
                  required
                  style={styles.input}
                  placeholder="••••••"
                />
              </div>

              <button
                type="submit"
                disabled={changingPass}
                className="btn-primary"
                style={{ ...styles.button, opacity: changingPass ? 0.7 : 1 }}
              >
                {changingPass ? "Processing..." : "Change Password"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

// 🔹 Styles Object (CSS-in-JS lite)
const styles = {
  pageBackground: {
    backgroundColor: "#f0f4f8", // Màu nền xám xanh nhạt dịu mắt
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "flex-start",
    padding: "40px 20px",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  },
  container: {
    width: "100%",
    maxWidth: "900px",
  },
  loadingContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    backgroundColor: "#f0f4f8",
  },
  errorContainer: {
    textAlign: "center",
    marginTop: "50px",
    fontSize: "18px",
    color: "#555",
  },
  header: {
    marginBottom: "30px",
    textAlign: "center",
  },
  title: {
    color: "#003366", // Xanh dương đậm
    margin: "0 0 10px 0",
    fontSize: "28px",
    fontWeight: "700",
  },
  subtitle: {
    color: "#667",
    margin: 0,
    fontSize: "15px",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))", // Responsive grid
    gap: "25px",
  },
  card: {
    backgroundColor: "#ffffff",
    borderRadius: "12px",
    padding: "30px",
    boxShadow: "0 4px 20px rgba(0, 0, 0, 0.05)", // Đổ bóng mềm mại
    display: "flex",
    flexDirection: "column",
  },
  cardTitle: {
    fontSize: "18px",
    color: "#0056b3",
    borderBottom: "2px solid #eef2f6",
    paddingBottom: "15px",
    marginTop: 0,
    marginBottom: "20px",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    flex: 1,
  },
  formGroup: {
    marginBottom: "20px",
  },
  label: {
    display: "block",
    marginBottom: "8px",
    color: "#334155",
    fontWeight: "600",
    fontSize: "14px",
  },
  input: {
    width: "100%",
    padding: "12px 15px",
    borderRadius: "8px",
    border: "1px solid #dbeafe", // Viền xanh nhạt
    backgroundColor: "#f8fafc",
    fontSize: "14px",
    color: "#333",
    transition: "all 0.3s ease",
    boxSizing: "border-box", // Quan trọng để padding không làm vỡ layout
  },
  button: {
    marginTop: "auto", // Đẩy nút xuống dưới cùng
    width: "100%",
    padding: "12px",
    borderRadius: "8px",
    border: "none",
    background: "linear-gradient(to right, #007bff, #0056b3)", // Gradient xanh
    color: "#fff",
    fontSize: "15px",
    fontWeight: "600",
    cursor: "pointer",
    transition: "all 0.2s ease",
    boxShadow: "0 4px 6px rgba(0, 123, 255, 0.2)",
  },
  messageBox: {
    padding: "12px",
    borderRadius: "8px",
    marginBottom: "25px",
    textAlign: "center",
    fontSize: "14px",
    fontWeight: "500",
    animation: "fadeIn 0.5s",
  },
};
