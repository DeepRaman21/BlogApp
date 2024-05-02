import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';


import axios from "axios";
axios.defaults.baseURL = "http://localhost:6500/";


function Email() {
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const validateEmail = (email) => {
        const valid = /\S+@\S+\.\S+/;
        return valid.test(email);
    };

    const handleSubmit = async (e) => {
        // const otp = Math.floor((Math.random() * 9999) + 1);
        const otp1 = Math.floor(1000 + Math.random() * 10000);
        // console.log("OTP Generated:"+ otp1 );
        e.preventDefault();
        if (validateEmail(email)) {
            console.log('Email is valid:', email);
            setError('');

        } else {
            setError('Please enter a valid email address.');
        }
        if (Object.keys(error).length === 0) {
            try {
                const response = await axios.post('user/otp', { email, otp1 });
                console.log(response.data);
                navigate("/otp", { state: { otp: { otp1 } } })
            } catch (error) {
                console.error("Error:", error);
                alert("email not found")
            }

        }
    };


    return (
        <center>
            <div id="l">
                <div className="form1">
                    <form onSubmit={handleSubmit}>
                        <h1 id="e">Password Assistance</h1>
                        <p id='text'>Enter the email address associated with your Blogger account.</p>
                        <input
                            className="inputbox"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Enter your email"
                        /><br /><br />
                        <button id="post" type="submit">Continue</button>
                        {error && <p style={{ color: 'red' }}>{error}</p>}
                        <br /><br />
                    </form>
                </div>
            </div>
        </center>
    );
}

export default Email;