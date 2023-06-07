import React, { Component } from "react";
import "./BoardContent.css";
import BoardList from "../BoardList/BoardList";

const BoardContentScreen = () => {
  return (
    <div className="board-content">
      <BoardList title="Linh" />
    </div>
  );
};
export default BoardContentScreen;
