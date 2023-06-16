import React, { useState } from "react";
import "./register_style.css";
import validation from "./register_validation.js"
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

const Register = (props) => {
    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        validation(firstname, lastname, username, email, pass);
    }

    return (
        <div className="container_register">
            <h1 id="trello">Trello</h1>
            <div className="register">
                <form className="form_register" onSubmit={handleSubmit}>
                    <label for="firstname" className="label">First name</label>
                    <input value={firstname} onChange={(e) => setFirstname(e.target.value)} type="text" placeholder="Enter your first name" className="input"/>
                    <label for="lastname" className="label">Last name</label>
                    <input value={lastname} onChange={(e) => setLastname(e.target.value)} type="text" placeholder="Enter your last name" className="input"/>
                    <label for="username" className="label">User name</label>
                    <input value={username} onChange={(e) => setUsername(e.target.value)} type="username" placeholder="Enter your username" className="input"/>
                    <label for="email" className="label">Email</label>
                    <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="Enter your email" className="input"/>
                    <label for="password" className="label">Password</label>
                    <input value={pass} onChange={(e) => setPass(e.target.value)} type="password" placeholder="Enter your password" className="input"/>
                    <button className="submit">Register</button>
                </form>
                <p>
                    <span className="account">Already have an account?</span>
                    <a href="/login" className="link">Login</a>
                </p>
            </div>
        </div>
    )
}

export default Register;

