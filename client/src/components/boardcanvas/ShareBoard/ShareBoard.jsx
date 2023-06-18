import React, { useEffect, useState } from "react";
import "./ShareBoard.css";
import { Avatar } from "@mui/material";
import axios from 'axios';
import Cookies from 'js-cookie';


const ShareBoard = ({ setOpenShare, boardId, setMembers }) => {
  const [users, setUsers] = useState([]);
  const [text, setText] = useState("");
  const [error, setError] = useState(false);
  
  useEffect(() => {
    getUsers();
  }, [text]);


  const getUsers = async () => {
    if(text==="") {
      setUsers([]);
      setError(false);
      return;
    }
    const username = text;
    const email = text;

    const url = `http://localhost:3030/api/users?username=${username}&email=${email}&boardId=${boardId}`;
    await axios.get(url).then(res => {
      if (res.data.msg) {
        setUsers([]);
        setError(true);
      }
      else {
        if(text==="") {
          setError(true);
          setUsers([]);
        }
        console.log(res);
        setError(false);
        let newUsers = res.data;
        setUsers(newUsers);
      }
    }).catch(err => {
      console.log(err);
    });
  };

  
  const shareUser = async (username) => {
    const token = Cookies.get("token");
    console.log(token);
    try {
      const url = `http://localhost:3030/api/boards/${boardId}/share`;
      const body = { username: username, isAdmin: false };
      await axios.post(url, body, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then(res=>{
        setMembers(res.data.members);
        setUsers(users.filter(user=>user.username!==username));
      })
      .catch(err=>{
        console.log(err);
      });
    } catch (error) {
      console.error(error);
      // Handle errors
    }
  };


  return (
    <div className="share-board">
      <div className="share-board-body">
        <div className="share-board-header">
          <p className="share-board-header-title">Share board</p>
        </div>

        <div className="share-board-content">
          <div className="share-content-user">
            <input
              id="find-user-input"
              type="text"
              className="share-user-input"
              onChange={
                (e) => {
                  setText(e.target.value);
                }
              }
              placeholder="Email address or name"
            />
          </div>

          {/* User share */}
          {users?.length > 0 && users.slice(0, 4).map(user => (
            <div className="user-share" key={user._id}>
              <Avatar sx={{ width: 34, height: 34 }} >{user.avatar}</Avatar>
              <div className="user-info-share">
                <div className="user-info">
                  <div className="user-name-share">{`${user.firstName} ${user.lastName}`}</div>
                  <div className="user-email-share">@{user.username}</div>
                </div>
                <button className="share-user-btn" onClick={()=>{shareUser(user.username)}}>Share</button>
              </div>
            </div>
          ))}
          {error && <div className="">
            <span>User not found!</span>
          </div>}
        </div>
      </div>

      <div className="share-board-back">
        <button className="share-board-btn" onClick={() => setOpenShare(false)}>
          <span className="material-symbols-outlined btn-share-back">
            close
          </span>
        </button>
      </div>
    </div>
  );
};

export default ShareBoard;
