// import React, { useState } from "react";
import "./Login3.css";
// import img from "./logo2.jpeg";
import myScript from "./script.js";

function Login3() {
  return (
    <div className="login3">
      <div>
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
              <input placeholder="Email or MSA ID" />
              <input type="password" placeholder="Password" />
              <a href="">Forgot your password?</a>
              <button>Sign In</button>
            </form>
          </div>
          <div class="overlay-container">
            <div class="overlay">
              <div class="overlay-panel overlay-left">
                <h1>Welcome Back!</h1>
                <p>To connect please login with your personal info</p>
                <button class="ghost" id="signIn">
                  Sign In
                </button>
              </div>
              <div class="overlay-panel overlay-right">
                <h1>Hello, Friend!</h1>
                <p>Enter your personal details and start journey with us</p>
                <button class="ghost" id="signUp">
                  Having Trouble Login in ?
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
myScript.async = true;
export default Login3;
