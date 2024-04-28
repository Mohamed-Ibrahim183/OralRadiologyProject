import "./cardloginn.css";
import img1 from "./img1.jpeg";
import { useState } from "react";
import axios from "axios";
// import { json, useInRouterContext } from "react-router-dom";
// import { useInRouterContext } from "react-router-dom";
export default function Cardloginn() {
  const [userInfo, setUserInfo] = useState({ username: "", password: "" });

  function handleSettingData(data) {
    sessionStorage.clear(); // Clear any existing session data

    for (const item of data) {
      // Loop through each object in the data array
      for (const key in item) {
        // Loop through each key-value pair in the object
        if (key !== "Password") {
          // Exclude sensitive password
          sessionStorage.setItem(key, JSON.stringify(item[key]));
        }
      }
    }
  }
  function handleSubmit() {
    if (userInfo["username"] !== "" && userInfo["password"] !== "") {
      const url = "http://localhost/Projects/Oral Radiology/user.php";
      let fData = new FormData();
      fData.append("username", userInfo["username"]);
      fData.append("password", userInfo["password"]);
      axios
        .post(url, fData)
        .then((res) => handleSettingData(res.data))
        .catch((error) => console.error(error));
    }
  }
  const handleChange = (event) => {
    setUserInfo({ ...userInfo, [event.target.id]: event.target.value });
  };

  return (
    <>
      <div className="cardloginn">
        <div className="login-wrapper">
          <div className="smallscreens">
            <img src={img1} alt="Oral Radiology" className="smalll" />
          </div>
          <div className="login-content">
            <div className="text-section">
              <h1>
                Welcome To
                <div className="titleblue"> Academic Oral Radiology</div>
              </h1>
              <p>
                Welcome to Academic Oral Radiology, your premier platform for
                student learning and assessment in cutting-edge oral radiology
                techniques. Upload your assignments and let our experienced
                professors provide personalized, constructive feedback to propel
                your skills to new heights.
              </p>
              <div className="login-form">
                <input
                  type="text"
                  placeholder="Username ..."
                  id="username"
                  onChange={handleChange}
                />
                <input
                  type="password"
                  placeholder="Password..."
                  id="password"
                  onChange={handleChange}
                />
                <button type="button" onClick={handleSubmit}>
                  Login
                </button>
              </div>
            </div>
            <div className="image-section">
              <img src={img1} alt="Oral Radiology" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
// export default Home2;
