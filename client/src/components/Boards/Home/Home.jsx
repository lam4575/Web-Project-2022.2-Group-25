import React from "react";
import "./Home.css";

const HomeScreen = () => {
  return (
    <div className="home-main">
      <div className="stay_date">
        <div className="stay_date-img">
          <img
            src={require("../../../assets/img/work_space.png")}
            alt="workspace"
            className="img_stay"
          />
        </div>
        <div className="stay_date-text">
          <h4>Stay on track and uo to date</h4>
          <p>
            Invite people to boards and cards, leave comments, add due dates,
            and we'll show the most important activity here.
          </p>
        </div>
      </div>

      <div className="recently">
        <div className="recently_header">
          <span className="material-symbols-outlined recently-icon">
            schedule
          </span>
          <p>Recently viewed</p>
        </div>

        <div className="list_workspace"></div>

        <div className="links">
          <p>Links</p>
          <button className="creat_boards">
            <span class="material-symbols-outlined">add</span>
            <p>Creat a board</p>
          </button>
        </div>
      </div>
    </div>
  );
};

export default HomeScreen;
