import React, { useState } from "react";
import { useEffect } from "react";
import "./Edit.css";
import File from "./data3.json";
import NavAdmin from "../../Components/AdminNav2/NavAdmin";
import axios from "axios";
import { useParams } from "react-router-dom";
import Navbar from "../../Components/Navbar/Navbar";

export default function EditUser() {
  const [data, setData] = useState([]);
  const [finalData, setFinalData] = useState({ userType: "Student" });
  const urlData = useParams();
  useEffect(() => {
    setData(File);
    const url =
      "http://localhost/Projects/Oral Radiology/api.php/" + urlData.id;
    axios.get(url).then((res) => {
      setFinalData(res.data);
    });
  }, [urlData.id]);
  useEffect(() => {
    return () => console.log();
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
          value={finalData[ele.name] || ""}
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
    const url =
      "http://localhost/Projects/Oral Radiology/api.php/" + urlData.id;
    let fData = new FormData();
    Object.keys(finalData).forEach((key) => {
      fData.append(key, finalData[key]);
    });

    axios
      .put(url, fData)
      .then((res) => {
        console.log(res.data);
      })
      .catch((error) => console.log(error));
  }

  return (
    <>
      <Navbar />
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
