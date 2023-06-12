import React, { useState } from "react";
import WindownCard from "../WindownCard/WindownCard";
import { Dialog, DialogTitle } from "@material-ui/core";
import "./Cards.css";

const Cards = ({ card }) => {
  const [isEdit, setIsEdit] = useState(false);

  const handleEditClick = () => {
    setIsEdit(!isEdit);
  };

  const handleClose = () => {
    setIsEdit(false);
  };

  return (
    <div className="cards">
      <div className="card-content">
        <span className="list-card-title js-card-name">{card.cardTitle}</span>
      </div>

      <div className="edit">
        <button className="btn-edit" onClick={handleEditClick}>
          <span className="material-symbols-outlined edit-icon">edit</span>
        </button>
      </div>

      <div className="badges">
        <div className="badges-info">
          <div className="badge">
            <span className="material-symbols-outlined badge-icon">
              visibility
            </span>
          </div>

          <div className="badge badge-time">
            <span className="material-symbols-outlined badge-icon">
              schedule
            </span>
            <span className="month"></span>
          </div>

          <div className="badge">
            <span className="material-symbols-outlined badge-icon">sort</span>
          </div>

          <div className="badge">
            <span className="material-symbols-outlined badge-icon">
              mark_chat_unread
            </span>
            <span className="number">
              {card.comments.length > 0 && card.comments.length}
            </span>
          </div>
        </div>
        <div className="avatar-user"></div>
      </div>

      <Dialog open={isEdit} PaperProps={{
        style: {
          backgroundColor: 'transparent',
          boxShadow: 'none',
        },
      }} fullScreen>
        <WindownCard handleClose={handleClose}/>
      </Dialog>
    </div>
  );
};

export default Cards;