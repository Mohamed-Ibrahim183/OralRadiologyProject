import React, { useState } from "react";
import "./Login3.css";
import Navbar from "../../Components/Navbar/Navbar";
import axios from "axios";

function Login3() {
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [passwordShown, setPasswordShown] = useState(false);

  function handleSubmit2(e) {
    e.preventDefault();
    if (identifier.trim() === "" || password.trim() === "") {
        alert("Identifier and Password must not be empty");
        return; // Return to prevent submission if fields are empty
    }

    const url = "http://localhost/Projects/OralRadiology/userLogic.php/Login";
    let fData = new FormData();
    fData.append("identifier", identifier);
    fData.append("password", password);

    console.log("Form Data:", identifier, password); // Log form data for debugging

    axios.post(url, fData)
        .then((res) => {
            console.log("Response Data:", res.data); // Log response data for debugging
            if (typeof res.data === "object") {
                sessionStorage.setItem("userId", res.data.Id);
                sessionStorage.setItem("MSAId", res.data.MSAId);
                sessionStorage.setItem("Name", res.data.Name);
                sessionStorage.setItem("Email", res.data.Email);
                sessionStorage.setItem("Type", res.data.Type);
                sessionStorage.setItem("PersonalImage", "http://localhost/Projects/OralRadiology/" + res.data.PersonalImage);
                window.location.href = `/Dashboard`;
            } else {
                alert(res.data); 
            }
        })
        .catch((err) => console.error("Login Error:", err));
}


  const togglePasswordVisibility = () => {
    setPasswordShown(!passwordShown);
  };

  return (
    <div className="noScroll">
      <Navbar />
      <div className="login3">
        <h1>Welcome to MSA Oral Radiology</h1>
        <div className="container" id="container">
          <div className="form-container sign-up-container">
            <form>
              <h2>Forgat Password?</h2>
              <span>Enter your MSA Email</span>
              <input type="email" placeholder="Email" />
              <button>Continue</button>
            </form>
          </div>
          <div className="form-container sign-in-container">
            <form onSubmit={handleSubmit2}>
              <h2>Sign in</h2>
              <span>Use Your MSA Account Details</span>
              <input
                type="text"
                placeholder="Email or MSA ID"
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
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
              <a href="#" id="forget" onClick={() => { /* handle forgot password logic */ }}>
                Forgot your password?
              </a>
              <button>Sign In</button>
            </form>
          </div>
          <div className="overlay-container">
            <div className="overlay">
              <div className="overlay-panel overlay-left">
                <h1>Welcome Back!</h1>
                <p>To connect please login with your personal info</p>
                <button type="submit" className="ghost submit" id="signIn">
                  Sign In
                </button>
              </div>
              <div className="overlay-panel overlay-right">
                <h1>Hello, Friend!</h1>
                <p>Enter your personal details and start journey with us</p>
                <button className="ghost" id="trouble" onClick={() => { /* handle trouble logging in */ }}>
                  Having Trouble Logging in?
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login3;
