
import React, { Component, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import './signup.css';
import { Button, TextField } from "@mui/material";
import { response } from "express";

function Signup() {
    const navigate = useNavigate();
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleFirstNameChange = (event) => {
        setFirstName(event.target.value);
    }

    const handleLastNameChange = (event) => {
        setLastName(event.target.value);
    }

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    }

    const handleUsernameChange = (event) => {
        setUsername(event.target.value);
    }

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        axios.post('http://localhost:3030/api/users', {
            firstName,
            lastName,
            email,
            username,
            password
        })
            .then(response => {
                console.log(response.data);
                navigate('/login');
            })
            .catch(error => {
                console.log(error.status);
                if(error.status === 400) {
                    alert("Đã tồn tại tên tài khoản!");
                } else {
                    alert("Đăng ký thất bại!");
                }
            });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    return (
        <div className="box">
            <div className="signup-container">
                <h1>Signup</h1>
                    <TextField label="First Name" value={firstName} onChange={handleFirstNameChange} />
                    <br />
                    <TextField label="Last Name" value={lastName} onChange={handleLastNameChange} />
                    <br />
                    <TextField id="email-textfield" label="Email" type="email" value={email} onChange={handleEmailChange} inputProps={{ pattern: emailRegex }} error={!emailRegex.test(email) && email.length > 0} helperText={!emailRegex.test(email) && email.length > 0 ? 'Invalid email format' : ''}/>
                    <br />
                    <TextField label="Username" value={username} onChange={handleUsernameChange} />
                    <br />
                    <TextField label="Password" type="password" value={password} onChange={handlePasswordChange} />
                    <br />
                    <Button type="submit"  variant="contained" onClick={handleSubmit}>Signup</Button>
            </div>
        </div>

    );
}

export default Signup;



