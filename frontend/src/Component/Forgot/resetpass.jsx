import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Reset() {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        if (password.length < 8) {
            setError('Password must be at least 8 characters long.');
        } else if (password !== confirmPassword) {
            setError('Passwords do not match.');
        } else {
            console.log('Password:', password);
            console.log('Confirm Password:', confirmPassword);
            setError('');
            navigate("/");
        }
    };
    
    

    return (
        <center>
            <div id="l">
                <div className="form1">
                    <h2 id='e'>Create new Password</h2>
                    <form onSubmit={handleSubmit}>
                        <label><b>New Password</b></label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Enter your new password"
                            className='inputbox'
                        /><br />
                        <label><b>Confirmed Password</b></label>
                        <input
                            type="password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            placeholder="Confirm your new password"
                            className='inputbox'
                        /><br /><br />
                        <button id='post' type="submit">Save Changes and Login</button>
                        {error && <p style={{ color: 'red' }}>{error}</p>}
                        <br /><br />
                    </form>
                </div>
            </div>
        </center>
    );
}

export default Reset