import React, { useEffect, useState } from "react";
import "./BoardContent.css";
import BoardList from "../BoardList/BoardList";
import axios from "axios";
import { useParams } from "react-router-dom";
import AddList from "../AddList/AddList"
import BoardHeader from "../BoardHeader/BoardHeader";
import Cookies from "js-cookie";

const BoardContentScreen = () => {
  const { boardId } = useParams();
  const [board, setBoard] = useState({});
  const [lists, setLists] = useState([]);
  const [members, setMembers] = useState([]);
  const [userId, setUserId] = useState("");
  useEffect(() => {
    fetchBoard(boardId);
  }, []);

  function fetchBoard(boardId) {
    const token = Cookies.get("token");
    // Make a GET request to fetch user data and boards
    return axios
      .get(`http://localhost:3030/api/boards/${boardId}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then((response) => {
        // Extract the boards from the response data
        let board_p = response.data.board;
        setMembers(board_p.members);
        setBoard(board_p);
        setLists(board_p.lists);
        setUserId(response.data.userId);
      })
      .catch((error) => {
        // Handle errors
        console.error("Failed to fetch user data:", error);
        throw error;
      });
  }


  return (
    <div className="">
      <BoardHeader
        boardTitle={board.boardName}
        visibility={board.visibility}
        members_p={members} setMembers_p={setMembers}
        boardId={boardId} />
      <div className="board-content">
        {lists &&
          lists.map((list) => (
            <BoardList
              key={boardId}
              board_id={boardId}
              list_id={list._id}
              title={list.listTitle}
              card={list.cards}
              members={members} setMembers={setMembers}
              setLists={setLists}
              lists={lists}
              userId={userId}
            />
          ))}
        <AddList board_id={boardId} setLists={setLists} lists={lists} />
      </div>
    </div>

  );
};
export default BoardContentScreen;
