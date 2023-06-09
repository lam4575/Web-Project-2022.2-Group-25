import React, { useState } from 'react'
import "./AddList.css"
import CloseIcon from '@mui/icons-material/Close';
import axios from "axios";
import Cookies from 'js-cookie';
import AddIcon from '@mui/icons-material/Add';


function AddList({ board_id, setLists, lists }) {
    const addList = (event) => {
        event.preventDefault();
        const token = Cookies.get('token'); // assuming the token is stored in a cookie named 'token'
        const listTitle = event.target.elements.name.value; // get the value of the input element with name "name"
        axios.post(`http://localhost:3030/api/boards/${board_id}/create-list`, {
            listTitle: listTitle
        }, {
            headers: {
                Authorization: `Bearer ${token}` // set the token as a Bearer token in the Authorization header
            }
        })
            .then(response => {
                let newList = response.data
                setLists([...lists, newList])
            })
            .catch(error => {
                console.log(error)
                alert("Failed to create list!");
            });
        event.target.reset();
    }
    const handleClick = () => {
        setDisplay(!display);
    }
    const [display, setDisplay] = useState(true);
    return (
        <div className='js-add-list list-wrapper mod-add'>
            <form onSubmit={addList}>
                {display && (<a className='open-add-list js-open-add-list' href="#" onClick={handleClick}>
                    <span>
                        <span className='icon-sm icon-add'>
                            <AddIcon />
                        </span>
                        Add another List
                    </span>
                </a>)}
                {!display && (<div>
                    <input className="list-name-input" type="text" name="name" placeholder="Enter list title…"/>
                    <div className='list-add-controls u-clearfix'>
                        <input className="nch-button nch-button--primary mod-list-add-button js-save-edit" type="submit" value="Add list" />
                        <a className="icon-lg js-cancel-edit" aria-label="Cancel list editing" onClick={handleClick}>
                            <CloseIcon />
                        </a>
                    </div>
                </div>)}
            </form>
        </div>
    )
}

export default AddList