import React, { Component } from "react";
import "./header.css";

const Header = () => {
  return (
    <header className="header">
      <div className="presentation">
        <button className="presentation-button">
          <span className="material-symbols-outlined">format_align_justify</span>
        </button>
      </div>

      <div className="logo">
        <a href="" className="logo-name">
          <img
            src={require("../../../assets/img/logo.png")}
            alt="Logo"
            className="img-logo"
          />
        </a>
      </div>

      <div className="select">
        <button className="select-button">
          <span className="select-text">Workspaces </span>
          <div className="select-icon">
            <span className="material-symbols-outlined select-icon-item">
              expand_more
            </span>
          </div>
        </button>

        <button className="select-button">
          <span className="select-text">Recent</span>
          <div className="select-icon">
            <span className="material-symbols-outlined select-icon-item">
              expand_more
            </span>
          </div>
        </button>

        <button className="select-button">
          <span className="select-text">Started</span>
          <div className="select-icon">
            <span className="material-symbols-outlined select-icon-item">
              expand_more
            </span>
          </div>
        </button>

        <button className="select-button">
          <span className="select-text">Templates</span>
          <div className="select-icon">
            <span className="material-symbols-outlined select-icon-item">
              expand_more
            </span>
          </div>
        </button>
      </div>

      <div className="search-info">
        <div className="header-info">
          <button className="btn-header_info">
            <div className="info-item">
              <span className="material-symbols-outlined icon-info-item">
                circle_notifications
              </span>
            </div>
          </button>

          <button className="btn-header_info">
            <div className="info-item">
              <span className="material-symbols-outlined icon-info-item">
                help
              </span>
            </div>
          </button>

          <button className="btn-header_info">
            <div className="info-item">
              <span className="material-symbols-outlined icon-info-item">
                dark_mode
              </span>
            </div>
          </button>

          <button className="btn-header_info">
            <div className="info-item">
              <img src="" alt="avatar" />
            </div>
          </button>
        </div>

        <label className="header-search">
          <div className="icon-with-search">
            <span className="material-symbols-outlined icon-search">
              search
            </span>
          </div>
          <input type="text" placeholder="Search" className="input-search" />
        </label>
      </div>
    </header>
  );
};

export default Header;
