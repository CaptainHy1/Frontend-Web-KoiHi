import React from "react";
import Sidebar from "./components/Sidebar";
import HomePage from "./pages/HomePage";
import "./App.css";
import Footer from "./components/Footer";

function App() {
  return (
    <div className="App">
      <Sidebar />
      <div style={{ marginLeft: "0px", padding: "20px" }}>
        <HomePage />
      </div>
    </div>
  );
}

export default App;
