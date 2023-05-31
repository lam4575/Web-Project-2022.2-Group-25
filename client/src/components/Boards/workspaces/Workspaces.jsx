import React from "react";
import "./Workspaces.css";

const WorkspaceScreen = () => {
  const creatWork = () => {
    return <div className="box-work"></div>;
  };

  return (
    <div className="workspace">
      <div className="work-header">
        <div className="work-img"></div>
        <div className="work-name">
          <div className="name">
            <p>Ngoc Linh</p>
            <button className="edit-btn">
              <span className="material-symbols-outlined">edit</span>
            </button>
          </div>
          <div className="private">
            <span className="material-symbols-outlined">lock</span>
            <p>Private</p>
          </div>
        </div>
      </div>

      <div className="your-works">
        <div className="your-works-header">
          <span className="material-symbols-outlined">person</span>
          <p>Your boards</p>
        </div>

        <div className="list-work"></div>
      </div>
    </div>
  );
};

export default WorkspaceScreen;
