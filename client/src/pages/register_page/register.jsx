import React, { useState } from "react";
import "./register_style.css";
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

    const handleRegister = async (firstName, lastName, username, email, password) => {
        try {
            const response = await axios.post('http://localhost:3030/api/users', {
                username: username,
                password: password,
                email: email,
                firstName: firstName,
                lastName: lastName,
            });
            // Handle the API response here (success or error)
            const token = response.data.token;
            Cookies.set('token', token, { expires: 7 }); // Expires in 7 days
            //Routing to the login page
            navigate('/login');
            const tokenCookie = Cookies.get('token');
            console.log(tokenCookie);
          } catch (error) {
            // Handle any error that occurred during the API request
            alert("Resgister Failed!");
            console.log(error);
          }
    } 

    const handleSubmit = (e) => {
        e.preventDefault();
        handleRegister(firstname, lastname, username, email, pass)
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

