import React, { useState } from "react";
import { API_BASE } from "../../config";
import "./Translate.css";

export default function TextTranslator() {
  const [text, setText] = useState("");
  const [translated, setTranslated] = useState("");
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState("");

  const translate = async () => {
    if (!text.trim()) {
      setError("Please enter text");
      return;
    }

    setLoading(true);
    setTranslated("");
    setError("");

    try {
      const res = await fetch(`${API_BASE}/api/translate/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text }),
      });

      const data = await res.json();

      if (data.translated) {
        setTranslated(data.translated);
      } else if (data.error) {
        setError(data.error);
      } else {
        setError("Could not translate");
      }
    } catch {
      setError("Connection error to server");
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(translated);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleClear = () => {
    setText("");
    setTranslated("");
    setError("");
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && e.ctrlKey) {
      translate();
    }
  };

  return (
    <div className="translator-container">
      <div className="translator-wrapper">
        {/* Header */}
        <div className="translator-header">
          <div className="translator-icon">
            <span>🌐</span>
          </div>
          <h1 className="translator-title">
            Text Translation
            <span className="sparkle">✨</span>
          </h1>
          <p className="translator-subtitle">
            Japanese → English | Fast & Accurate
          </p>
        </div>

        {/* Main Card */}
        <div className="translator-card">
          {/* Language Indicator */}
          <div className="language-header">
            <div className="language-item">
              <span className="flag">🇯🇵</span>
              <span className="language-name">Japanese</span>
            </div>
            <span className="arrow">→</span>
            <div className="language-item">
              <span className="language-name">English</span>
              <span className="flag">en</span>
            </div>
          </div>

          {/* Input Section */}
          <div className="input-section">
            <div className="input-header">
              <label className="input-label">
                <span className="dot"></span>
                Text to translate
              </label>
              <div className="input-actions">
                <span className="char-count">{text.length} characters</span>
                {text && (
                  <button onClick={handleClear} className="clear-btn">
                    🔄 Clear
                  </button>
                )}
              </div>
            </div>

            <textarea
              rows={6}
              className="text-input"
              value={text}
              onChange={(e) => setText(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="こんにちは、元気ですか？&#10;&#10;Enter or paste Japanese text here..."
            />

            <div className="input-footer">
              <p className="tip-text">
                💡 Tip: Press <kbd>Ctrl</kbd> + <kbd>Enter</kbd> for quick
                translation
              </p>
              <button
                onClick={translate}
                disabled={loading || !text.trim()}
                className="translate-btn"
              >
                {loading ? (
                  <>
                    <span className="spinner">⏳</span>
                    Translating...
                  </>
                ) : (
                  <>
                    Translate
                    <span>→</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <div className="error-message">
              <div className="error-icon">!</div>
              <div>
                <p className="error-title">An error occurred</p>
                <p className="error-text">{error}</p>
              </div>
            </div>
          )}

          {/* Result Section */}
          {translated && (
            <div className="result-section">
              <div className="result-container">
                <div className="result-header">
                  <label className="result-label">
                    <span className="check-icon">✓</span>
                    Translation Result
                  </label>
                  <button onClick={handleCopy} className="copy-btn">
                    {copied ? (
                      <>
                        <span>✓</span>
                        Copied!
                      </>
                    ) : (
                      <>
                        <span>📋</span>
                        Copy
                      </>
                    )}
                  </button>
                </div>
                <div className="result-box">
                  <p className="result-text">{translated}</p>
                </div>
              </div>
            </div>
          )}

          {/* Loading State */}
          {loading && !translated && (
            <div className="loading-section">
              <div className="loading-container">
                <div className="loading-spinner">⏳</div>
                <p className="loading-title">Processing translation...</p>
                <p className="loading-text">Please wait a moment</p>
              </div>
            </div>
          )}
        </div>

        {/* Info Cards */}
        <div className="info-cards">
          <div className="info-card">
            <div className="info-icon">⚡</div>
            <h3 className="info-title">Fast Translation</h3>
            <p className="info-text">Results in seconds</p>
          </div>

          <div className="info-card">
            <div className="info-icon">🎯</div>
            <h3 className="info-title">Accurate</h3>
            <p className="info-text">Modern translation technology</p>
          </div>

          <div className="info-card">
            <div className="info-icon">🔒</div>
            <h3 className="info-title">Secure</h3>
            <p className="info-text">Information protection</p>
          </div>
        </div>
      </div>
    </div>
  );
}
