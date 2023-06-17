import React, { useState } from "react";
import "./login_style.css";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';


const Login = (props) => {
    const [username, setUsername] = useState('');
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

    const validation = (username, password) => {
        const username_pattern = /^[a-zA-Z0-9]+$/
        const password_pattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/
        
        if(username === "") {
            alert("Username should not be empty")
        }
        else if(password === "") {
            alert("Password should not be empty")
        }
        else if(!username_pattern.test(username)) {
            alert("Login Failed!")
        }
        else if(!password_pattern.test(password)) {
            alert("Login Failed!")
        }
        else {
            handleLogin(username, password)
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        validation(username, pass);
    }

    return (
        <div className="container_login">
            <h1 id="trello">Trello</h1>
            <div className="login">
                <form className="form_login" onSubmit={handleSubmit}>
                    <label for="username" className="label">Username</label>
                    <input value={username} onChange={(e) => setUsername(e.target.value)} type="username" placeholder="Enter your username" className="input"/>
                    <label for="password" className="label">Password</label>
                    <input value={pass} onChange={(e) => setPass(e.target.value)} type="password" placeholder="Enter your password" className="input"/>
                    <button className="submit">Login</button>
                </form>
                <p>
                    <span className="account">Don't have an account?</span>
                    <a href=""></a>
                    <a href="/register" className="link">Register</a>
                </p>
            </div>
        </div>
    )
}


export default Login;