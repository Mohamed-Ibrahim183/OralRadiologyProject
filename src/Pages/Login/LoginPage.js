import React, { useState } from 'react';
import './LoginPage.css'; 

function LoginPage() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');


    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(username, password);
    };

    return (
        <div className='monem-dentist'>
        <div className="login-container">
            <form onSubmit={handleSubmit} className="login-form">
                <div>
                    <label htmlFor="username">Username</label>
                    <input
                        type="text"
                        id="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <button type="submit">Log In</button>
            </form>
        </div>
        </div>
    );
}

export default LoginPage;
