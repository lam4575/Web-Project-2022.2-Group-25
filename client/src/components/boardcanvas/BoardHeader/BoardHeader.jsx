import React, { Component, useState } from "react";
import "./BoardHeader.css";
import { Avatar } from "@mui/material";
import ShareBoard from "../ShareBoard/ShareBoard";

const BoardHeader = () => {
  const [onMenuBhc, setOnMenuBhc] = useState(true);

  return (
    <div className="board-header">
      {/* Board Header Container */}
      <div className="board-header-container">
        <div className="bhc-name">Linh</div>
        <button className="bhc-star">
          <span className="material-symbols-outlined">grade</span>
        </button>
        <div className="bhc-workspace">
          <span className="material-symbols-outlined bhc-icon-header">
            groups
          </span>
          <p className="bhc-title">Workspace visible</p>
        </div>
        {/*  <div className="bhc-table">
          <span className="material-symbols-outlined">table</span>
          <p className="bhc-title">Table</p>
        </div> */}
      </div>

      {/* Board Header Activity */}
      <div className="board-header-activitty">
        <div className="bhc-filter">
          <span className="material-symbols-outlined bhc-icon-filter">
            filter_list
          </span>
          <p className="bhc-title">Filter</p>
        </div>

        <div className="bhc-avatar">
          <Avatar sx={{ width: 32, height: 32 }}></Avatar>
        </div>

        <button className="bhc-share">
          <span className="material-symbols-outlined bhc-icon-share">
            person_add
          </span>

          <p className="bhc-title">Share</p>
        </button>

        {onMenuBhc ? (
          <button className="bhc-menu" onClick={() => setOnMenuBhc(!onMenuBhc)}>
            <span className="material-symbols-outlined icon-bhc-menu">
              more_horiz
            </span>
          </button>
        ) : (
          <div className="box-bhc-menu">
            <div className="no-back-bhc">
              <div className="box-bhc-menu-header">
                <span className="box-bhc-menu-header-title">Menu</span>
              </div>

              {/* Pop content */}
              <div className="bhc-menu-content">
                <ul className="bhc-menu-list"></ul>
                {/* menu activity */}
                <div className="bhc-menu-activity">
                  <span className="material-symbols-outlined ">mist</span>
                  <p className="bhc-menu-title">Activity</p>
                </div>
                <ul className="bhc-menu-list"></ul>
              </div>
            </div>

            <div className="pop-over-back">
              <button
                className="pop-over-btn"
                onClick={() => setOnMenuBhc(!onMenuBhc)}
              >
                <span className="material-symbols-outlined btn-popover-back">
                  close
                </span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BoardHeader;
