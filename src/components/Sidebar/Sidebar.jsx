import React from "react";
import { NavLink } from "react-router-dom";
import {
  FaSearch,
  FaBook,
  FaClipboardList,
  FaBookReader,
  FaEdit,
  FaComments,
  FaInfoCircle,
  FaCog,
  FaUser,
} from "react-icons/fa";
import "./Sidebar.css";

function Sidebar() {
  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <div className="logo">
          <div className="logo-icon">こ</div>
          <span className="logo-text">koihi</span>
        </div>
      </div>

      <nav className="sidebar-nav">
        <ul className="menu">
          <li>
            <NavLink
              to="/search"
              className={({ isActive }) =>
                `menu-item ${isActive ? "active" : ""}`
              }
            >
              <div className="icon-wrapper">
                <FaSearch />
              </div>
              <span>Search</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/translate"
              className={({ isActive }) =>
                `menu-item ${isActive ? "active" : ""}`
              }
            >
              <div className="icon-wrapper">
                <FaBook />
              </div>
              <span>Translate</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/jlpt"
              className={({ isActive }) =>
                `menu-item ${isActive ? "active" : ""}`
              }
            >
              <div className="icon-wrapper">
                <FaClipboardList />
              </div>
              <span>JLPT</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/mywords"
              className={({ isActive }) =>
                `menu-item ${isActive ? "active" : ""}`
              }
            >
              <div className="icon-wrapper">
                <FaBookReader />
              </div>
              <span>My Words</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/introduce"
              className={({ isActive }) =>
                `menu-item ${isActive ? "active" : ""}`
              }
            >
              <div className="icon-wrapper">
                <FaInfoCircle />
              </div>
              <span>About</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/setting"
              className={({ isActive }) =>
                `menu-item ${isActive ? "active" : ""}`
              }
            >
              <div className="icon-wrapper">
                <FaCog />
              </div>
              <span>Setting</span>
            </NavLink>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default Sidebar;
