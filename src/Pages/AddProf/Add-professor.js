import React, { useState } from "react";
import { useEffect } from "react";
import "./AddProf.css";
import File from "./data3.json";
import { Navigate } from "react-router-dom";
import { insertNewUser } from "../../Slices/AdminSlice";

export default function AddUser() {
  const [data, setData] = useState([]);
  const [finalData, setFinalData] = useState({ Type: "Student" });
  useEffect(() => {
    setData(File);
  }, []);

  if (sessionStorage["Type"] !== "Admin") {
    return <Navigate to="/" />;
  }

  const content = data.map(function (ele) {
    return (
      <div className="user-input-box" key={ele.name}>
        <label htmlFor={ele.name}>{ele.text}:</label>
        <input
          type={ele.type}
          id={ele.name}
          name={ele.name}
          placeholder={ele.placeholder}
          onChange={(e) => change(ele.name)}
        />
      </div>
    );
  });
  function change(name) {
    setFinalData((prev) => ({
      ...prev,
      [name]: document.getElementById(name).value,
    }));
  }
  function handleSubmit(e) {
    e.preventDefault();
    let fData = new FormData();
    Object.keys(finalData).forEach((key) => fData.append(key, finalData[key]));
    insertNewUser(fData).then((res) => console.log(res.msg));
  }

  return (
    <>
      <div className="container AddProf">
        <h1 className="form-title">Add User</h1>
        <hr className="title-line"></hr>
        <form action="" method="POST" onSubmit={handleSubmit}>
          <div className="main-user-info">{content}</div>
          <div className="main-user-info">
            <select
              name="Type"
              id="Type"
              required
              onChange={(e) => change("Type")}
            >
              <option value="Student">Student</option>
              <option value="Professor">Professor</option>
              <option value="Admin">Admin</option>
            </select>
          </div>

          <input type="submit" value="Add User" />
        </form>
      </div>
    </>
  );
}
