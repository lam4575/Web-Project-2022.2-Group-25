
import React, { useState } from "react";
import "./Main.css";
import AddIcon from '@mui/icons-material/Add';
import { Button, createTheme, Popover } from "@mui/material";
import axios from 'axios';
import Cookies from 'js-cookie';

const MainScreen = ({ boards, setBoards }) => {

  const createBoard = async () => {
    const boardTitle = document.querySelector(".popover-containner input").value;
    const boardType = document.querySelector(".popover-containner select").value;
    const token = Cookies.get('token');
    await axios.post("http://localhost:3030/api/boards/", {
        boardName: boardTitle,
        visibility: boardType,
      }, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      }).then(res=>{
        let newBoard = res.data;
        setBoards([...boards, newBoard]);
        setOpen(false);
      }).catch(err=>{
        console.log(err);
      });
  };



  const handleBoardClick = (boardId) => {
    window.location.href = `/boards/${boardId}`;
  };
  const [open, setOpen] = useState(false);
  const handleClick = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  

  return (
    <div className="main-body">
      <div className="recently">
        <div className="recently_header">
          <span className="material-symbols-outlined recently-icon">
            schedule
          </span>
          <p>Recently viewed</p>
        </div>
        <div style={{ display: "block" }}>
          <ul className="boards-page-board-section-list">
            {boards.slice(0, 4).map(board => (
              <li className="boards-page-board-section-list-item" key={board._id}>
                <a className="board-tile" onClick={() => handleBoardClick(board._id)}>
                  <div className="board-tile-details is-badged">
                    <div className="board-tile-details-name">
                      {board.boardName}
                    </div>
                  </div>
                </a>
              </li>
            ))}
            <button id="add-btn" className="add-board" title="Add Board" onClick={() => { setOpen(true) }}>
              <AddIcon fontSize="large">Add Board</AddIcon>
            </button>
            <Popover 
            className="rootElement"
              id="popover"
              anchorEl={document.getElementById("add-btn")}
              open={open}
              onClose={()=>handleClose()}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
            >
              <div className="popover-containner">
                <input type="text" placeholder="Board Title" style={{ width: "100%", height: "32px"}} />
                <select style={{ width: "100%", height: "32px" }}>
                  <option value="public">Public</option>
                  <option value="private">Private</option>
                  <option value="workspace">Workspace</option>
                </select>
                <Button variant="contained" onClick={()=>createBoard()}>Create Board</Button>
              </div>
            </Popover>


          </ul>
        </div>
      </div>

      <div className="your_work">
        <div className="your_work-text">
          <h4>YOUR WORKSPACES</h4>
        </div>

        <div className="your_work-header">
          <div className="header-name">
            <img src="" alt="" className="header-img" />
            <p>Trell Workspace</p>
          </div>

          <div className="your_work-option">
            <ul className="control-list">
              <li className="list-item">
                <button className="button_works">
                  <span className="material-symbols-outlined box-icon">
                    dashboard
                  </span>
                  <p>Broads</p>
                </button>
              </li>

              <li className="list-item">
                <button className="button_works">
                  <span className="material-symbols-outlined box-icon">
                    grid_view
                  </span>
                  <p>Views</p>
                </button>
              </li>

              <li className="list-item">
                <button className="button_works">
                  <span className="material-symbols-outlined box-icon">
                    group
                  </span>
                  <p>Member</p>
                </button>
              </li>

              <li className="list-item">
                <button className="button_works">
                  <span className="material-symbols-outlined box-icon">
                    settings
                  </span>
                  <p>Settings</p>
                </button>
              </li>
            </ul>
          </div>
        </div>

        <div className="your_work-body"></div>
      </div>
    </div>
  );
};

export default MainScreen;



