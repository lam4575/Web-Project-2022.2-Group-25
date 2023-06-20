import React, { Component } from "react";
import "./PopOver.css";

const PopOver = ({ handleClose, setAddCard, setEditTitle, deleteList, lists, setLists }) => {
  return (
    <div className="pop-over">
      <div className="no-back">
        <div className="pop-over-header">
          <div className="pop-over-header-title">List actions</div>
          <div className="pop-over-back" >
            <button className="pop-over-btn" onClick={() => handleClose()}>
              <span className="material-symbols-outlined btn-popover-back">
                close
              </span>
            </button>
          </div>
        </div>


        {/* Pop content */}
        <div className="pop-over-content">
          <ul className="pop-over-list">
            <li className="pop-over-item">
              <a className="pop-over-item-link"
                onClick={() => {
                  setAddCard(true);
                  handleClose();
                }}>
                <span className="pop-over-title">Add card</span>
              </a>
            </li>

            <li className="pop-over-item">
              <a className="pop-over-item-link"
                onClick={() => {
                  setEditTitle(true);
                  handleClose();
                }}>
                <span className="pop-over-title">Edit List title</span>
              </a>
            </li>

            <li className="pop-over-item">
              <a className="pop-over-item-link"
                onClick={() => {
                  deleteList()
                }}>
                <span className="pop-over-title">Delete list</span>
              </a>
            </li>

          </ul>
        </div>
      </div>


    </div>
  );
};

export default PopOver;
