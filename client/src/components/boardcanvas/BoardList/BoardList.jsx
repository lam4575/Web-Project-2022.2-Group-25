import React, { Component, useState } from "react";
import "./BoardList.css";
import Cards from "../Cards/Cards";
import WindownCard from "../WindownCard/WindownCard";

const BoardList = ({title, cards}) => {
  const [editing, setEditing] = useState(false);
  const [titleheader, setTitleheader] = useState(title);
  console.log(cards)
  //set add card
  const [addcard, setAddcard] = useState(false);
  const handleAddCard = () => {
    setAddcard(true);
  };

  const handleCloseCard = () => {
    setAddcard(false);
  };

  //set title
  const handleTitleClick = (e) => {
    setEditing(true);
  };

  const handleTitleChange = (e) => {
    setTitleheader(e.target.value);
  };

  const handleBlur = () => {
    setEditing(false);
  };

  return (
    <div className="js-list-content">
      <div className="list-header">
        <div className="list-header-target">
          {editing ? (
            <textarea
              className="title-area"
              rows={1}
              value={titleheader}
              onChange={handleTitleChange}
              onBlur={handleBlur}
              onClick={(e) => e.stopPropagation()}
            />
          ) : (
            <p className="title-header" dir="auto" onClick={handleTitleClick}>
              {titleheader}
            </p>
          )}
        </div>
        <div className="list-header-extras">yeeu</div>
      </div>

      <div className="list-cards">
        {cards.map((card)=>{
          return <Cards card = {card}></Cards>
        })}
      </div>
      {addcard ? (
        <div className="card-composer-container add-container">
          <div className="card-content">
            <textarea className="content-title" id="" rows="5"></textarea>
          </div>
          <div className="add-card">
            <div className="add">
              <button className="btn-add" onClick={handleCloseCard}>
                Add card
              </button>
              <span
                className="material-symbols-outlined btn-icon"
                onClick={handleCloseCard}
              >
                close
              </span>
            </div>
            <span className="material-symbols-outlined">more_horiz</span>
          </div>
        </div>
      ) : (
        <div className="card-composer-container">
          <div className="open-card-composer">
            <div className="link-card" onClick={handleAddCard}>
              <span className="material-symbols-outlined link-card-title">
                add
              </span>
              <span>Add a card</span>
            </div>
          </div>

          <div className="card-template">
            <span className="material-symbols-outlined link-card-title">
              auto_awesome_motion
            </span>
          </div>
        </div>
      )}

      {/* <div className="windown-overplay">
        <div className="overplay"></div>
        <WindownCard />
      </div> */}
    </div>
  );
};

export default BoardList;
