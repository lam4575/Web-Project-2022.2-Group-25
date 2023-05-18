import React, { useState } from "react";
import "./login_style.css";

export const Login = (props) => {
    const {setCurrentForm} = props;
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(email);
    }

    return (
        
        <div className="container_login">
            <h1 id="trello">Trello</h1>
            <div className="login">
                <form className="form_register" onSubmit={handleSubmit}>
                    <label for="email" className="label">Email</label>
                    <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="Enter your email" className="input"/>
                    <label for="password" className="label">Password</label>
                    <input value={pass} onChange={(e) => setPass(e.target.value)} type="password" placeholder="Enter your password" className="input"/>
                    <button className="submit">Login</button>
                </form>
                <p>
                    <span className="account">Don't have an account?</span>
                    <a href="#" className="link" onClick={() => setCurrentForm('register')}>Register</a>
                </p>
            </div>
        </div>
    )
}
