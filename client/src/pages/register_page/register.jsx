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

    const handleLogin = async (username, password) => {
        try {
            const response = await axios.post('http://localhost:3030/api/login/', {
              username: username,
              password: password
            });
            // Handle the API response here (success or error)
            const token = response.data.token;
            Cookies.set('token', token, { expires: 7 }); // Expires in 7 days
            //Routing to the profile page
            navigate('/boards');
            const tokenCookie = Cookies.get('token');
            console.log(tokenCookie);
          } catch (error) {
            // Handle any error that occurred during the API request
            alert("Login Failed!");
            console.log(error);
          }
    }

    const handleRegister = async (firstname, lastname, username, email, password) => {
        try {
            const response = await axios.post('http://localhost:3030/api/users/', {
                firstName : firstname, 
                lastName: lastname,
                username: username,
                email: email,
                password: password
            });
            // login
            handleLogin(response.data.username, response.data.password)
          } catch (error) {
            // Handle any error that occurred during the API request
            alert("Register Failed!");
            console.log(error);
          }
    }

    const validation = (firstname, lastname, username, email, password) => {
        const name_pattern = /^[a-zA-Z]+$/
        const username_pattern = /^[a-zA-Z0-9]+$/
        const email_pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        const password_pattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/
        
        if(firstname === "") {
            alert("First name should not be empty")
        }
        else if(lastname === "") {
            alert("Last name should not be empty")
        } 
        else if(username === "") {
            alert("Username should not be empty")
        }
        else if(email === "") {
            alert("Email should not be empty")
        }
        else if(password === "") {
            alert("Password should not be empty")
        }
        else if(!name_pattern.test(firstname)) {
            alert("First name just include a-z, A-Z!")
        }
        else if(!name_pattern.test(lastname)) {
            alert("Last name just include a-z, A-Z!")
        }
        else if(!username_pattern.test(username)) {
            alert("Username just include a-z, A-Z and 0-9!")
        }
        else if(!email_pattern.test(email)) {
            alert("Register Failed!")
        }
        else if(!password_pattern.test(password)) {
            alert("Register Failed!")
        }
        else {
            handleRegister(firstname, lastname, username, email, password)
        }
    }

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

