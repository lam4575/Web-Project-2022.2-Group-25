import React, { Component, useEffect, useState } from "react";
import axios from "axios";
import Cookies from 'js-cookie';
import "./WindownCard.css";
import { Slider, TextField, Button, Avatar } from '@mui/material';
import dayjs from 'dayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';



const WindownCard = ({ handleClose, card, members, listName }) => {
  const [watching, setWatching] = useState(card.watching);
  const [openCalendar, setOpenCalendar] = useState(false);
  const [dueDate, setDueDate] = useState(card.dueDate ? new Date(card.dueDate) : null);
  const [isEditingDes, setIsEditingDes] = useState(false);
  const [isEditingActivity, setIsEditingActivity] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [checkList, setChecklist] = useState(card.checklist ? card.checklist : 0);
  const [dateChange, setDateChange] = useState(null);
  const [des, setDes] = useState(card.des);
  const [comments, setComments] = useState([]);
  const [commentText, setCommentText] = useState("");

  

  const fetchComments = async () => {
    const token = Cookies.get('token');
    try {
      const response = await axios.get(`http://localhost:3030/api/cards/${card._id}/get-comments`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setComments(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchComments();
  }, [card._id]);


  const toggleEditingDes = () => setIsEditingDes(prevState => !prevState);
  const toggleEditingChecklist = () => {
    if (checkList === 0) {
      setChecklist(1);
    }
  }
  const toggleEditingActivity = () => setIsEditingActivity(prevState => !prevState);
  const updateWatching = () => {
    const token = Cookies.get('token');
    setWatching(prevWatching => !prevWatching); // use the previous state to toggle the value
    axios.patch(`http://localhost:3030/api/cards/${card._id}/update-card`, {
      watching: !watching // pass the updated value to the API call
    }, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).then((res) => {
      window.location.reload();
    }).catch(err => {
      console.log(err)
      alert("Failed to update card!");
    })
  }

const addComment = async (comment) => {
  const token = Cookies.get('token');
  try {
    await axios.post(`http://localhost:3030/api/cards/${card._id}/add-comment`, {
      text: comment
    }, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).then((res)=> {
      window.location.reload();
    }).catch(err => {
      console.log(err)
      alert("Failed to update card!");
    });
  } catch (error) {
    console.log(error);
  }
}
  

  const addDueDate = () => {
    if(dateChange === null) {
      setOpenCalendar(false);
      return;
    }
    const token = Cookies.get('token');
    axios.patch(`http://localhost:3030/api/cards/${card._id}/update-card`, {
      dueDate: new Date(dateChange.$d) // pass the updated value to the API call
    }, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).then((res) => {
      window.location.reload();
    }).catch(err => {
      console.log(err)
      alert("Failed to update card!");
    })
  }

  const updateDes = () => {
    const token = Cookies.get('token');
    const newDescription = des;
    axios.patch(`http://localhost:3030/api/cards/${card._id}/update-card`, {
      description: newDescription // pass the updated value to the API call
    }, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).then((res) => {
      window.location.reload();
    }).catch(err => {
      console.log(err)
      alert("Failed to update card!");
    })
  }
  const updateCheckList = () => {
    const token = Cookies.get('token');
    axios.patch(`http://localhost:3030/api/cards/${card._id}/update-card`, {
      checklist: checkList // pass the updated value to the API call
    }, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).then((res) => {
      window.location.reload();
    }).catch(err => {
      console.log(err)
      alert("Failed to update card!");
    })
  }

  return (
    <>
      {isVisible && (
        <div className="windown-card">
          <div className="card-detail">
            {/* Header */}
            <div className="windown-card-header">
              <div className="header-icon">
                <span className="material-symbols-outlined icon-header-card">
                  credit_card
                </span>
              </div>

              <div className="header-name">
                <div className="header-title">
                  <p className="name-inline">{ }Linh</p>
                </div>

                <div className="header-inline-card">
                  <p>in list <u>{listName}</u></p>
                </div>
              </div>
            </div>

            {/* Body */}
            <div className="windown-body">
              <div className="windown-card-content">
                {/*Data */}
                <div className="card-data">
                  <div className="card-data-detail notifi">
                    <div className="data-title">
                      <span className="title">Notifications</span>
                    </div>

                    <div className="data-btn">
                      <button
                        className="btn-watch"
                      >
                        <span className="material-symbols-outlined data-btn_icon">
                          visibility
                        </span>
                        {watching ? (
                          <div className="watching" onClick={updateWatching}>
                            <p className="watch-title">Watching</p>
                            <input type="checkbox" defaultChecked />
                          </div>
                        ) : (
                          <p className="watch-title" onClick={updateWatching}>Watch</p>
                        )}
                      </button>
                    </div>
                  </div>

                  {dueDate && <div className="card-data-detail due-date">
                    <div className="data-title">
                      <span className="title">Due date</span>
                    </div>
                    <div className="data-btn"> {dayjs(dueDate).format('YYYY-MM-DD/ HH:mm A')}  </div>
                  </div>}
                </div>

                {/* Description */}
                {<div className="">
                  <div className="card-item card-description">
                    <div className="card-icon">
                      <span className="material-symbols-outlined icon-detail">
                        description
                      </span>
                    </div>

                    <div className="card-item-content">
                      <div className="card-item-header">
                        <p className="title-header">Description</p>
                        <div className="header-button">
                          <button className="btn-header" onClick={toggleEditingDes}>Edit</button>
                        </div>
                      </div>
                    </div>
                  </div>
                  {isEditingDes && <div className="update">
                    <TextField label="Description" defaultValue={card.description ? card.description : ""}
                      onChange={(event) => setDes(event.target.value)} fullWidth />
                    <Button variant="contained" style={{ margin: '1rem 0 0 80%' }} onClick={updateDes}>
                      Update
                    </Button>
                  </div>}
                </div>}
                {/* Checklist */}
                {checkList !== 0 && <div className="">
                  <div className="card-item card-checklist">
                    <div className="card-icon">
                      <span className="material-symbols-outlined icon-detail">
                        select_check_box
                      </span>
                    </div>

                    <div className="card-item-content">
                      <div className="card-item-header">
                        <p className="title-header">Checklist</p>
                        <div className="header-button">
                          <button className="btn-header">Delete</button>
                        </div>
                      </div>
                    </div>
                  </div>
                  {<div className="update">
                    <Slider defaultValue={card.checklist ? card.checklist : 0}
                      value={checkList}
                      valueLabelDisplay="auto"
                      onChange={(event, newValue) => {
                        setChecklist(newValue);
                      }}
                      min={1}
                    />
                    <Button style={{ margin: '1rem 0 0 80%' }} variant="contained" onClick={updateCheckList}>Update</Button>
                  </div>}
                </div>
                }
                {/* Activity */}
                <div className="card-item card-activity">
                  <div className="card-icon">
                    <span className="material-symbols-outlined icon-detail">
                      mist
                    </span>
                  </div>

                  <div className="card-item-content">
                    <div className="card-item-header">
                      <p className="title-header">Activity</p>
                      <div className="header-button">
                        <button className="btn-header" onClick={toggleEditingActivity}>Show Detail</button>
                      </div>
                    </div>
                  </div>
                </div>
                {isEditingActivity && <div className="">
                  {comments.map(comment =>
                    <div className="comment">
                      <Avatar style={{ marginRight: '1rem' }}>{comment.createdBy.firstName[0] + comment.createdBy.lastName[0]}</Avatar>
                      <div className="comment-details">
                        <p className="username">{comment.createdBy.firstName + ' ' + comment.createdBy.lastName}</p>
                        <span className="timestamp">{dayjs(comment.createdAt).format('YYYY/MM/DD')}</span>
                        <span className="timestamp">{dayjs(comment.createdAt).format('HH:MM A')}</span>
                      </div>
                      <p className="comment-text">{comment.text}</p>
                    </div>
                  )}
                  <div className="update">
                    <TextField label="Comment" fullWidth onChange={(event) => setCommentText(event.target.value)}/>
                    <Button style={{ margin: '1rem 0 1rem 80%' }} variant="contained" onClick={() => addComment(commentText)}>Send</Button>
                  </div>
                </div>}
              </div>
              {/* SideBar */}
              <div className="windown-card-sidebar">
                <div className="add-to-card">
                  <p className="add-to-card-title">Add to card</p>
                  <div className="add-to-card-items">
                    <button className="add-card-item">
                      <span className="material-symbols-outlined add-card-item_icon">
                        person
                      </span>
                      <p className="add-card-item_content">Members</p>
                    </button>

                    <button className="add-card-item" onClick={toggleEditingChecklist}>
                      <span className="material-symbols-outlined add-card-item_icon">
                        select_check_box
                      </span>
                      <p className="add-card-item_content">Checklist</p>
                    </button>
                    <div style={{ position: "relative" }}>
                      <button
                        className="add-card-item"
                        onClick={() => setOpenCalendar(!openCalendar)}
                      >
                        <span className="material-symbols-outlined add-card-item_icon">
                          schedule
                        </span>
                        <p className="add-card-item_content">Dates</p>
                      </button>
                      {openCalendar && (
                        <div className="calendar">
                          <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DateTimePicker label="Pick date and time"
                              value={dateChange}
                              onChange={(date) => {
                                setDateChange(date);
                              }} />
                          </LocalizationProvider>
                          <div className="button-container">
                            <Button onClick={() => addDueDate()} >Save</Button>
                            <Button onClick={() => setOpenCalendar(false)}>Cancle</Button>
                          </div>

                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <div className="add-to-card">
                  <p className="add-to-card-title">Actions</p>
                  <div className="add-to-card-items"></div>
                </div>
              </div>
            </div>
          </div>

          {/* Back */}
          <div className="card-back">
            <button className="btn-back" onClick={handleClose}>
              <span className="material-symbols-outlined">close</span>
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default WindownCard;