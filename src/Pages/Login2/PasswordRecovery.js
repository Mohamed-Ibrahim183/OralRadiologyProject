import React, { useState } from 'react';

function PasswordRecovery({ onBackToLogin }) {
  const [email, setEmail] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('Recover password for:', email);
    // Add password recovery logic here
  };

  return (
    <div className="recovery-container">
      <form onSubmit={handleSubmit}>
        <h2>Password Recovery</h2>
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button type="submit" className='submit'>Recover Password</button>
        <button type="button" onClick={onBackToLogin}>Back to Login</button>
      </form>
    </div>
  );
}

export default PasswordRecovery;
