import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import SearchBox from "../components/SearchBox";

function HomePage() {
  return (
    <>
      <SearchBox />
      <main style={{ padding: "20px", textAlign: "center" }}></main>
      <Footer />
    </>
  );
}

export default HomePage;
