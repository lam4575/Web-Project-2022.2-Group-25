import React, { useEffect, useState } from "react";
import "./BoardContent.css";
import BoardList from "../BoardList/BoardList";
import axios from "axios";
import { useParams } from "react-router-dom";
import AddList from "../AddList/AddList"

const BoardContentScreen = () => {
  const { boardId } = useParams();
  const [board, setBoard] = useState({});
  const [lists, setLists] = useState([]);
  useEffect(() => {
    fetchBoard(boardId);
  }, []);

  function fetchBoard(boardId) {
    // Make a GET request to fetch user data and boards
    return axios
      .get(`http://localhost:3030/api/boards/${boardId}`)
      .then((response) => {
        // Extract the boards from the response data
        let board = response.data;
        setBoard(board);
        setLists(board.lists);
      })
      .catch((error) => {
        // Handle errors
        console.error("Failed to fetch user data:", error);
        throw error;
      });
  }

  return (
    <div className="board-content">
      {lists &&
        lists.map((list) => (
          <BoardList board_id={boardId}
            list_id={list._id}
            title={list.listTitle}
            card={list.cards}
            members={board.members}
            setLists={setLists}
            lists={lists} />
        ))}
      <AddList board_id={boardId} setLists={setLists} lists={lists} />
    </div>
  );
};
export default BoardContentScreen;
