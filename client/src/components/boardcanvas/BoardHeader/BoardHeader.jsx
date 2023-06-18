import React, { Component, useState } from "react";
import "./BoardHeader.css";
import { Avatar } from "@mui/material";
import ShareBoard from "../ShareBoard/ShareBoard";

const BoardHeader = ({boardId, boardTitle, members_p, visibility, setMembers_p }) => {
  const [openShare, setOpenShare] = useState(false);

  return (
    <div className="board-header">
      {/* Board Header Container */}
      <div className="board-header-container">
        <div className="bhc-name">{boardTitle}</div>
        <div className="bhc-workspace">
          <span className="material-symbols-outlined bhc-icon-header">
            groups
          </span>
          <p className="bhc-title"><b>{visibility?.toUpperCase()}</b></p>
        </div>
        {/*  <div className="bhc-table">
          <span className="material-symbols-outlined">table</span>
          <p className="bhc-title">Table</p>
        </div> */}
      </div>

      {/* Board Header Activity */}
      <div className="board-header-activitty">
        <div className="bhc-filter">
          <span className="material-symbols-outlined bhc-icon-filter">
            filter_list
          </span>
          <p className="bhc-title">Filter</p>
        </div>

        {
          members_p?.length > 0 && members_p.map(member => (
            <div className="bhc-avatar" key={member._id}>
              <Avatar
                sx={{
                  width: 32,
                  height: 32
                }}
              >
                {member.avatar}
              </Avatar>
            </div>
          ))
        }


        <button className="bhc-share">
          <span className="material-symbols-outlined bhc-icon-share">
            person_add
          </span>
          <p className="bhc-title" onClick={()=>{setOpenShare(true)}}>Share</p>
        </button>
      </div>
      {openShare && <ShareBoard boardId={boardId} openShare={openShare} setOpenShare={setOpenShare} setMembers={setMembers_p}/>}
    </div>
  );
};

export default BoardHeader;
