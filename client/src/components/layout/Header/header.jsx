import { Avatar, Button, Popover } from "@mui/material";
import React, { Component, useEffect, useState } from "react";
import "./header.css";
import { green } from '@mui/material/colors';
import Cookies from "js-cookie";
import axios from 'axios';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({});
  const [displayMenu, setDisplayMenu] = useState(false);
  const [search, setSearch] = useState(false);
  const [openBoard, setOpenBoard] = useState(false);
  const [boards, setBoards] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const [searchInput, setSearchInput] = useState('');
  const [filteredBoards, setFilteredBoards] = useState([]);
  const [error, setError] = useState(false);
  
  const handleLinkClick = (boardId) => {
    navigate(`/boards/${boardId}`);
  };
  const handleOpenBoard = (event) => {
    setOpenBoard(true);
    setAnchorEl(event.currentTarget);
  };

  const handleCloseBoard = () => {
    setOpenBoard(false);
    setAnchorEl(null);
  };

  const handleSearchChange = (event) => {
    const inputValue = event.target.value;
    setSearchInput(inputValue);
    if (inputValue === "") {
      setFilteredBoards([]);
      setError(false);
      return;
    }
    const regexPattern = new RegExp(`^${inputValue}`, 'i');
    const filtered = boards.filter((board) => board && board.boardName.match(regexPattern));
    if (filtered.length > 0) {
      setSearch(true);
      setError(false);
      setFilteredBoards(filtered);
    } else if (filtered.length === 0) {
      setError(true);
    }
  };

  const handleInputBlur = () => {
    setFilteredBoards([]);
    setError(false);
    setSearch(false);
  }

  const fetchUserData = async () => {
    const token = Cookies.get('token');
    const response = await fetch('http://localhost:3030/api/users/me', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    const userData = await response.json();
    setBoards(userData.boards);
    setUser(userData);
  }
  useEffect(() => {
    fetchUserData();
  }, []);


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
      <div className="logo">
        <a href="/boards" className="logo-name">
          <img
            src={require("../../../assets/img/logo.png")}
            alt="Logo"
            className="img-logo"
          />
        </a>
      </div>

      <div className="select">
        <button className="select-button" onClick={handleOpenBoard}>
          <span className="select-text">Boards</span>
          <div className="select-icon">
            <span className="material-symbols-outlined select-icon-item">
              expand_more
            </span>
          </div>
        </button>
        <Popover
          open={openBoard}
          onClose={handleCloseBoard}
          anchorEl={anchorEl}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
        >
          <div className="board-containner">
            {boards.length > 0 ? (
              <div>
                <div style={{ padding: "1rem", borderBottom: "1px solid #6c757d", backgroundColor: "#f5f5f5", fontWeight: "700", fontSize: "1.5rem" }}>BOARD</div>
                {boards.slice(0, 3).map((board, index) => (
                  <div key={board._id} className="board-item">
                    <div style={{ padding: "1rem" }}>
                      <div className="board-name">{board.boardName}</div>
                      <div className="board-visibility">{board.visibility}</div>
                    </div>
                    <a className="arrow-right-icon" href={`/boards/${board._id}`}>
                        <KeyboardArrowRightIcon sx={{ fontSize: "3rem" }} />
                    </a>
                  </div>
                ))}
              </div>
            ) : (
              <p>No results found.</p>
            )}
          </div>
        </Popover>
      </div>

      {!user.message && <div className="search-info">
        <div className="header-info">
          {/* Avatar User */}
          {user.message ? null : <button className="btn-header_info">
            <div className="info-item">
              <Avatar sx={{ width: 32, height: 32, bgcolor: green[500] }} onClick={() => { setDisplayMenu(prevState => !prevState) }}>{user.avatar}</Avatar>
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
            </div>
            {/* menu activity */}

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
          <div id="search" className="icon-with-search">
            <span className="material-symbols-outlined icon-search">
              search
            </span>
          </div>
          <input
            type="text"
            placeholder="Search board..."
            className="input-search"
            value={searchInput}
            onChange={handleSearchChange}
          />
          <div className="search-containner">
            {!error && search && filteredBoards.slice(0, 3).map((board) => (
              <div key={board._id} className="board-item">
                <div style={{ padding: "1rem" }}>
                  <div className="board-name">{board.boardName}</div>
                  <div className="board-visibility">{board.visibility}</div>
                </div>
                <a className="arrow-right-icon" 
                href={`/boards/${board._id}`}
                onClick={()=>handleLinkClick(board._id)}
                >
                    <KeyboardArrowRightIcon sx={{ fontSize: "3rem" }} />
                </a>
              </div>
            ))}
            {error && <div style={{width:"100%", height:"2 rem", fontSize:"1.5rem"}}>Board not found!</div>}
          </div>
        </label>

      </div >}
    </header >
  );
};

export default Header;
