import React, { useEffect, useMemo, useState } from "react";
import "./Quiz.css";

const API_BASE = import.meta?.env?.VITE_API_BASE || "http://127.0.0.1:8888";

export default function Quiz() {
  const [level, setLevel] = useState("N5");
  const [count, setCount] = useState(10);
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    setQuestions([]);
    setAnswers({});
    setSubmitted(false);
    setScore(null);
    setCurrentIndex(0);
    setError("");
  }, [level, count]);

  const fetchQuiz = async () => {
    setLoading(true);
    setError("");
    setQuestions([]);
    setAnswers({});
    setSubmitted(false);
    setScore(null);
    setCurrentIndex(0);

    try {
      const token = localStorage.getItem("access");
      const res = await fetch(`${API_BASE}/api/quiz/jlpt/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify({ level, count }),
      });

      const json = await res.json().catch(() => null);
      if (!res.ok) {
        const msg = json?.detail || json?.message || `HTTP ${res.status}`;
        throw new Error(msg);
      }

      if (!Array.isArray(json?.questions)) {
        throw new Error("Server did not return questions array");
      }

      const normalized = json.questions.map((q, idx) => ({
        id: q.id ?? idx,
        sentence: q.sentence ?? "",
        choices: Array.isArray(q.choices) ? q.choices : [],
        correct_index:
          typeof q.correct_index === "number"
            ? q.correct_index
            : typeof q.correct === "number"
            ? q.correct
            : null,
      }));

      setQuestions(normalized);
    } catch (err) {
      setError(err.message || "Error loading questions");
    } finally {
      setLoading(false);
    }
  };

  const selectChoice = (qIndex, choiceIndex) => {
    if (submitted) return;
    setAnswers((prev) => ({ ...prev, [qIndex]: choiceIndex }));
  };

  const submit = () => {
    if (questions.length === 0) return;
    let correct = 0;
    questions.forEach((q, i) => {
      const a = answers[i];
      if (typeof a === "number" && a === q.correct_index) correct += 1;
    });
    setScore(correct);
    setSubmitted(true);
  };

  const restart = () => {
    setAnswers({});
    setSubmitted(false);
    setScore(null);
    setCurrentIndex(0);
  };

  const currentQuestion = questions[currentIndex];

  const progressLabel = useMemo(() => {
    if (!questions.length) return "0/0";
    return `${Object.keys(answers).length}/${questions.length}`;
  }, [answers, questions]);

  return (
    <div className="quiz-container">
      <div className="quiz-header">
        <h1 className="quiz-title">JLPT Quiz</h1>
        <p className="quiz-subtitle">Practice Japanese Language Proficiency</p>
      </div>

      <div className="quiz-settings">
        <div className="setting-group">
          <label className="setting-label">Level</label>
          <select
            className="setting-select"
            value={level}
            onChange={(e) => setLevel(e.target.value)}
          >
            <option value="N5">N5 - Beginner</option>
            <option value="N4">N4 - Elementary</option>
            <option value="N3">N3 - Intermediate</option>
            <option value="N2">N2 - Upper Intermediate</option>
            <option value="N1">N1 - Advanced</option>
          </select>
        </div>

        <div className="setting-group">
          <label className="setting-label">Number of Questions</label>
          <input
            type="number"
            min={1}
            max={50}
            value={count}
            onChange={(e) => setCount(Number(e.target.value))}
            className="setting-input"
          />
        </div>

        <button
          onClick={fetchQuiz}
          disabled={loading}
          className="btn btn-primary btn-generate"
        >
          {loading ? (
            <>
              <span className="spinner"></span>
              Loading...
            </>
          ) : (
            "Generate Quiz"
          )}
        </button>
      </div>

      {error && (
        <div className="alert alert-error">
          <span className="alert-icon">⚠️</span>
          {error}
        </div>
      )}

      {!questions.length && !loading && (
        <div className="empty-state">
          <div className="empty-icon">📝</div>
          <p>Select level and number of questions, then click "Generate Quiz" to start</p>
        </div>
      )}

      {questions.length > 0 && (
        <div className="quiz-content">
          <div className="quiz-info-bar">
            <div className="info-badge">
              <span className="info-label">Level:</span>
              <span className="info-value">{level}</span>
            </div>
            <div className="info-badge">
              <span className="info-label">Questions:</span>
              <span className="info-value">{questions.length}</span>
            </div>
            <div className="info-badge">
              <span className="info-label">Completed:</span>
              <span className="info-value">{progressLabel}</span>
            </div>
          </div>

          <div className="quiz-controls">
            <div className="view-mode-group">
              <button
                onClick={() => setShowAll(false)}
                className={`btn btn-view ${!showAll ? "active" : ""}`}
              >
                📄 One by One
              </button>
              <button
                onClick={() => setShowAll(true)}
                className={`btn btn-view ${showAll ? "active" : ""}`}
              >
                📋 All
              </button>
            </div>
            <div className="action-group">
              <button onClick={restart} className="btn btn-secondary">
                🔄 Restart
              </button>
              <button onClick={() => fetchQuiz()} className="btn btn-secondary">
                ✨ New Quiz
              </button>
            </div>
          </div>

          {showAll ? (
            <div className="questions-list">
              {questions.map((q, qi) => (
                <QuestionCard
                  key={q.id}
                  qIndex={qi}
                  question={q}
                  selected={answers[qi]}
                  onSelect={selectChoice}
                  submitted={submitted}
                />
              ))}

              {!submitted ? (
                <div className="submit-section">
                  <button onClick={submit} className="btn btn-submit">
                    ✓ Submit
                  </button>
                </div>
              ) : (
                <ResultPanel score={score} total={questions.length} />
              )}
            </div>
          ) : (
            <div className="single-question-view">
              <QuestionCard
                qIndex={currentIndex}
                question={currentQuestion}
                selected={answers[currentIndex]}
                onSelect={selectChoice}
                submitted={submitted}
              />

              <div className="navigation-bar">
                <button
                  onClick={() => setCurrentIndex((i) => Math.max(0, i - 1))}
                  disabled={currentIndex === 0}
                  className="btn btn-nav"
                >
                  ← Previous
                </button>

                <div className="question-indicator">
                  Question {currentIndex + 1} / {questions.length}
                </div>

                <button
                  onClick={() =>
                    setCurrentIndex((i) =>
                      Math.min(questions.length - 1, i + 1)
                    )
                  }
                  disabled={currentIndex === questions.length - 1}
                  className="btn btn-nav"
                >
                  Next →
                </button>

                {!submitted ? (
                  <button onClick={submit} className="btn btn-submit">
                    ✓ Submit
                  </button>
                ) : (
                  <ResultPanel score={score} total={questions.length} />
                )}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function QuestionCard({ qIndex, question, selected, onSelect, submitted }) {
  if (!question)
    return <div className="question-card">(Invalid question)</div>;

  return (
    <div className="question-card">
      <div className="question-number">Question {qIndex + 1}</div>
      <div
        className="question-text"
        dangerouslySetInnerHTML={{ __html: question.sentence }}
      />

      <div className="choices-grid">
        {question.choices.map((c, ci) => {
          const isSelected = selected === ci;
          const isCorrect = question.correct_index === ci;

          let className = "choice-card";
          if (submitted) {
            if (isCorrect) className += " choice-correct";
            else if (isSelected && !isCorrect) className += " choice-incorrect";
          } else if (isSelected) {
            className += " choice-selected";
          }

          return (
            <label key={ci} className={className}>
              <input
                type="radio"
                name={`q-${qIndex}`}
                className="choice-input"
                checked={isSelected}
                onChange={() => onSelect(qIndex, ci)}
              />
              <div className="choice-content">
                <div className="choice-letter">
                  {String.fromCharCode(65 + ci)}
                </div>
                <div
                  className="choice-text"
                  dangerouslySetInnerHTML={{ __html: c }}
                />
              </div>
            </label>
          );
        })}
      </div>

      {submitted && (
        <div className="answer-reveal">
          ✓ Correct answer:{" "}
          <strong>{String.fromCharCode(65 + question.correct_index)}</strong>
        </div>
      )}
    </div>
  );
}

function ResultPanel({ score, total }) {
  const percentage = ((score / total) * 100).toFixed(0);
  const isPassed = percentage >= 60;

  return (
    <div className={`result-panel ${isPassed ? "passed" : "failed"}`}>
      <div className="result-icon">{isPassed ? "🎉" : "💪"}</div>
      <div className="result-content">
        <div className="result-score">
          {score} / {total}
        </div>
        <div className="result-percentage">{percentage}%</div>
        <div className="result-message">
          {isPassed ? "Excellent!" : "Keep trying!"}
        </div>
      </div>
    </div>
  );
}
