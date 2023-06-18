import React, { useState } from "react";
import WindownCard from "../WindownCard/WindownCard";
import { Dialog, DialogTitle } from "@material-ui/core";
import "./Cards.css";

const Cards = ({ card, members, listName, list_id, setCards, cards, userId}) => {
  const [watching, setWatching] = useState(card.watching.includes(userId)? true : false);
  const [dueDate, setDueDate] = useState(card.dueDate ? new Date( card.dueDate) : null);
  const [isEdit, setIsEdit] = useState(false);
  const [commentNum, setCommentNum] = useState(card.comments.length > 0 && card.comments.length)
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
          {watching && <div className="badge">
            <span className="material-symbols-outlined badge-icon">
              visibility
            </span>
          </div>}

          {dueDate && <div className="badge badge-time">
            <span className="material-symbols-outlined badge-icon">
              schedule
            </span>
            <span className="month"> {dueDate.toLocaleDateString('en-US', { month: 'long', day: 'numeric' })} </span>
          </div>}

          <div className="badge">
            <span className="material-symbols-outlined badge-icon">
              mark_chat_unread
            </span>
            <span className="number">
              {commentNum}
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
        <WindownCard handleClose={handleClose} card={card} members={members} listName={listName}
         list_id={list_id} 
         setCards={setCards} cards={cards}
          dueDate_p={dueDate} setDueDate_p={setDueDate}
          watching_p={watching} setWatching_p={setWatching}
          commentNum_p = {commentNum} setCommentNum_p={setCommentNum}
          />
      </Dialog>
    </div>
  );
};

export default Cards;