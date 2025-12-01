import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage/HomePage";
import LoginPage from "./pages/LoginPage/LoginPage";
import RegisterPage from "./pages/RegisterPage/RegisterPage";
import ForgotPasswordPage from "./pages/ForgotPasswordPage/ForgotPasswordPage";
import ResetPasswordPage from "./pages/ResetPasswordPage/ResetPasswordPage";
import TranslatePage from "./pages/TranslatePage/TranslatePage";
import IntroducePage from "./pages/IntroducePage/Introducepage";
import JLPTPage from "./pages/JLPTPage/JLPTPage";
import FlashcardsPage from "./pages/FlashcardPage/FlashcardPage";
import MyWords from "./pages/MyWords.page/MyWords";
import QuizPage from "./pages/QuizPage/QuizPage";
import WordDetailPage from "./pages/WordDetailPage/WordDetailPage";
import SettingPage from "./pages/SettingPage/SettingPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/reset-password" element={<ResetPasswordPage />} />
        <Route path="/translate" element={<TranslatePage />} />
        <Route path="/introduce" element={<IntroducePage />} />
        <Route path="/jlpt" element={<JLPTPage />} />
        <Route path="/word/:id" element={<WordDetailPage />} />
        <Route path="*" element={<HomePage />} />
        <Route path="/flashcards" element={<FlashcardsPage />} />
        <Route path="/mywords" element={<MyWords />} />
        <Route path="/quiz" element={<QuizPage />} />
        <Route path="/search" element={<HomePage />} />
        <Route path="/setting" element={<SettingPage />} />
      </Routes>
    </Router>
  );
}

export default App;
