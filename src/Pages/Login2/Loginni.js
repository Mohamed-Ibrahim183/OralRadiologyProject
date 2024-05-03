import React, { useState } from 'react';
import axios from 'axios';
import img from './logo2.jpeg';

function Loginni({ onRecovery }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [passwordShown, setPasswordShown] = useState(false); 

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch('http://localhost/Projects/Oral_Radiology/login.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password }),
      });
  
      const data = await response.json();
      if (data.redirect) {
        window.location.href = `/${data.redirect}`;
      } else {
        setLoginError(data.error || 'Failed to login, please check your credentials.');
      }
    } catch (error) {
      console.error('Login failed:', error);
      setLoginError('Failed to login, please check your server connection.');
    }
  };
  

  const togglePasswordVisibility = () => {
    setPasswordShown(!passwordShown);
  };

  return (
    <div className="login-container">
      <img src={img} alt="logo"></img>
      <form onSubmit={handleSubmit}>
        <h2>Login</h2>
        {loginError && <p className="error">{loginError}</p>}
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <div style={{ position: 'relative' }}>
          <input
            type={passwordShown ? "text" : "password"}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button 
            type="button" 
            onClick={togglePasswordVisibility} 
            style={{
              position: 'absolute', 
              left:180,
              bottom: 12,
              background: 'transparent', 
              color: 'Black',
              width:0,
              height:20,
              cursor: 'pointer'
            }}>
            {passwordShown ? 'Hide' : 'Show'}
          </button>
        </div>
        <button type="submit" className='submit'>Log In</button>
        <button type="button" onClick={onRecovery}>Forgot Password?</button>
      </form>
    </div>
  );
}

export default Loginni;