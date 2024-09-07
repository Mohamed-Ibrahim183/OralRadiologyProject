import React, { useContext, useEffect, useState } from "react";
import "./Login3.css";
import { ContextData } from "../../ContextData";
import { useNavigate } from "react-router-dom";
import { serverURL, userLogin } from "../../Slices/GeneralSlice";
import toast from "react-hot-toast";

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

    userLogin({
      identifier,
      password,
    })
      .then((res) => {
        // console.log(res.msg);
        if (typeof res.msg === "object") {
          if (res.msg.Id === undefined) throw new Error(res.msg.Error);

          toast(`Welcome ${res.msg.Name} to Oral Radiology System.`);
          const data = {
            userId: res.msg.Id,
            MSAId: res.msg.MSAId,
            Name: res.msg.Name,
            Email: res.msg.Email,
            Type: res.msg.Type,
            PersonalImage: serverURL + res.msg.PersonalImage,
          };
          Object.keys(data).forEach((key) =>
            sessionStorage.setItem(key, data[key])
          );
          setUserType(res.msg.Type);
          sessionStorage.setItem("full", JSON.stringify(res.msg));
          conData.dispatch({ type: "setUser", payload: res.msg });
        } else alert(res.msg);
      })
      .catch((err) => {
        document.getElementById("loginErrorMessage").textContent =
          "*" + err.message;
        alert(err.message);
        console.error("Login Error:", err);
      });
  }

  useEffect(() => {
    if (userType !== "") {
      Navigator(`/${userType}/Dashboard`);
    }
  }, [userType, Navigator]);

  return (
    <div className="noScroll container">
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

                <span id="loginErrorMessage" style={{ color: "red" }}></span>

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
