import React from "react";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import SearchBox from "../../components/SearchBox/SearchBox";
import Sidebar from "../../components/Sidebar/Sidebar";
import History from "../../components/History/History";
import DictionaryEntryCard from "../../components/DictionaryEntryCard/DictionaryEntryCard";
import Setting from "../../components/Setting/Setting";
import { useState } from "react";

function SettingPage() {
  return (
    <div className="homepage">
      <div className="sidebar">
        <Sidebar />
      </div>

      <div className="main-content">
        <Header />

        <div className="content-wrapper">
          <div className="content-left">
            <Setting />
          </div>
        </div>

        <Footer />
      </div>
    </div>
  );
}

export default SettingPage;
