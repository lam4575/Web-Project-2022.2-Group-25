import React, { Component } from "react";
import "./header.css";
import { FaBeer } from "react-icons/fa";

const Header = () => {
  return (
    <header className="header">
      <div className="logo-img">
        <img src="" alt="" />
        Scount
      </div>
      <div className="seach-input">
        <button className="icon-seach"></button>
        <input type="text" className="input-text" placeholder="Tìm kiếm" />
      </div>
      <div className="navbar">
        <div className="navbar-item">
          <button className="navbar-item-button">tb</button>
        </div>
        <div className="navbar-item">
          <button className="navbar-item-button">mn</button>
        </div>
        <div className="navbar-item avatar">
          <button className="navbar-item-button">a</button>
        </div>
      </div>
    </header>
  );
};

export default Header;
