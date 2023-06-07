import React from "react";
import "./Main.css";

const MainScreen = () => {
  return (
    <div className="main-body">
      <div className="recently">
        <div className="recently_header">
          <span className="material-symbols-outlined recently-icon">
            schedule
          </span>
          <p>Recently viewed</p>
        </div>
      </div>

      <div className="your_work">
        <div className="your_work-text">
          <h4>YOUR WORKSPACES</h4>
        </div>

        <div className="your_work-header">
          <div className="header-name">
            <img src="" alt="" className="header-img" />
            <p>Trell Workspace</p>
          </div>

          <div className="your_work-option">
            <ul className="control-list">
              <li className="list-item">
                <button className="button_works">
                  <span className="material-symbols-outlined box-icon">
                    dashboard
                  </span>
                  <p>Broads</p>
                </button>
              </li>

              <li className="list-item">
                <button className="button_works">
                  <span className="material-symbols-outlined box-icon">
                    grid_view
                  </span>
                  <p>Views</p>
                </button>
              </li>

              <li className="list-item">
                <button className="button_works">
                  <span className="material-symbols-outlined box-icon">
                    group
                  </span>
                  <p>Member</p>
                </button>
              </li>

              <li className="list-item">
                <button className="button_works">
                  <span className="material-symbols-outlined box-icon">
                    settings
                  </span>
                  <p>Settings</p>
                </button>
              </li>
            </ul>
          </div>
        </div>

        <div className="your_work-body"></div>
      </div>
    </div>
  );
};

export default MainScreen;
