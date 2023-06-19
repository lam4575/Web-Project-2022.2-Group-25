import React from "react";
import "./ShareBoard.css";
import { Avatar } from "@mui/material";

const ShareBoard = () => {
  return (
    <div className="share-board">
      <div className="share-board-body">
        <div className="share-board-header">
          <p className="share-board-header-title">Share board</p>
        </div>

        <div className="share-board-content">
          <div className="share-content-user">
            <input
              type="text"
              className="share-user-input"
              placeholder="Email address or name"
            />

            <button className="share-user-btn">Share</button>
          </div>

          {/* User share */}
          <div className="user-share">
            <Avatar sx={{ width: 34, height: 34 }} />
            <div className="user-info-share">
              <div className="user-name-share">Linh Nguyen Ngoc</div>
              <div className="user-email-share">@linhnguyengoc8</div>
            </div>
          </div>
        </div>
      </div>

      <div className="share-board-back">
        <button className="share-board-btn">
          <span className="material-symbols-outlined btn-share-back">
            close
          </span>
        </button>
      </div>
    </div>
  );
};

export default ShareBoard;
