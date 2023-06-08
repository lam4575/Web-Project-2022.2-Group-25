import React, { Component, useState } from "react";
import { Group } from "@mantine/core";
import { Calendar } from "@mantine/dates";
import "./WindownCard.css";

const WindownCard = (props) => {
  const [watching, setWatching] = useState(true);
  const [openCalendar, setOpenCalendar] = useState(false);
  const [value, onChange] = useState(new Date());

  const handleSavedataNotifi = () => {
    setWatching(!watching);
  };


  return (
    <div className="windown-card">
      <div className="card-detail">
        {/* Header */}
        <div className="windown-card-header">
          <div className="header-icon">
            <span className="material-symbols-outlined icon-header-card">
              credit_card
            </span>
          </div>

          <div className="header-name">
            <div className="header-title">
              <p className="name-inline">{ }Linh</p>
            </div>

            <div className="header-inline-card">
              <p>in list{ }</p>
            </div>
          </div>
        </div>

        {/* Body */}
        <div className="windown-body">
          <div className="windown-card-content">
            {/*Data */}
            <div className="card-data">
              <div className="card-data-detail notifi">
                <div className="data-title">
                  <p className="title">Notifications</p>
                </div>

                <div className="data-btn">
                  <button className="btn-watch" onClick={handleSavedataNotifi}>
                    <span className="material-symbols-outlined data-btn_icon">
                      visibility
                    </span>
                    {watching ? (
                      <div className="watching">
                        <p className="watch-title">Watching</p>
                        <input type="checkbox" defaultChecked />
                      </div>
                    ) : (
                      <p className="watch-title">Watch</p>
                    )}
                  </button>
                </div>
              </div>

              <div className="card-data-detail due-date">
                <div className="data-title">
                  <p className="title">Due date</p>
                </div>

                <div className="data-btn"></div>
              </div>
            </div>

            {/* Description */}
            <div className="card-item card-description">
              <div className="card-icon">
                <span className="material-symbols-outlined icon-detail">
                  description
                </span>
              </div>

              <div className="card-item-content">
                <div className="card-item-header">
                  <p className="title-header">Description</p>
                  <div className="header-button">
                    <button className="btn-header">Edit</button>
                  </div>
                </div>
              </div>
            </div>
            {/* Checklist */}
            <div className="card-item card-checklist">
              <div className="card-icon">
                <span className="material-symbols-outlined icon-detail">
                  select_check_box
                </span>
              </div>

              <div className="card-item-content">
                <div className="card-item-header">
                  <p className="title-header">Checklist</p>
                  <div className="header-button">
                    <button className="btn-header">Delete</button>
                  </div>
                </div>
              </div>
            </div>
            {/* Activity */}
            <div className="card-item card-activity">
              <div className="card-icon">
                <span className="material-symbols-outlined icon-detail">mist</span>
              </div>

              <div className="card-item-content">
                <div className="card-item-header">
                  <p className="title-header">Activity</p>
                  <div className="header-button">
                    <button className="btn-header">Show Detail</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* SideBar */}
          <div className="windown-card-sidebar">
            <div className="add-to-card">
              <p className="add-to-card-title">Add to card</p>
              <div className="add-to-card-items">
                <button className="add-card-item">
                  <span className="material-symbols-outlined add-card-item_icon">
                    person
                  </span>
                  <p className="add-card-item_content">Members</p>
                </button>

                <button className="add-card-item">
                  <span className="material-symbols-outlined add-card-item_icon">
                    select_check_box
                  </span>
                  <p className="add-card-item_content">Checklist</p>
                </button>
                <div style={{position: "relative"}}>
                  <button
                    className="add-card-item"
                    onClick={() => setOpenCalendar(!openCalendar)}
                  >
                    <span className="material-symbols-outlined add-card-item_icon">
                      schedule
                    </span>
                    <p className="add-card-item_content">Dates</p>
                  </button>
                  {openCalendar && (
                    <div className="calendar">
                      <Group position="center">
                        <Calendar
                          defaultDate={new Date()}
                        />
                      </Group>
                      <div className="button-container">
                        <button type="button" onClick={() => { setOpenCalendar(!openCalendar) }}> Save </button>
                        <button type="button" onClick={() => { setOpenCalendar(!openCalendar) }}> Cancle </button>
                      </div>
                    </div>
                  )}
                </div>


                <button className="add-card-item">
                  <span className="material-symbols-outlined add-card-item_icon">
                    schedule
                  </span>
                  <p className="add-card-item_content">Cover</p>
                </button>

                <button className="add-card-item">
                  <span className="material-symbols-outlined add-card-item_icon">
                    person
                  </span>
                  <p className="add-card-item_content">Custom Fields</p>
                </button>
              </div>
            </div>

            <div className="add-to-card">
              <p className="add-to-card-title">Power-Ups</p>
              <div className="add-to-card-items"></div>
            </div>

            <div className="add-to-card">
              <p className="add-to-card-title">Actions</p>
              <div className="add-to-card-items"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Back */}
      <div className="card-back">
        <button className="btn-back">
          <span className="material-symbols-outlined">close</span>
        </button>
      </div>
    </div>
  );
};

export default WindownCard;
