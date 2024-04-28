import React, { useState } from "react";
import { useEffect } from "react";
import "./AddProf.css";
import File from "./data3.json";
import NavAdmin from "../../Components/AdminNav2/NavAdmin";
import axios from "axios";
// import { findByLabelText } from "@testing-library/react";

export default function AddUser() {
  const [data, setData] = useState([]);
  const [finalData, setFinalData] = useState({ userType: "Student" });
  useEffect(() => {
    // Add the class to the body element when the component mounts
    document.body.classList.add("PageBody");
    // Remove the class from the body element when the component unmounts
    setData(File);
    return () => document.body.classList.remove("PageBody");
  }, []);

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
    const url = "http://localhost/Projects/Oral Radiology/addUser.php";
    let fData = new FormData();
    Object.keys(finalData).forEach((key) => {
      fData.append(key, finalData[key]);
    });

    axios
      .post(url, fData)
      .then((res) => {
        console.log(res.data);
      })
      .catch((error) => console.log(error));
  }

  return (
    <>
      <NavAdmin open={true} />
      <div className="container AddProf">
        <h1 className="form-title">Add professor</h1>
        <hr className="title-line"></hr>
        <form action="" method="POST" onSubmit={handleSubmit}>
          <div className="main-user-info">{content}</div>
          <div className="main-user-info">
            <select
              name="Type"
              id="userType"
              required
              onChange={(e) => change("userType")}
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
