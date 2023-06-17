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

    const [errors, setErrors] = useState({})
    
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
        setErrors({})
        const name_pattern = /^[a-zA-Z]+$/
        const username_pattern = /^[a-zA-Z0-9]+$/
        const email_pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        const password_pattern = /^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[@$!%*?&])[a-zA-Z\d@$!%*?&]{8,20}$/
        
        if(firstname === "") setErrors(previousState => {return { ...previousState, firstname: "First name should not be empty"}})
        else if(!name_pattern.test(firstname)) setErrors(previousState => {return { ...previousState, firstname: "First name just include a-z, A-Z!"}})

        if(lastname === "") setErrors(previousState => {return { ...previousState, lastname: "Last name should not be empty"}})
        else if(!name_pattern.test(lastname)) setErrors(previousState => {return { ...previousState, lastname: "Last name just include a-z, A-Z!"}})

        if(username === "") setErrors(previousState => {return { ...previousState, username: "Username should not be empty"}})
        else if(!username_pattern.test(username)) setErrors(previousState => {return { ...previousState, username: "Username just include a-z, A-Z and 0-9!"}})

        if(email === "") setErrors(previousState => {return { ...previousState, email: "Email should not be empty"}})
        else if(!email_pattern.test(email)) setErrors(previousState => {return { ...previousState, email: "Register Failed!"}})

        if(password === "") setErrors(previousState => {return { ...previousState, password: "Password should not be empty"}})
        else if(!password_pattern.test(password)) setErrors(previousState => {return { ...previousState, password: "Password must have a number, a letter and a special character!"}})
        
        if(!errors.firstName && !errors.lastName && !errors.username && !errors.email && !errors.password) 
            handleRegister(firstname, lastname, username, email, password)
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
                    {errors.firstname && <span className="text-danger">{errors.firstname}</span>}
                    <label for="lastname" className="label">Last name</label>
                    <input value={lastname} onChange={(e) => setLastname(e.target.value)} type="text" placeholder="Enter your last name" className="input"/>
                    {errors.lastname && <span className="text-danger">{errors.lastname}</span>}
                    <label for="username" className="label">User name</label>
                    <input value={username} onChange={(e) => setUsername(e.target.value)} type="username" placeholder="Enter your username" className="input"/>
                    {errors.username && <span className="text-danger">{errors.username}</span>}
                    <label for="email" className="label">Email</label>
                    <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="Enter your email" className="input"/>
                    {errors.email && <span className="text-danger">{errors.email}</span>}
                    <label for="password" className="label">Password</label>
                    <input value={pass} onChange={(e) => setPass(e.target.value)} type="current-password" placeholder="Enter your password" className="input"/>
                    {errors.password && <span className="text-danger">{errors.password}</span>}
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

