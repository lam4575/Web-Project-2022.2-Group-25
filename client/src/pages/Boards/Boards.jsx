import React, { useState } from "react";
import Header from "../../components/layout/Header/header";
import "./boards.css";
import MainScreen from "../../components/Boards/BoardsMain/Main";
import HomeScreen from "../../components/Boards/Home/Home";
import WorkspaceScreen from "../../components/Boards/workspaces/Workspaces";
import SettingsScreen from "../../components/Boards/Settings/Settings";

const Boards = () => {
  const listitems = document.getElementsByClassName("control-item");
  const onLists = document.getElementsByClassName("workspace_details");

  const [activeTab, setActiveTab] = useState(0);

  const clickBlock = () => {
    console.log(onLists.target);
  };

  const renderTabScreen = (index) => {
    switch (index) {
      case 0:
        return <MainScreen />;
      case 1:
        return;
      case 2:
        return <HomeScreen />;
      case 3:
        return <WorkspaceScreen />;
      case 4:
        return <HomeScreen />;
      case 5:
        return;
      case 6:
        return <div>Member</div>;
      case 7:
        return <SettingsScreen />;
      default:
        return null;
    }
  };

  const handleClick = () => {
    for (let i = 0; i < listitems.length; i++) {
      listitems[i].addEventListener("click", function () {
        for (let j = 0; j < listitems.length; j++)
          if (listitems[j].classList.contains("active")) {
            listitems[j].classList.remove("active");
          }

        listitems[i].classList.add("active");
        setActiveTab(i);
      });
    }
  };

  return (
    <div className="boards">
      <Header />
      <div className="container-control">
        <div className="sidebar">
          <div className="control">
            <ul className="list-control">
              <li className="control-item active">
                <button className="box-control" onClick={handleClick}>
                  <span className="material-symbols-outlined box-icon">
                    dashboard
                  </span>
                  <p>Broads</p>
                </button>
              </li>

              <li className="control-item">
                <button className="box-control" onClick={handleClick}>
                  <span className="material-symbols-outlined box-icon">
                    bar_chart
                  </span>
                  <p>Templates</p>
                </button>
              </li>

              <li className="control-item">
                <button className="box-control" onClick={handleClick}>
                  <span className="material-symbols-outlined box-icon">
                    house
                  </span>
                  <p>Home</p>
                </button>
              </li>
            </ul>
          </div>
          <div className="workspaces">
            <div className="workspace_text">
              <p>Workspaces</p>
              <button className="button_add">
                <span className="material-symbols-outlined button_add-icon">
                  add
                </span>
              </button>
            </div>

            <div className="workspace-name">
              <button className="workspace_header" onClick={clickBlock}>
                <img src="" alt="" className="avatar" />
                <p>Trello Workspace</p>
                <span className="material-symbols-outlined">expand_less</span>
              </button>

              <div className="workspace_details onblock">
                <ul className="list-workspace">
                  <li className="control-item">
                    <button className="workspace_button" onClick={handleClick}>
                      <span className="material-symbols-outlined box-icon">
                        dashboard
                      </span>
                      <p>Broads</p>
                    </button>
                  </li>

                  <li className="control-item">
                    <button className="workspace_button" onClick={handleClick}>
                      <span className="material-symbols-outlined box-icon">
                        favorite
                      </span>
                      <p>Highlights</p>
                    </button>
                  </li>

                  <li className="control-item">
                    <button className="workspace_button" onClick={handleClick}>
                      <span className="material-symbols-outlined box-icon">
                        grid_view
                      </span>
                      <p>Views</p>
                    </button>
                  </li>

                  <li className="control-item">
                    <button className="workspace_button" onClick={handleClick}>
                      <span className="material-symbols-outlined box-icon">
                        group
                      </span>
                      <p>Member</p>
                    </button>
                  </li>

                  <li className="control-item">
                    <button className="workspace_button" onClick={handleClick}>
                      <span className="material-symbols-outlined box-icon">
                        settings
                      </span>
                      <p>Settings</p>
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="content">{renderTabScreen(activeTab)}</div>
      </div>
    </div>
  );
};

export default Boards;
