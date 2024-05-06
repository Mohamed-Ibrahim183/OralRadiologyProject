
import React, { useState } from 'react';
import "./Login3.css";
import img from './logo2.jpeg';
import Navbar  from '../../Components/Navbar/Navbar';



function script() {
  const signUpButton = document.getElementById('signUp');
  const signInButton = document.getElementById('signIn');
  const container = document.getElementById('container');
  
  if(signUpButton){
  signUpButton.addEventListener('click', () => {
    container.classList.add("right-panel-active");
  });
  }

  if(signInButton){
  signInButton.addEventListener('click', () => {
    container.classList.remove("right-panel-active");
  });
  }
}

// myScript.async=true;
// myScript.call();
function Login3() {
  const [MSAId, setMSAId] = useState('');
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
        body: JSON.stringify({ MSAId, password }),
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
    
    <div >
      <Navbar />
      <div className='login3'>
    
  <h1>Welcome to MSA Oral Radiology</h1>
  <div class="container" id="container">
    <div class="form-container sign-up-container">
      <form action="#">
        <h2>Forgat Password?</h2>
      
        <span>Enter your MSA Email</span>
    
        <input type="email" placeholder="Email" />
        <button>Continue</button>
      </form>
    </div>
    <div class="form-container sign-in-container">
      <form action="#">
        <h2>Sign in</h2>
        
        <span>Use Your MSA Account Details</span>
        <input  placeholder="Email or MSA ID" />
        <input type="password" placeholder="Password" />
        <a href="#">Forgot your password?</a>
        <button >Sign In</button>
      </form>
    </div>
    <div class="overlay-container">
      <div class="overlay">
        <div class="overlay-panel overlay-left">
          <h1>Welcome Back!</h1>
          <p>To connect please login with your personal info</p>
          <button class="ghost" id="signIn" >Sign In</button>
        </div>
        <div class="overlay-panel overlay-right">
          <h1>Hello, Friend!</h1>
          <p>Enter your personal details and start journey with us</p>
          <button class="ghost" id="signUp" onClick={script} >Having Trouble Loggin in ?</button>
        </div>
      </div>
    </div>
  </div>
      </div>
    </div>
  );
}

export default Login3;
