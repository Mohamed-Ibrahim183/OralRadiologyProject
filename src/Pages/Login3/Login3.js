
import React, { useState } from 'react';
import "./Login3.css";
import img from './logo2.jpeg';
import Navbar  from '../../Components/Navbar/Navbar';
import axios from "axios";

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
  // -> important for no scrolling
  document.body.style.overflow = "hidden"
  const [MSAId, setMSAId] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [passwordShown, setPasswordShown] = useState(false);

  function handleSubmit2(e) {
    e.preventDefault();
    const url = "http://localhost/Projects/OralRadiology/userLogic.php/Login";
    let fData = new FormData();
    fData.append("MSAId", MSAId);
    fData.append("Password", password);
    axios
      .post(url, fData)
      .then((res) => {
        if (typeof res.data === "object") {
          console.log(res.data);
          sessionStorage.setItem("userId", res.data.Id); // Save el id

          sessionStorage.setItem("MSAId", res.data.MSAId);
          sessionStorage.setItem("Name", res.data.Name);
          sessionStorage.setItem("Email", res.data.Email);
          sessionStorage.setItem("Type", res.data.Type);
          sessionStorage.setItem("PersonalImage", res.data.PersonalImage);

          // set Session
          switch (res.data.Type) {
            case "Professor":
              window.location.href = `/ProfessorDB?userId=${res.data.Id}`;
              break;
            case "Student":
              window.location.href = `/StudentDB?userId=${res.data.Id}`;
              break;
            default:
              setLoginError("Invalid user type");
              break;
          }
        } else {
          setLoginError(
            "Failed To Login Because of Error in Msa ID or Password"
          );
        }
      })
      .catch((res) => console.log(res.data));
  }
  

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
      <form >
        <h2>Forgat Password?</h2>
      
        <span>Enter your MSA Email</span>
    
        <input type="email" placeholder="Email" />
        <button>Continue</button>
      </form>
    </div>
    <div class="form-container sign-in-container">
      <form onSubmit={handleSubmit2}>
        <h2>Sign in</h2>
        
        <span>Use Your MSA Account Details</span>
          <input
            type="text"
            placeholder="Email or MSA ID"
            value={MSAId}
            onChange={(e) => setMSAId(e.target.value)}
            required
          />

        
        <input
              type={passwordShown ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
             <div style={{ position: "relative" }}>
              <button
              type="button"
              onClick={togglePasswordVisibility}
              style={{
                position: "absolute",
                left: 50,
                bottom: 10,
                background: "transparent",
                color: "Black",
                border: "none",
                cursor: "pointer",
              }}
            >
              {passwordShown ? "Hide" : "Show"}
            </button>
            </div>
        <a href="#">Forgot your password?</a>
      
        <button >Sign In</button>
      </form>
    </div>
    <div class="overlay-container">
      <div class="overlay">
        <div class="overlay-panel overlay-left">
          <h1>Welcome Back!</h1>
          <p>To connect please login with your personal info</p>
          
          <button type="submit" className="ghost submit" id="signIn" >Sign In</button>
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
