import React, { Component } from "react";
import "./Cards.css";

const Cards = (props) => {
  return (
    <div className="cards">
      <div className="card-content">
        <p>Linh</p>
      </div>

      <div className="edit">
        <button className="btn-edit">
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
            <span className="number">1</span>
          </div>
        </div>
        <div className="avatar-user"></div>
      </div>
    </div>
  );
};

export default Cards;
