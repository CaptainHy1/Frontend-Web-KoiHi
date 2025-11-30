import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Sidebar from "../../components/Sidebar/Sidebar";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import "./WordDetailPage.css";

const API_BASE = import.meta?.env?.VITE_API_BASE || "http://127.0.0.1:8888";

export default function WordDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [word, setWord] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isFavorited, setIsFavorited] = useState(false);
  const [addingToFlashcard, setAddingToFlashcard] = useState(false);
  const [inFlashcard, setInFlashcard] = useState(false);

  const isLoggedIn = Boolean(localStorage.getItem("access"));

  useEffect(() => {
    const fetchWordDetail = async () => {
      setLoading(true);
      setError("");

      try {
        const token = localStorage.getItem("access");
        const res = await fetch(`${API_BASE}/api/word/${id}/`, {
          headers: {
            Accept: "application/json",
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
          },
        });

        if (!res.ok) {
          throw new Error(`Word not found (${res.status})`);
        }

        const data = await res.json();
        setWord(data);
        setIsFavorited(data.is_favorited || false);
      } catch (err) {
        setError(err.message || "Error loading word details");
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchWordDetail();
    }
  }, [id]);

  const toggleFavorite = async () => {
    if (!isLoggedIn) return;

    try {
      const token = localStorage.getItem("access");
      const res = await fetch(`${API_BASE}/api/favorites/toggle/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ word_id: word.id }),
      });

      const json = await res.json();
      if (!res.ok) throw new Error(json?.detail || "API Error");

      setIsFavorited(json.favorited);
    } catch (err) {
      alert(`Error: ${err.message}`);
    }
  };

  const addToFlashcard = async () => {
    if (!isLoggedIn || addingToFlashcard || inFlashcard) return;

    setAddingToFlashcard(true);

    try {
      const token = localStorage.getItem("access");

      // Get or create flashcard deck
      const createRes = await fetch(`${API_BASE}/api/flashcards/create/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ name: "My deck" }),
      });

      if (!createRes.ok) throw new Error("Could not create flashcard");
      const flashcardData = await createRes.json();

      // Add word to flashcard
      const addRes = await fetch(
        `${API_BASE}/api/flashcards/${flashcardData.id}/add/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ word_id: word.id }),
        }
      );

      if (!addRes.ok) {
        const json = await addRes.json().catch(() => null);
        throw new Error(json?.detail || "Error adding to flashcard");
      }

      setInFlashcard(true);
    } catch (err) {
      alert(err.message);
    } finally {
      setAddingToFlashcard(false);
    }
  };

  if (loading) {
    return (
      <div className="word-detail-page">
        <div className="sidebar">
          <Sidebar />
        </div>
        <div className="main-content">
          <Header />
          <div className="content">
            <div className="loading-container">
              <div className="loading-spinner">⏳</div>
              <p>Loading word details...</p>
            </div>
          </div>
          <Footer />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="word-detail-page">
        <div className="sidebar">
          <Sidebar />
        </div>
        <div className="main-content">
          <Header />
          <div className="content">
            <div className="error-container">
              <div className="error-icon">⚠️</div>
              <h2>Error</h2>
              <p>{error}</p>
              <button className="back-btn" onClick={() => navigate(-1)}>
                ← Go Back
              </button>
            </div>
          </div>
          <Footer />
        </div>
      </div>
    );
  }

  const title = word?.kanji || word?.kana || "—";
  const kana = word?.kana || "";
  const jlpt = word?.jlpt_level || "";
  const partsOfSpeech = word?.parts_of_speech || "";

  return (
    <div className="word-detail-page">
      <div className="sidebar">
        <Sidebar />
      </div>

      <div className="main-content">
        <Header />

        <div className="content">
          <div className="word-detail-container">
            {/* Back Button */}
            <button className="back-btn" onClick={() => navigate(-1)}>
              ← Back to Search
            </button>

            {/* Word Card */}
            <div className="word-card-detail">
              {/* Header */}
              <div className="word-header-detail">
                <div className="word-main-info">
                  <h1 className="word-title">{title}</h1>
                  {kana && word?.kanji && (
                    <div className="word-reading">{kana}</div>
                  )}
                  <div className="word-meta">
                    {jlpt && <span className="jlpt-badge">JLPT {jlpt}</span>}
                    {partsOfSpeech && (
                      <span className="pos-badge">{partsOfSpeech}</span>
                    )}
                  </div>
                </div>

                {/* Action Buttons */}
                {isLoggedIn && (
                  <div className="action-buttons">
                    <button
                      className={`flashcard-btn ${
                        addingToFlashcard || inFlashcard ? "success" : ""
                      }`}
                      onClick={addToFlashcard}
                      disabled={addingToFlashcard || inFlashcard}
                    >
                      {addingToFlashcard ? (
                        <>⏳ Adding...</>
                      ) : inFlashcard ? (
                        <>✓ Added</>
                      ) : (
                        <>+ Flashcard</>
                      )}
                    </button>
                    <button
                      className={`favorite-btn ${isFavorited ? "active" : ""}`}
                      onClick={toggleFavorite}
                    >
                      {isFavorited ? "❤️ Favorite" : "🤍 Favorite"}
                    </button>
                  </div>
                )}
              </div>

              {/* Meanings Section */}
              <div className="meanings-section">
                <h2 className="section-title">📖 Meanings</h2>
                <div className="meanings-list">
                  {(word?.meanings || []).map((m, idx) => (
                    <div key={m.id ?? idx} className="meaning-item-detail">
                      <div className="meaning-header">
                        <span className="meaning-number">{idx + 1}</span>
                        <span className="meaning-text">{m.meaning || "—"}</span>
                      </div>

                      {/* Examples */}
                      {Array.isArray(m.examples) && m.examples.length > 0 && (
                        <div className="examples-section">
                          <h3 className="examples-title">💬 Examples</h3>
                          <ul className="examples-list">
                            {m.examples.map((ex) => (
                              <li key={ex.id} className="example-item">
                                <div className="example-jp">{ex.jp}</div>
                                <div className="example-en">{ex.en}</div>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Additional Info */}
              {word?.is_cached && (
                <div className="additional-info">
                  <span className="cached-badge">📦 Cached</span>
                </div>
              )}
            </div>
          </div>
        </div>

        <Footer />
      </div>
    </div>
  );
}
