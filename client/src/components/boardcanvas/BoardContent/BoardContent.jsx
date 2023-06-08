import React, { Component, useEffect, useState } from "react";
import "./BoardContent.css";
import BoardList from "../BoardList/BoardList";
import axios from 'axios';
import { useParams } from "react-router-dom";


const BoardContentScreen = () => {
  const {boardId} = useParams();
  const [board,setBoard] = useState({});
  useEffect(()=>{
    fetchBoard(boardId);
  }, [])

  function fetchBoard(boardId) {
    // Make a GET request to fetch user data and boards
    return axios.get(`http://localhost:3030/api/boards/${boardId}`)
      .then(response => {
        // Extract the boards from the response data
        let board = response.data;
        setBoard(board);
        // Process the boards or return them for further use
        return board;
      })
      .catch(error => {
        // Handle errors
        console.error('Failed to fetch user data:', error);
        throw error;
      });
  }


  return (
    <div className="board-content">
      {board.lists && board.lists.map((list) => (
        <BoardList key={list.id} title={list.listTitle} cards={list.cards}/>
      ))}      
    </div>
  );
};
export default BoardContentScreen;
