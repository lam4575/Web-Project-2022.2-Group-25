import { Avatar } from "@mui/material";
import React, { Component, useEffect, useState } from "react";
import "./header.css";
import { green } from '@mui/material/colors';
import Cookies from "js-cookie";
import axios from 'axios';
import { useNavigate } from "react-router-dom";

const Header = () => {
  const [onNav, setOnNav] = useState(false);
  const navigate = useNavigate();
  const [onNavWorkspaces, setOnNavWorkspaces] = useState(false);
  const [user, setUser] = useState({});
  const [displayMenu, setDisplayMenu] = useState(false);

  
  const fetchUserData = async () => {
    const token = Cookies.get('token');
    const response = await fetch('http://localhost:3030/api/users/me', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    const userData = await response.json();
    setUser(userData);
  }
  useEffect(() => {
    fetchUserData();
  }, []);

  const onOffNav = () => {
    setOnNav(!onNav);
  };

  const logout = async () => {
    const token = Cookies.get('token');
    await axios.post('http://localhost:3030/api/logout/', {
      token: token
    }, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    Cookies.remove('token');
    navigate('/login');
  }



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

      {!user.message && <div className="search-info">
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


          {/* Avatar User */}
          {user.message ? null : <button className="btn-header_info">
            <div className="info-item">
              <Avatar sx={{ width: 32, height: 32, bgcolor: green[500] }} onClick={()=>{setDisplayMenu(prevState => !prevState)}}>{user.avatar}</Avatar>
            </div>
          </button>}
          {displayMenu && !user.message && <div className="account-menu">
            {/* menu section */}
            <div className="account-menu-section">
              <h2>ACCOUNT</h2>
              <div className="account-info">
                <Avatar>{user.avatar}</Avatar>

                <div className="account-info-detail">
                  <div className="account-name">{`${user.firstName} ${user.lastName}`}</div>

                  <div className="account-email">{user.email}</div>
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
                <li className="account-manager-item" onClick={() => logout()}>
                  <a href="./" className="account-manager-link">
                    <span className="account-manager-title">Log out</span>
                  </a>
                </li>
              </ul>
            </div>
          </div>}
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
      </div>}
    </header>
  );
};

export default Header;
