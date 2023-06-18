import React, { useState } from "react";
import "./login_style.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

const Login = (props) => {
    const [username, setUsername] = useState('');
    const [pass, setPass] = useState('');

    const [errors, setErrors] = useState({});

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
        setErrors({})
        const username_pattern = /^[a-zA-Z0-9]+$/
        const password_pattern = /^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[@$!%*?&])[a-zA-Z\d@$!%*?&]{8,20}$/
        
        if(username === "") setErrors(previousState => {return { ...previousState, username: "Username should not be empty"}})
        else if(!username_pattern.test(username)) setErrors(previousState => {return { ...previousState, username: "Username just include a-z, A-Z and 0-9!"}})

        if(password === "") setErrors(previousState => {return { ...previousState, password: "Password should not be empty"}})
        else if(!password_pattern.test(password)) setErrors(previousState => {return { ...previousState, password: "Password must have a number, a letter and a special character!"}})
        
        if(!errors.username && !errors.password) handleLogin(username, password) 
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
                    {errors.username && <span className="text-danger">{errors.username}</span>}
                    <label for="password" className="label">Password</label>
                    <input value={pass} onChange={(e) => setPass(e.target.value)} type="password" placeholder="Enter your password" className="input"/>
                    {errors.password && <span className="text-danger">{errors.password}</span>}
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
