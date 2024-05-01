import React, { useState } from 'react';
import img from './logo2.jpeg';
function Loginni({ onRecovery }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('Login with:', username, password);
    // Add authentication logic here
  };

  return (
    <div className="login-container">
      <img src={img}></img>
      <form onSubmit={handleSubmit}>
        <h2>Login</h2>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit" className='submit'>Log In</button>
        <button type="button" onClick={onRecovery}>Forgot Password?</button>
      </form>
    </div>
  );
}

export default Loginni;
