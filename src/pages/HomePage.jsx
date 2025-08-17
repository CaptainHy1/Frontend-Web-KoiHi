import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import SearchBox from "../components/SearchBox";
import Sidebar from "../components/Sidebar";
import "../assets/css/HomePage.css";

function HomePage() {
  return (
    <div className="homepage">
      <div className="sidebar">
        <Sidebar />
      </div>

      {/* Nội dung chính */}
      <div className="main-content">
        <Header />
        <div className="content">
          <SearchBox />
        </div>
        <Footer />
      </div>
    </div>
  );
}

export default HomePage;
