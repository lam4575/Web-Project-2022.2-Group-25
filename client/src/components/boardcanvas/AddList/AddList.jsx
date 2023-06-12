import React from 'react'
import "./AddList.css"
import CloseIcon from '@mui/icons-material/Close';

function AddList() {
    return (
        <div className='js-add-list list-wrapper mod-add'>
            <form action="">
                {/* <a className='open-add-list js-open-add-list' href="">
                    <span>
                        <span className='icon-sm icon-add'></span>
                        Add another List
                    </span>
                </a> */}
                <input className="list-name-input" type="text" name="name" placeholder="Enter list title…" autocomplete="off" dir="auto" maxlength="512" />
                <div className='list-add-controls u-clearfix'>
                    <input className="nch-button nch-button--primary mod-list-add-button js-save-edit" type="submit" value="Add list" />
                    <a className="icon-lg js-cancel-edit" href="#" aria-label="Cancel list editing">
                        <CloseIcon/>
                    </a>
                </div>
            </form>
        </div>
    )
}

export default AddList