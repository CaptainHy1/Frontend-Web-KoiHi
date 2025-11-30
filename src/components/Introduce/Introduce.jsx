import React from "react";
import "./Introduce.css";
function Introduce() {
  return (
    <div>
      {/* Hero Section */}
      <section className="hero" id="home">
        <div className="hero-content">
          <h1>Smart Translation</h1>
          <p>
            Powerful AI translation tool, supporting over 100 languages with
            high accuracy. Fast, accurate, native-like translations.
          </p>
          <a href="#features" className="cta-button">
            Explore Now
          </a>
        </div>
      </section>

      {/* Features Section */}
      <section className="features" id="features">
        <div className="container">
          <h2 className="section-title">Why Choose TranslateHub?</h2>
          <div className="features-grid">
            <div className="feature-card floating">
              <div className="feature-icon">🚀</div>
              <h3>Super Fast Translation</h3>
              <p>
                Advanced AI technology translates text instantly, processing
                thousands of words in seconds.
              </p>
            </div>
            <div
              className="feature-card floating"
              style={{ animationDelay: "0.5s" }}
            >
              <div className="feature-icon">🎯</div>
              <h3>High Accuracy</h3>
              <p>
                Uses machine learning models trained on billions of sentences,
                ensuring accurate and natural translations.
              </p>
            </div>
            <div
              className="feature-card floating"
              style={{ animationDelay: "1s" }}
            >
              <div className="feature-icon">🌍</div>
              <h3>Over 100 Languages</h3>
              <p>
                Supports translation between over 100 different languages, from
                common to rare worldwide.
              </p>
            </div>
            <div
              className="feature-card floating"
              style={{ animationDelay: "0.3s" }}
            >
              <div className="feature-icon">💾</div>
              <h3>Save History</h3>
              <p>
                Automatically saves translations so you can review and manage
                easily anytime, anywhere.
              </p>
            </div>
            <div
              className="feature-card floating"
              style={{ animationDelay: "0.8s" }}
            >
              <div className="feature-icon">📱</div>
              <h3>Responsive Design</h3>
              <p>
                User-friendly interface, optimized for all devices from
                computers to mobile phones.
              </p>
            </div>
            <div
              className="feature-card floating"
              style={{ animationDelay: "1.2s" }}
            >
              <div className="feature-icon">🔒</div>
              <h3>Absolute Security</h3>
              <p>
                End-to-end encryption ensures your information is completely
                protected.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats">
        <div className="container">
          <h2
            className="section-title"
            style={{ color: "white", marginBottom: "3rem" }}
          >
            Impressive Numbers
          </h2>
          <div className="stats-grid">
            <div className="stat-item">
              <span className="stat-number">1M+</span>
              <span className="stat-label">Users</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">100+</span>
              <span className="stat-label">Languages</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">50M+</span>
              <span className="stat-label">Translations</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">99.9%</span>
              <span className="stat-label">Accuracy</span>
            </div>
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section className="how-it-works" id="how">
        <div className="container">
          <h2 className="section-title">How to Use</h2>
          <div className="steps">
            <div className="step">
              <div className="step-number">1</div>
              <h3>Enter Text</h3>
              <p>
                Type or paste the text you want to translate in the left box.
                Supports up to 5000 characters.
              </p>
            </div>
            <div className="step">
              <div className="step-number">2</div>
              <h3>Choose Language</h3>
              <p>
                Select source and target languages from the list of over 100
                available languages.
              </p>
            </div>
            <div className="step">
              <div className="step-number">3</div>
              <h3>Get Results</h3>
              <p>
                Click "Translate" and receive accurate, natural translations
                instantly.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <p>
            &copy; 2024 TranslateHub. All rights reserved. Developed by
            AI Technology.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default Introduce;
