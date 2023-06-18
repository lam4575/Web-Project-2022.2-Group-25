import React, { useState } from "react";
import "./BoardList.css";
import Cards from "../Cards/Cards";
import axios from "axios";
import WindownCard from "../WindownCard/WindownCard";
import Cookies from 'js-cookie';
import PopOver from "../Pop-over/PopOver";
import { Popover } from "@material-ui/core";
import { width } from "@mui/system";
import { Button } from "@mui/material";
import EditOutlined from "@mui/icons-material/EditOutlined";

const BoardList = ({ board_id, list_id, title, card, members, lists, setLists }) => {
  const [popOver, setPopOver] = useState(false)
  const [cardText, setCardText] = useState('');
  const [editing, setEditing] = useState(false);
  const [titleheader, setTitleheader] = useState(title);
  const [cards, setCards] = useState(card);
  const [addcard, setAddcard] = useState(false);
  const [titleText, setTitleText] = useState(title);

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
        let newCard = response.data;
        setCards([...cards, newCard]);
        setCardText("");
        setAddcard(false);
      })
      .catch(error => {
        alert("Failed to create card!");
      });
  }
  const showPopOver = () => {
    setPopOver(prevState => !prevState)
  }

  const handleCloseCard = () => {
    setAddcard(false);
  };
  const handleBlur = () => {
    updateTitle();
    setTitleText(titleheader);
    setEditing(false);
  };

  const updateTitle = async () => {
    const token = Cookies.get('token');
    await axios.patch(`http://localhost:3030/api/lists/${list_id}/update-list`, {
      listTitle: titleText // pass the updated value to the API call
    }, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).then((res) => {
      setTitleheader(res.data.listTitle);
    }).catch(err => {
      console.log(err)
      alert("Failed to update card!");
    })
  }

  const deleteList = async () => {
    const token = Cookies.get('token');
    await axios
      .delete(`http://localhost:3030/api/lists/${list_id}/delete-list`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        const listId = res.data.listId;
        setLists(lists => (lists.filter(list => (
          list._id !== listId
        ))));
      })
      .catch((err) => {
        console.log(err);
        alert("Failed to delete card!");
      });
  };


  return (
    <div className="js-list-content">
      <div className="list-header">
        <div className="list-header-target">
          {editing ? (
            <textarea
              id="list-title-text"
              className="title-area"
              rows={1}
              onChange={(e) => { setTitleText(e.target.value) }}
              value={titleText}
              onBlur={handleBlur}
              onClick={(e) => e.stopPropagation()}
            />
          ) : (
            <span className="title-header" dir="auto">
              {titleheader}
            </span>
          )}
        </div>
        <div id="popover-list" className="list-header-extras" onClick={showPopOver}>
          <Button >
            <EditOutlined style={{ color: 'black' }} ></EditOutlined>
          </Button>
        </div>
      </div>
      {popOver && <PopOver
        handleClose={setPopOver}
        setAddCard={setAddcard}
        setEditTitle={setEditing}
        deleteList={deleteList}
        lists={lists}
        setLists={setLists}
      >
      </PopOver>}
      <div className="list-cards">
        {cards.map((card) => {
          return <Cards card={card} members={members} listName={title} list_id={list_id} setCards={setCards} cards={cards}></Cards>
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
