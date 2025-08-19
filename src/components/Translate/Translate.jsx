import React, { useState } from "react";
import "./Translate.css";

function TranslatePage() {
  const [sourceLang, setSourceLang] = useState("Japanese");
  const [targetLang, setTargetLang] = useState("Vietnamese");
  const [inputText, setInputText] = useState("");
  const [translatedText, setTranslatedText] = useState("");
  const [history, setHistory] = useState([]);

  const handleTranslate = () => {
    if (!inputText) return;
    const result = `Fake translation of "${inputText}"`; // mock
    setTranslatedText(result);
    setHistory([
      { text: inputText, date: new Date().toISOString().split("T")[0] },
      ...history,
    ]);
  };

  return (
    <div className="translate-container">
      {/* Thanh chọn ngôn ngữ */}
      <div className="lang-select">
        <select
          value={sourceLang}
          onChange={(e) => setSourceLang(e.target.value)}
        >
          <option>Japanese</option>
          <option>English</option>
          <option>Vietnamese</option>
        </select>

        <button className="swap-btn">⇆</button>

        <select
          value={targetLang}
          onChange={(e) => setTargetLang(e.target.value)}
        >
          <option>Vietnamese</option>
          <option>English</option>
          <option>Japanese</option>
        </select>
      </div>

      {/* Khu nhập & dịch */}
      <div className="translate-box">
        <textarea
          placeholder="Nhập văn bản..."
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
        ></textarea>

        <button className="translate-btn" onClick={handleTranslate}>
          Dịch
        </button>

        <div className="output">
          <p>{translatedText}</p>
        </div>
      </div>

      {/* Lịch sử */}
      <div className="history">
        <h3>Lịch sử</h3>
        <ul>
          {history.map((item, idx) => (
            <li key={idx}>
              <span>{item.text}</span>
              <span className="date">{item.date}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default TranslatePage;
