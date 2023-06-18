import React, { Component, useEffect, useState } from "react";
import axios from "axios";
import Cookies from 'js-cookie';
import "./WindownCard.css";
import { Slider, TextField, Button, Avatar } from '@mui/material';
import dayjs from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import 'dayjs/locale/vi';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import timezone from 'dayjs/plugin/timezone';
import { Box, Popover } from "@material-ui/core";
import AttachFileIcon from '@mui/icons-material/AttachFile';
import AttachFile from "@mui/icons-material/AttachFile";
import DownloadIcon from '@mui/icons-material/Download';


const WindownCard =
  ({ handleClose, card, members, listName, list_id,
    setCards, cards,
    dueDate_p, setDueDate_p,
    watching_p, setWatching_p,
    commentNum_p, setCommentNum_p
  }) => {
    const [watching, setWatching] = useState(watching_p);
    const [openCalendar, setOpenCalendar] = useState(false);
    const [dueDate, setDueDate] = useState(card.dueDate ? new Date(card.dueDate) : null);
    const [isEditingDes, setIsEditingDes] = useState(false);
    const [isEditingActivity, setIsEditingActivity] = useState(false);
    const [isVisible, setIsVisible] = useState(true);
    const [checkList, setChecklist] = useState(card.checklist ? card.checklist : 0);
    const [dateChange, setDateChange] = useState(null);
    const [des, setDes] = useState(card.description);
    const [comments, setComments] = useState([]);
    const [commentText, setCommentText] = useState("");
    const [open, setOpen] = useState(false);
    const [attachFile, setAttachFile] = useState(false);
    const [files, setFiles] = useState([]);
    const [visibleFiles, setVisibleFiles] = useState([]);
    const [numFilesToShow, setNumFilesToShow] = useState(2);
    const [cardTitle, setCardTitle] = useState(card.cardTitle)

    dayjs.extend(timezone);


    console.log(card);

    const handleClosePopover = () => {
      setOpen(false);
    }
    const handleClickPopover = () => {
      setOpen(true);
    }
    const handleFileUpload = (event) => {
      const files = event.target.files;
    };

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
    }, []);
    const handleLoadMore = () => {
      setNumFilesToShow((prevNum) => prevNum + 2);
    };
    const fetchCard = async () => {
      const token = Cookies.get('token');
      try {
        const response = await axios.get(`http://localhost:3030/api/cards/${card._id}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setFiles(response.data.files);
      } catch (error) {
        console.log(error);
      }
    };
    const sendWatchingEmail = async (message) => {
      const token = Cookies.get("token");
      try {
        const payload = {
          subject: `Notice about ${cardTitle}` ,
          content: message
        };
        const response = await axios.post('http://localhost:3030/api/cards/648f29a1fbcdccb69972bac4/send-watching', payload, {
          headers:{
            Authorization: `Bearer ${token}`
          }
        });
      } catch (error) {
        console.error(error);
      }
    };
    useEffect(() => {
      fetchCard();
    }, []);


    const toggleEditingDes = () => setIsEditingDes(prevState => !prevState);
    const toggleEditingChecklist = () => {
      if (checkList === 0) {
        setChecklist(1);
      }
    }
    const toggleEditingActivity = () => setIsEditingActivity(prevState => !prevState);
    const updateWatching = () => {
      const token = Cookies.get('token');
      const updatedWatching = !watching; // Calculate the updated value
      axios
        .post(`http://localhost:3030/api/cards/${card._id}/add-watching`,{},
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }) // Pass the userId in the request body
        .then((res) => {
          setWatching(updatedWatching); // Update the state with the updated value
          setWatching_p(updatedWatching);
        })
        .catch((err) => {
          console.log(err);
          alert('Failed to update card!');
        });
    };
    const updateTitle = () => {
      const token = Cookies.get('token');
      const title = document.getElementById("outlined-basic").value;
      axios.patch(`http://localhost:3030/api/cards/${card._id}/update-card`, {
        cardTitle: title// pass the updated value to the API call
      }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }).then((res) => {
        setCardTitle(document.getElementById("outlined-basic").value);
        sendWatchingEmail(`Title of ${cardTitle} has been changed to ${title}`);
      }).catch(err => {
        console.log(err)
        alert("Failed to update card!");
      })
    }
    const deleteCard = async () => {
      const token = Cookies.get('token');
      await axios
        .delete(`http://localhost:3030/api/lists/${list_id}/cards/${card._id}/delete-card`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          // Function to remove the deleted card from the cards array
          const updatedCards = cards.filter((c) => c._id !== card._id);
          handleClose();
          setCards(updatedCards);
          sendWatchingEmail(`${cardTitle} has been deleted!`);
        })
        .catch((err) => {
          console.log(err);
          alert("Failed to delete card!");
        });
    };


    const addComment = async (comment) => {
      const token = Cookies.get('token');
      try {
        await axios.post(`http://localhost:3030/api/cards/${card._id}/add-comment`, {
          text: comment
        }, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }).then((res) => {
          let comment = res.data;
          setComments([...comments, comment]);
          setCommentNum_p(commentNum_p => commentNum_p + 1)
        }).catch(err => {
          console.log(err)
          alert("Failed to add card!");
        });
      } catch (error) {
        console.log(error);
      }
    }


    const addDueDate = () => {
      if (dateChange === null) {
        setOpenCalendar(false);
        return;
      }
      const newDate = new Date(dateChange.$d);
      const token = Cookies.get('token');
      axios.patch(`http://localhost:3030/api/cards/${card._id}/update-card`, {
        dueDate: newDate // pass the updated value to the API call
      }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }).then((res) => {
        setDueDate(newDate);
        setDueDate_p(newDate);
        setOpenCalendar(false);
        sendWatchingEmail(`${cardTitle} has been been added a new Duedate!`);
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
        setDes(newDescription);
        alert(`Update description of ${res.data.cardTitle} success!`);
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
        fetchCard();
        sendWatchingEmail(`${cardTitle} has added a new checklist!`);
      }).catch(err => {
        console.log(err)
        alert("Failed to update card!");
      })
    }


    function handleSubmitFile() {
      const token = Cookies.get('token');
      // Get the file from the input element
      let file = document.querySelector("input[type=file]").files[0];

      // Create a new FormData object
      let formData = new FormData();

      // Append the file to the formData object
      formData.append("demo", file);

      // Specify the url
      let url = `http://localhost:3030/api/cards/${card._id}/files/send-file`;

      // Make the post request with the formData object
      axios.post(
        url, formData, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
        .then(response => {

        sendWatchingEmail(`${cardTitle} has been added a new file!`);
        }) // Print the data
        .catch(error => console.error(error)); // Handle errors

      // Close the popover
      setAttachFile(false);
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
                    <p className="name-inline">{cardTitle}</p>
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
                      <TextField label="Description" defaultValue={des}
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
                          <span className="timestamp">{dayjs(comment.createdAt).format('DD/MM/YYYY')}</span>
                          <span className="timestamp">{dayjs(comment.createdAt).format('HH:mm A')}</span>
                        </div>
                        <p className="comment-text">{comment.text}</p>
                      </div>
                    )}
                    <div className="update">
                      <TextField label="Comment" fullWidth onChange={(event) => setCommentText(event.target.value)} />
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
                        <button
                          className="add-card-item"
                          id="attach-file-btn"
                          onClick={() => { setAttachFile(true) }}
                        >
                          <AttachFile></AttachFile>
                          <p className="add-card-item_content">Attach File</p>
                        </button>
                        <Popover
                          open={attachFile}
                          onClose={() => { setAttachFile(false) }}
                          anchorEl={document.getElementById("attach-file-btn")}
                          anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
                        >
                          <div className="" style={{ padding: '1rem' }} >
                            <h4>Choose file to attach</h4>
                            <input type="file" onChange={handleFileUpload} />
                          </div>
                          <Button onClick={() => { handleSubmitFile() }}>Attach</Button>
                          <Button onClick={() => { setAttachFile(false) }}>Cancle</Button>
                        </Popover>
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
                    <div className="add-to-card-items">
                      <div className="add-to-card">
                        <div className="add-to-card-items">
                          <button id="edit-card-btn" className="add-card-item" onClick={handleClickPopover}>
                            <EditOutlinedIcon className="material-symbols-outlined add-card-item_icon">
                              person
                            </EditOutlinedIcon>
                            <p className="add-card-item_content">Edit card title</p>
                          </button>
                          <Popover
                            open={open}
                            anchorEl={document.getElementById("edit-card-btn")}
                            anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
                            onClose={handleClosePopover}
                          >
                            <div className="" style={{ padding: '1rem' }}>
                              <TextField id="outlined-basic" label="Nhập tiêu đề mới cho thẻ"></TextField>
                              <div className="btn-containner" style={{ display: "flex", justifyContent: "space-between", marginTop: "0.5rem" }}>
                                <Button onClick={updateTitle}>Save</Button>
                                <Button onClick={handleClosePopover}>Cancle</Button>
                              </div>
                            </div>
                          </Popover>
                          <button className="add-card-item" onClick={deleteCard}>
                            <DeleteOutlineOutlinedIcon className="material-symbols-outlined add-card-item_icon">
                              person
                            </DeleteOutlineOutlinedIcon>
                            <p className="add-card-item_content">Delete card</p>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="add-to-card">

                    <p className="add-to-card-title">
                      File
                    </p>
                    {files.slice(0, numFilesToShow).map((file) => (
                      <Box className="download-item" key={file.id}>
                        <form action={file.URL} target="blank" method="GET" >
                        <button type="submit" className="download-link">
                          <DownloadIcon></DownloadIcon>
                          {file.name.length < 20 ?  file.name : file.name.slice(0,20) + "..."}
                        </button>

                        {/* <div className="download-link">
                            <a href={file.URL} download={file.name}>
                              <DownloadIcon></DownloadIcon>
                              {file.name}
                            </a>
                          </div> */}
                      </form>
                        <div className="time-upload">
                          <p>Uploaded by {file.owner.username}</p>
                          <p>{dayjs(file.createdAt).format("DD/MM/YYYY h:mm A")}</p>
                        </div>
                      </Box>
                    ))}
                    {numFilesToShow < files.length && (
                      <Button onClick={handleLoadMore}>Load more</Button>
                    )}
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