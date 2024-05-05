// Login2.js
import React, { useState } from "react";
import "./Login2.css";
import img from "./logo2.jpeg";
import axios from "axios";

function Login2() {
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
    <div className="app-container">
      <div className="login-container">
        <img src={img} alt="logo"></img>

        <form onSubmit={handleSubmit2}>
          <h2>Login</h2>
          {loginError && <p className="error">{loginError}</p>}
          <input
            type="text"
            placeholder="MSAId"
            value={MSAId}
            onChange={(e) => setMSAId(e.target.value)}
            required
          />
          <div style={{ position: "relative" }}>
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
                position: "absolute",
                left: 90,
                bottom: -7,
                background: "transparent",
                color: "Black",
                border: "none",
                cursor: "pointer",
              }}
            >
              {passwordShown ? "Hide" : "Show"}
            </button>
          </div>
          <button type="submit" className="submit">
            Log In
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login2;
