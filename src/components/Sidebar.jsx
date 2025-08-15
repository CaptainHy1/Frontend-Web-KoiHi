import React from "react";
import "../assets/css/Sidebar.css";
import {
  FaSearch,
  FaUsers,
  FaBook,
  FaClipboardList,
  FaBookReader,
  FaEdit,
  FaLayerGroup,
  FaComments,
  FaBriefcase,
  FaInfoCircle,
  FaArrowUp,
  FaCog,
  FaBlog,
} from "react-icons/fa";

function Sidebar() {
  return (
    <div className="sidebar">
      <div className="logo">
        <span className="logo-icon">あ</span>
        <span className="logo-text">mozii</span>
      </div>

      <ul className="menu">
        <li>
          <FaSearch /> Tra cứu
        </li>
        <li>
          <FaBook /> Dịch
        </li>
        <li>
          <FaUsers /> Cộng đồng
        </li>
        <li>
          <FaClipboardList /> JLPT
        </li>
        <hr />
        <li>
          <FaBookReader /> Từ của tôi
        </li>
        <li>
          <FaEdit /> Luyện đọc
        </li>
        <li>
          <FaClipboardList /> Thi thử
        </li>
        <li>
          <FaLayerGroup /> Chuyên ngành
        </li>
        <li>
          <FaComments /> Dịch hội thoại
        </li>
        <li>
          <FaComments /> Hội thoại
        </li>
        <li>
          <FaClipboardList /> Tên tiếng Nhật
        </li>
        <hr />
        <li>
          <FaBriefcase /> Việc làm
        </li>
        <li>
          <FaInfoCircle /> Giới thiệu
        </li>
        <li>
          <FaArrowUp /> Nâng cấp
        </li>
        <li>
          <FaCog /> Cài đặt
        </li>
        <li>
          <FaBlog /> Blog
        </li>
        <li>
          <FaLayerGroup /> Tiếp thị liên kết
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;
