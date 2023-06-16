import React, { useState } from "react";
import "./login_style.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

const Login = (props) => {
  const { setCurrentForm } = props;
  const [username, setUsername] = useState("");
  const [pass, setPass] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (username, password) => {
    try {
      const response = await axios.post("http://localhost:3030/api/login/", {
        username: username,
        password: password,
      });
      // Handle the API response here (success or error)
      const token = response.data.token;
      Cookies.set("token", token, { expires: 7 }); // Expires in 7 days
      //Routing to the profile page
      navigate("/boards");
    } catch (error) {
      // Handle any error that occurred during the API request
      alert("Login Failed!");
      console.log(error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleLogin(username, pass);
  };

  return (
    <div className="container_login">
      <h1 id="trello">Trello</h1>
      <div className="login">
        <form className="form_register" onSubmit={handleSubmit}>
          <label for="username" className="label">
            Username
          </label>
          <input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            type="username"
            placeholder="Enter your username"
            className="input"
          />
          <label for="password" className="label">
            Password
          </label>
          <input
            value={pass}
            onChange={(e) => setPass(e.target.value)}
            type="password"
            placeholder="Enter your password"
            className="input"
          />
          <button className="submit">Login</button>
        </form>
        <p>
          <span className="account">Don't have an account?</span>
          <a
            href="#"
            className="link"
            onClick={() => setCurrentForm("register")}
          >
            Register
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;
