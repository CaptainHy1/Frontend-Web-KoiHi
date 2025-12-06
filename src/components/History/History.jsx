// src/components/History/History.jsx
import React, { useEffect, useState } from "react";
import { API_BASE } from "../../config";

export default function History({ reloadSignal }) {
  const [history, setHistory] = useState([]);

  const fetchHistory = () => {
    const token = localStorage.getItem("access");

    if (!token) {
      console.log("⚠ Không có token → user chưa đăng nhập.");
      setHistory([]);
      return;
    }

    fetch(`${API_BASE}/api/history/`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("🔥 RAW HISTORY DATA:", data);

        // ⭐ FIX QUAN TRỌNG — đảm bảo history luôn là mảng
        if (Array.isArray(data)) {
          setHistory(data);
        } else {
          setHistory([]); // tránh crash UI
        }
      })
      .catch((err) => {
        console.error("❌ Lỗi fetch history:", err);
        setHistory([]);
      });
  };

  useEffect(() => {
    fetchHistory();
  }, [reloadSignal]);

  return (
    <div>
      <h3>Search history</h3>

      {history.length === 0 ? (
        <p>No data available</p>
      ) : (
        history.map((item) => (
          <div key={item.id} style={{ marginBottom: "8px" }}>
            <strong>{item.kanji || item.kana}</strong>
            <div style={{ fontSize: "12px", color: "#555" }}>
              {new Date(item.searched_at).toLocaleString()}
            </div>
          </div>
        ))
      )}
    </div>
  );
}
