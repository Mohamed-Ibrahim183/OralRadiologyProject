import React, { useContext, useEffect, useState } from "react";
import "./Login3.css";
import axios from "axios";
import { ContextData } from "../../ContextData";
import { useNavigate } from "react-router-dom";

function Login3() {
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [passwordShown, setPasswordShown] = useState(false);
  const conData = useContext(ContextData);
  const [userType, setUserType] = useState("");
  const Navigator = useNavigate();

  function handleSubmit2(e) {
    e.preventDefault();
    if (identifier.trim() === "" || password.trim() === "") {
      alert("Identifier and Password must not be empty");
      return;
    }

    const url = "http://localhost/Projects/OralRadiology/userLogic.php/Login";
    let fData = new FormData();
    fData.append("identifier", identifier);
    fData.append("password", password);

    axios
      .post(url, fData)
      .then((res) => {
        if (typeof res.data === "object") {
          sessionStorage.setItem("userId", res.data.Id);
          sessionStorage.setItem("MSAId", res.data.MSAId);
          sessionStorage.setItem("Name", res.data.Name);
          sessionStorage.setItem("Email", res.data.Email);
          sessionStorage.setItem("Type", res.data.Type);
          sessionStorage.setItem(
            "PersonalImage",
            "http://localhost/Projects/OralRadiology/" + res.data.PersonalImage
          );
          setUserType(res.data.Type);
          sessionStorage.setItem("full", JSON.stringify(res.data));
          conData.dispatch({ type: "setUser", payload: res.data });
        } else {
          alert(res.data);
        }
      })
      .catch((err) => {
        alert("Login Error With Server" + err.message);
        console.error("Login Error:", err);
      });
  }

  useEffect(() => {
    if (userType !== "") {
      Navigator(`/${userType}/Dashboard`);
    }
  }, [userType, Navigator]);

  const togglePasswordVisibility = () => {
    setPasswordShown(!passwordShown);
  };

  return (
    <div className="noScroll">
      <div className="login3">
        <h1>Welcome to MSA Oral Radiology</h1>
        <div className="container" id="container">
          <div className="bigContainer">
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
                  <button className="ghost" id="trouble">
                    Having Trouble Logging in?
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login3;
