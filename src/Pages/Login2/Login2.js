// Login2.js
import React, { useState } from 'react';
import "./Login2.css";
import img from './logo2.jpeg';

function Login2() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [passwordShown, setPasswordShown] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch('http://localhost/Projects/Oral Radiology/login.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password }),
      });
  
      const data = await response.json();
      if (data.redirect) {
        sessionStorage.setItem('userId', data.userId);  // Save el id 
        switch (data.usertype) {
          case 'Professor':
            window.location.href = `/ProfessorDB?userId=${data.userId}`;
            break;
          case 'Student':
            window.location.href = `/StudentDB?userId=${data.userId}`;
            break;
          default:
            setLoginError('Invalid user type');
            break;
        }
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
    <div className="app-container">
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
                left: 90,
                bottom: -7,
                background: 'transparent', 
                color: 'Black',
                border: 'none',
                cursor: 'pointer'
              }}>
              {passwordShown ? 'Hide' : 'Show'}
            </button>
          </div>
          <button type="submit" className='submit' >Log In</button>
        </form>
      </div>
    </div>
  );
}

export default Login2;
