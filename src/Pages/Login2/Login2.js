import React, { useState } from 'react';
import Loginni from './Loginni';
import PasswordRecovery from './PasswordRecovery';
import "./Login2.css";

function Login2() {
  const [showRecovery, setShowRecovery] = useState(false);

  return (
    <div className="app-container">
      {showRecovery ? (
        <PasswordRecovery onBackToLogin={() => setShowRecovery(false)} />
      ) : (
        <Loginni onRecovery={() => setShowRecovery(true)} />
      )}
    </div>
  );
}

export default Login2;
