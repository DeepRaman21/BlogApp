import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import axios from "axios";
axios.defaults.baseURL = "http://localhost:6500/";

const Otp = () => {
    const [otp, setOtp] = useState(['', '', '', '']);
    const location = useLocation()
    const otp1 = location.state?.otp;
    const navigate = useNavigate();

    const [errors, setErrors] = useState({});

    const handleChange = (index, value) => {
        if (/^\d*$/.test(value)) {
            const newOtp = [...otp];
            newOtp[index] = value;
            setOtp(newOtp);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        let errors = {};
        const String = otp1.otp1.toString();
        const enteredOtp = otp.join('');
        if (!enteredOtp) {
            errors.password = "OTP is required";
        } else if (!/^\d{4}$/i.test(enteredOtp)) {
            errors.password = "OTP must be a 4-digit number";
        }

        setErrors(errors);

        if (Object.keys(errors).length === 0) {
            try {
                if (enteredOtp === String) {
                    navigate("/reset");
                }
                else { alert("Plese Enter the Correct One time Password") }
            } catch (error) {
                console.error("Error:", error);
                alert("User not found");
            }
        }
    };

    return (
        <center>
            <div id="l">
                <div className="form1">
                    <h2>Verification required</h2>
                    <br />
                    <p>To continue, complete this verification step. We've sent an <b>One time password</b> to the email.</p>
                    <form onSubmit={handleSubmit}>
                        <label id='otp'>Enter OTP</label>
                        <div className="form-group">
                            <br />
                            {otp.map((digit, index) => (
                                <input
                                    key={index}
                                    type="tel"
                                    value={digit}
                                    onChange={(e) => handleChange(index, e.target.value)}
                                    maxLength="1"
                                    className='inputbox1'
                                />
                            ))}
                            <br />
                            {errors.password && <span className="error">{errors.password}</span>}
                        </div><br />
                        <button id='post' type="submit" className='form_btn'>Verify OTP</button>
                        <br /><br />
                    </form>
                </div>
            </div>
        </center>
    );
};

export default Otp;