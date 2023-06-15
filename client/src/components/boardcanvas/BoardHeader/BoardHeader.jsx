import React, { Component } from "react";
import "./BoardHeader.css";

const BoardHeader = () => {
  return (
    <div className="board-header">
      {/* Board Header Container */}
      <div className="board-header-container">
        <div className="bhc-name"></div>
        <button className="bhc-star">
          <span className="material-symbols-outlined">grade</span>
        </button>
        <div className="bhc-workspace">
          <span className="material-symbols-outlined">groups</span>
          <p className="bhc-title">Workspace visible</p>
        </div>
        <div className="bhc-table">
          <span className="material-symbols-outlined">table</span>
          <p className="bhc-title">Table</p>
        </div>
      </div>

      {/* Board Header Activity */}
      <div className="board-header-activitty"></div>
    </div>
  );
};

export default BoardHeader;
