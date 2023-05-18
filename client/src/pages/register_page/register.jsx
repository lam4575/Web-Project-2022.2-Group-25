import React, { useState } from "react";
import "./register_style.css"

export const Register = (props) => {
    const { setCurrentForm } = props;
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(email);
    }

    return (
        <div className="container_register">
            <h1 id="trello">Trello</h1>
            <div className="register">
                <form className="form_register" onSubmit={handleSubmit}>
                    <label for="fullname" className="label">Fullname</label>
                    <input value={name} onChange={(e) => setName(e.target.value)} type="text" placeholder="Enter your fullname" className="input"/>
                    <label for="email" className="label">Email</label>
                    <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="Enter your email" className="input"/>
                    <label for="password" className="label">Password</label>
                    <input value={pass} onChange={(e) => setPass(e.target.value)} type="password" placeholder="Enter your password" className="input"/>
                    <button class="submit">Register</button>
                </form>
                <p>
                    <span className="account">Already have an account?</span>
                    <a href="#" class="link" onClick={() => setCurrentForm('login')}>Login</a>
                </p>
            </div>
        </div>
    )
}

