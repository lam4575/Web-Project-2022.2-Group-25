import React, { Component } from "react";
import "./PopOver.css";

const PopOver = () => {
  return (
    <div className="pop-over">
      <div className="no-back">
        <div className="pop-over-header">
          <span className="pop-over-header-title">List actions</span>
        </div>

        {/* Pop content */}
        <div className="pop-over-content">
          <ul className="pop-over-list">
            <li className="pop-over-item">
              <a href="" className="pop-over-item-link">
                <span className="pop-over-title">Add card...</span>
              </a>
            </li>

            <li className="pop-over-item">
              <a href="" className="pop-over-item-link">
                <span className="pop-over-title">Copy list...</span>
              </a>
            </li>

            <li className="pop-over-item">
              <a href="" className="pop-over-item-link">
                <span className="pop-over-title">Move list...</span>
              </a>
            </li>

            <li className="pop-over-item">
              <a href="" className="pop-over-item-link">
                <span className="pop-over-title">Watch</span>
              </a>
            </li>
          </ul>

          <ul className="pop-over-list">
            <li className="pop-over-item">
              <a href="" className="pop-over-item-link">
                <span className="pop-over-title">Sort by...</span>
              </a>
            </li>
          </ul>

          <h2>Automation</h2>
          <ul className="pop-over-list">
            <li className="pop-over-item">
              <a href="" className="pop-over-item-link">
                <span className="pop-over-title">
                  When a card is added to the list...
                </span>
              </a>
            </li>
            <li className="pop-over-item">
              <a href="" className="pop-over-item-link">
                <span className="pop-over-title">
                  Every day, sort list by...
                </span>
              </a>
            </li>
            <li className="pop-over-item">
              <a href="" className="pop-over-item-link">
                <span className="pop-over-title">
                  Every Monday, sort list by...
                </span>
              </a>
            </li>
            <li className="pop-over-item">
              <a href="" className="pop-over-item-link">
                <span className="pop-over-title">Create a rule</span>
              </a>
            </li>
          </ul>

          <ul className="pop-over-list">
            <li className="pop-over-item">
              <a href="" className="pop-over-item-link">
                <span className="pop-over-title">
                  Move all card in this list...
                </span>
              </a>
            </li>
            <li className="pop-over-item">
              <a href="" className="pop-over-item-link">
                <span className="pop-over-title">
                  Archive all cards in this list...
                </span>
              </a>
            </li>
          </ul>

          <ul className="pop-over-list">
            <li className="pop-over-item">
              <a href="" className="pop-over-item-link">
                <span className="pop-over-title">Archive this list</span>
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="pop-over-back">
        <button className="pop-over-btn">
          <span className="material-symbols-outlined btn-popover-back">
            close
          </span>
        </button>
      </div>
    </div>
  );
};

export default PopOver;
