import React, {  useState } from "react";
import "./BoardList.css";
import Cards from "../Cards/Cards";
import axios from "axios";
import WindownCard from "../WindownCard/WindownCard";
import Cookies from 'js-cookie';

const BoardList = ({ board_id, list_id,  title , cards , members  }) => {
  const [popOver, setPopOver] = useState(false)
  const [cardText, setCardText] = useState('');
  const [editing, setEditing] = useState(false);
  const [titleheader, setTitleheader] = useState(title);
  console.log(cards)
  //set add card
  const [addcard, setAddcard] = useState(false);
  const handleAddCard = () => {
    setAddcard(true);
  };

  const addCard = () => {
    const token = Cookies.get('token'); // assuming the token is stored in a cookie named 'token'
    axios.post(`http://localhost:3030/api/boards/${board_id}/lists/${list_id}/create-card`, {
      cardTitle: cardText // assuming you want to send the card text as the request body
    }, {
      headers: {
        Authorization: `Bearer ${token}` // set the token as a Bearer token in the Authorization header
      }
    })
      .then(response => {
        window.location.reload(); 
      })
      .catch(error => {
        alert("Failed to create card!");
      });
  }
  const showPopOver = () => {
    setPopOver(!popOver)
  }

  const handleCloseCard = () => {
    setAddcard(false);
  };

  //set title
  const handleTitleClick = (e) => {
    setEditing(true);
  };

  const handleTitleChange = (e) => {
    setTitleheader(e.target.value);
  };

  const handleBlur = () => {
    setEditing(false);
  };

  return (
    <div className="js-list-content">
      <div className="list-header">
        <div className="list-header-target">
          {editing ? (
            <textarea
              className="title-area"
              rows={1}
              value={titleheader}
              onChange={handleTitleChange}
              onBlur={handleBlur}
              onClick={(e) => e.stopPropagation()}
            />
          ) : (
            <span className="title-header" dir="auto" onClick={handleTitleClick}>
              {titleheader}
            </span>
          )}
        </div>
        <div className="list-header-extras" onClick={showPopOver}>...</div>
      </div>

      <div className="list-cards">
        {cards.map((card) => {
          return <Cards card={card} members = {members} listName={title} ></Cards>
        })}
      </div>
      {addcard ? (
        <div className="card-composer-container add-container">
          <div className="card-content">
            <textarea className="content-title" id="" rows="5"
              value={cardText}
              onChange={(e) => setCardText(e.target.value)}></textarea>
          </div>
          <div className="add-card">
            <div className="add">
              <button className="btn-add" onClick={addCard}>
                Add card
              </button>
              <span
                className="material-symbols-outlined btn-icon"
                onClick={handleCloseCard}
              >
                close
              </span>
            </div>
            <span className="material-symbols-outlined">more_horiz</span>
          </div>
        </div>
      ) : (
        <div className="card-composer-container">
          <div className="open-card-composer">
            <div className="link-card" onClick={handleAddCard}>
              <span className="material-symbols-outlined link-card-title">
                add
              </span>
              <span>Add a card</span>
            </div>
          </div>

          <div className="card-template">
            <span className="material-symbols-outlined link-card-title">
              auto_awesome_motion
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default BoardList;
