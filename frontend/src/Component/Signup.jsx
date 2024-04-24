import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import "../App.css";
import axios from "axios";
axios.defaults.baseURL = "http://localhost:6500/";

const Signup = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [firstNameError, setFirstNameError] = useState("");
  const [lastNameError, setLastNameError] = useState("");
  const [userNameError, setUserNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const navigate = useNavigate();

  const validateForm = () => {
    let isValid = true;
    if (!firstName) {
      setFirstNameError("Please enter your first name");
      isValid = false;
    } else {
      setFirstNameError("");
    }

    if (!lastName) {
      setLastNameError("Please enter your last name");
      isValid = false;
    } else {
      setLastNameError("");
    }

    if (!userName) {
      setUserNameError("Please enter a username");
      isValid = false;
    } else {
      setUserNameError("");
    }

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

    if (password !== confirmPassword) {
      setConfirmPasswordError("Passwords do not match");
      isValid = false;
    } else {
      setConfirmPasswordError("");
    }

    return isValid;
  };

  const handleSignup = async () => {
    if (validateForm()) {
      try {
        const response = await axios.post("/user/create", {
          firstName,
          lastName,
          userName,
          email,
          password,
        });
        console.log(response.data.token);
        localStorage.setItem("token", response.data.token);
        setFirstName("");
        setLastName("");
        setUserName("");
        setEmail("");
        setPassword("");
        setConfirmPassword("");
        navigate("/");
      } catch (error) {
        console.error("Error:", error);
      }
    }
  };

  return (
    <center>
      <div id="i">
        <div className="form1">
          <h1 id="e">SIGNUP</h1>
          <br />
          <input
            className="inputbox"
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            placeholder="Enter your first name"
          />
          {firstNameError && <p style={{ color: "red" }}>{firstNameError}</p>}
          <br />
          <input
            className="inputbox"
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            placeholder="Enter your last name"
          />
          {lastNameError && <p style={{ color: "red" }}>{lastNameError}</p>}
          <br />
          <input
            className="inputbox"
            type="text"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            placeholder="Enter your username"
          />
          {userNameError && <p style={{ color: "red" }}>{userNameError}</p>}
          <br />
          <input
            className="inputbox"
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
          />
          {emailError && <p style={{ color: "red" }}>{emailError}</p>}
          <br />
          <input
            className="inputbox"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
          />
          {passwordError && <p style={{ color: "red" }}>{passwordError}</p>}
          <input
            className="inputbox"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Confirm your password"
          />
          {confirmPasswordError && (
            <p style={{ color: "red" }}>{confirmPasswordError}</p>
          )}
          <br />
          <button style={{ marginTop: "10px" }} id="post" onClick={handleSignup} type="button">
            Signup
          </button>
          <p style={{ marginTop: "15px" }}> 
            Already have an account?{" "}
            <Link style={{ textDecoration: "none",  color:"white" }} to="/">
              Login
            </Link>
          </p>
        </div>
      </div>
    </center>
  );
};

export default Signup;
