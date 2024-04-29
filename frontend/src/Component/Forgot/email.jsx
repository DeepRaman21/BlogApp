import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Email() {
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const validateEmail = (email) => {
        const valid = /\S+@\S+\.\S+/;
        return valid.test(email);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validateEmail(email)) {
            console.log('Email is valid:', email);
            setError('');
            navigate("/otp")
        } else {
            setError('Please enter a valid email address.');
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