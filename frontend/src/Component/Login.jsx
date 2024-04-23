// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { Link } from "react-router-dom";
// import axios from "axios";
// axios.defaults.baseURL = "http://localhost:6500/";

// import "../App.css"

// const Login = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [emailError, setEmailError] = useState("");
//   const [passwordError, setPasswordError] = useState("");
//   const navigate = useNavigate();

//   const validateForm = () => {
//     let isValid = true;
//     if (!email || !/\S+@\S+\.\S+/.test(email)) {
//       setEmailError(alert("Please enter a valid email address"));
//       isValid = false;
//     } else {
//       setEmailError("");
//     }

//     if (!password || password.length < 6) {
//       setPasswordError(alert("Password must be at least 6 characters long"));
//       isValid = false;
//     } else {
//       setPasswordError("");
//     }

//     return isValid;
//   };

//   const handleLogin = async () => {
//     if (validateForm()) {
//       const response = await fetch("http://localhost:6500/user/login", {
//         method: "post",
//         body: JSON.stringify({ email, password }),
//         headers: {
//           "Content-Type": "application/json",
//         },
//       });
//       const result = await response.json();
//       if (result.name) {
//         localStorage.setItem("user", JSON.stringify(result));
//         navigate("/");
//       } else {
//         alert("Please enter correct details");
//       }
//     }

//   };

//   return (
//     <center>
//       <div id="i">
//         <div className="form1">
          
//           <h1 id="e">LOGIN</h1>
          
//           <label id="f">Email</label>
//           <br />
//           <input
//             className="inputbox"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             placeholder="Enter your email"
//           />
//           {emailError && <p style={{ color: "red" }}>{emailError}</p>}
//           <br />
//           <label id="f">Password</label>
//           <br />
//           <input
//             className="inputbox"
//             value={password}
//             type="password"
//             onChange={(e) => setPassword(e.target.value)}
//             placeholder="Enter your Password"
//           />
//           {passwordError && <p style={{ color: "red" }}>{passwordError}</p>}
//           <br />
//           <br />
//           <button id="h" className="btn" onClick={handleLogin} type="button">
//             Login
//           </button>
//           <p style={{ marginTop: "40px" }}>
//             Don't have an account? <Link style={{textDecoration:"none"}} to="/signup">Signup</Link>
//           </p>
//         </div>
//       </div>
//     </center>
//   );
// };

// export default Login;


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
        localStorage.setItem("user", JSON.stringify(result));
          navigate("/home");
      } catch (error) {
        console.error("Error:", error);
      }
    }
  };

  return (
    <center>
      <div id="i">
        <div className="form1">
          <h1 id="e">LOGIN</h1>
          <label id="f">Email</label>
          <br />
          <input
            className="inputbox"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
          />
          {emailError && <p style={{ color: "red" }}>{emailError}</p>}
          <br />
          <label id="f">Password</label>
          <br />
          <input
            className="inputbox"
            value={password}
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your Password"
          />
          {passwordError && <p style={{ color: "red" }}>{passwordError}</p>}
          <br />
          <br />
          <button id="h" className="btn" onClick={handleLogin} type="button">
            Login
          </button>
          <p style={{ marginTop: "40px" }}>
            Don't have an account? <Link style={{ textDecoration: "none" }} to="/signup">Signup</Link>
          </p>
        </div>
      </div>
    </center>
  );
};

export default Login;
