import React, { Component, useState } from "react";
import "./header.css";

const Header = () => {
  const [onNav, setOnNav] = useState(false);
  const [onNavWorkspaces, setOnNavWorkspaces] = useState(false);

  const onOffNav = () => {
    setOnNav(!onNav);
  };

  return (
    <header className="header">
      <div className="presentation">
        <button className="presentation-button">
          <span className="material-symbols-outlined">
            format_align_justify
          </span>
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
        <button
          className="select-button"
          onClick={() => setOnNavWorkspaces(!onNavWorkspaces)}
          onBlur={() => setOnNavWorkspaces(false)}
        >
          <span className="select-text">Workspaces </span>
          <div className="select-icon">
            <span className="material-symbols-outlined select-icon-item">
              expand_more
            </span>
          </div>

          {/* Nav workspaces */}
          {onNavWorkspaces ? (
            <div className="nav-workspaces">
              <div className="nav-current">
                <div className="nav-current-header">
                  <p className="nav-current-header_text">Current Workspace</p>
                </div>

                <nav className="nav-current-user">
                  <img src="" alt="" />
                  <p className="nav-current-user name">Ngoc Linh</p>
                </nav>
              </div>
              {/* nav your workspace */}
              <div className="nav-yourworkspace">
                <div className="nav-current-header">
                  <p className="nav-current-header_text">Current Workspace</p>
                </div>

                <nav className="nav-current-user">
                  <img src="" alt="" />
                  <p className="nav-current-user name">Ngoc Linh</p>
                </nav>
              </div>
            </div>
          ) : (
            ""
          )}
        </button>

        <button className="select-button">
          <span className="select-text">Recent</span>
          <div className="select-icon">
            <span className="material-symbols-outlined select-icon-item">
              expand_more
            </span>
          </div>
        </button>

        <button
          className="select-button"
          onClick={() => onOffNav()}
          onBlur={() => setOnNav(false)}
        >
          <span className="select-text">Started</span>
          <div className="select-icon">
            <span className="material-symbols-outlined select-icon-item">
              expand_more
            </span>
          </div>

          {/* nav started */}
          {onNav ? (
            <div className="nav-starred">
              <div className="starred-img">
                <img
                  src={require("../../../assets/img/details.jpg")}
                  alt="Starred"
                  className="img-starred"
                />
              </div>

              <div className="starred-title">
                <p className="starred-text">
                  Star import boards to access them quickly<br></br> and easily.
                </p>
              </div>
            </div>
          ) : (
            ""
          )}
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

          {/* Avatar User */}
          <button className="btn-header_info">
            <div className="info-item">
              <img src="" alt="avatar" />
            </div>
          </button>
          <div className="account-menu">
            {/* menu section */}
            <div className="account-menu-section">
              <h2>ACCOUNT</h2>
              <div className="account-info">
                <div className="account-avatar">Linh</div>

                <div className="account-info-detail">
                  <div className="account-name">Linh Nguyen Ngoc</div>

                  <div className="account-email">ngoclinhtp2002@gmail.com</div>
                </div>
              </div>
              {/* account manager */}
              <ul className="account-manager">
                <li className="account-manager-item">
                  <a href="" className="account-manager-link">
                    <span className="account-manager-title">
                      Switch accounts
                    </span>
                  </a>
                </li>
                <li className="account-manager-item">
                  <a href="" className="account-manager-link">
                    <span className="account-manager-title">
                      Manage account
                    </span>
                  </a>
                </li>
              </ul>
            </div>
            {/* menu activity */}
            <div className="account-activity">
              <h2>Trello</h2>
              <ul className="account-manager">
                <li className="account-manager-item">
                  <a href="" className="account-manager-link">
                    <span className="account-manager-title">
                      Profile and visibility
                    </span>
                  </a>
                </li>
                <li className="account-manager-item">
                  <a href="" className="account-manager-link">
                    <span className="account-manager-title">Activity</span>
                  </a>
                </li>
                <li className="account-manager-item">
                  <a href="" className="account-manager-link">
                    <span className="account-manager-title">Cards</span>
                  </a>
                </li>
                <li className="account-manager-item">
                  <a href="" className="account-manager-link">
                    <span className="account-manager-title">Settings</span>
                  </a>
                </li>
              </ul>
            </div>
            {/* menu support */}
            <div className="account-support">
              <ul className="account-manager">
                <li className="account-manager-item">
                  <a href="" className="account-manager-link">
                    <span className="account-manager-title">Help</span>
                  </a>
                </li>
                <li className="account-manager-item">
                  <a href="" className="account-manager-link">
                    <span className="account-manager-title">Shorcuts</span>
                  </a>
                </li>
              </ul>
            </div>
            {/* Log out */}
            <div className="account-logout">
              <ul className="account-manager account-support-list">
                <li className="account-manager-item">
                  <a href="" className="account-manager-link">
                    <span className="account-manager-title">Log out</span>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        {/* Search */}
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
