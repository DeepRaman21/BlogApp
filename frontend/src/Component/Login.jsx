import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import axios from "axios";
import "../App.css";

axios.defaults.baseURL = "http://localhost:6500/";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const navigate = useNavigate();

  const validateForm = () => {
    let isValid = true;
    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      setEmailError("Please enter a valid email address");
      isValid = false;
    } else {
      setEmailError("");
    }

    if (!password || password.length < 6) {
      setPasswordError("Password must be at least 6 characters long");
      isValid = false;
    } else {
      setPasswordError("");
    }

    return isValid;
  };

  const handleLogin = async () => {
    if (validateForm()) {
      try {
        const response = await axios.post("/user/login", { email, password });
        const result = response.data;
        localStorage.setItem("token", result.token);
        localStorage.setItem("name",result.name)
          navigate("/");
      } catch (error) {
        console.error("Error:", error);
        alert("User not Found");
      }
    }
  };

  return (
    <center>
      <div id="l">
        <div className="form1">
          <h1 id="e">LOGIN</h1>
          <br />
          <input
            className="inputbox"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
          />
          {emailError && <p style={{ color: "red" }}>{emailError}</p>}
          <br />
          <input
            className="inputbox"
            value={password}
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your Password"
          />
          {passwordError && <p style={{ color: "red" }}>{passwordError}</p>}
          
          <Link className="forgot" to="/email">Forgot Password ..?</Link>
          <button style={{ marginTop: "15px" }} id="post" className="btn" onClick={handleLogin} type="button">
            Login
          </button>
          <p style={{ marginTop: "20px" }}>
            Don't have an account? <Link style={{ textDecoration: "none", color:"white" }} to="/signup">Signup</Link>
          </p>
        </div>
      </div>
    </center>
  );
};

export default Login;
