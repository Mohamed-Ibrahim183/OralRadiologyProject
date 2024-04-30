import React, { useEffect, useState } from "react";
import "./EditUser.css";
import Navbar from "../../Components/Navbar/Navbar";
import axios from "axios";
import { useParams } from "react-router-dom";
const EditUser = () => {
  const [data, setData] = useState({});
  const urlData = useParams();
  useEffect(() => {
    console.log("API");
    const url =
      "http://localhost/Projects/Oral Radiology/api.php/" + urlData.id;
    axios.get(url).then((res) => {
      console.log(res.data);
      setData(res.data);
      const keys = [
        "Id",
        "Username",
        "Password",
        "MSAId",
        "Name",
        "Email",
        "Type",
        "PersonalImage",
      ];
      keys.map((key) => {
        document.querySelector("#" + key).value = res.data[key] || "NONE";
        return null;
      });
    });
  }, [urlData]);

  function handleSave() {
    const url =
      "http://localhost/Projects/Oral Radiology/api.php/" + urlData.id;
    let fData = new FormData();
    Object.keys(data).map((ele) => {
      fData.append(ele, data[ele]);
      return null;
    });
    axios
      .put(url, data)
      .then((res) => console.log(res.data))
      .catch((error) => console.error(error));
  }

  function handleChange(name) {
    console.log(data);
    return function (event) {
      const value = event.target.value;
      setData((prev) => ({
        ...prev,
        [name]: value,
      }));
    };
  }

  return (
    <>
      <Navbar />
      <div className="editPage">
        <h2 className="title">Edit User ID={urlData.id}</h2>
        <div className="main">
          <div className="row">
            <span>Id</span>
            <input
              type="text"
              name="Id"
              id="Id"
              onChange={handleChange("Id")}
            />
          </div>
          <div className="row">
            <span>Username</span>
            <input
              type="text"
              name="Username"
              id="Username"
              onChange={handleChange("Username")}
            />
          </div>
          <div className="row">
            <span>Password</span>
            <input
              type="text"
              name="Password"
              id="Password"
              onChange={handleChange("Password")}
            />
          </div>
          <div className="row">
            <span>MSAId</span>
            <input
              type="text"
              name="MSAId"
              id="MSAId"
              onChange={handleChange("MSAId")}
            />
          </div>
          <div className="row">
            <span>Name</span>
            <input
              type="text"
              name="Name"
              id="Name"
              onChange={handleChange("Name")}
            />
          </div>
          <div className="row">
            <span>Email</span>
            <input
              type="text"
              name="Email"
              id="Email"
              onChange={handleChange("Email")}
            />
          </div>
          <div className="row">
            <span>Type</span>
            <input
              type="text"
              name="Type"
              id="Type"
              onChange={handleChange("Type")}
            />
          </div>
          <div className="row">
            <span>PersonalImage</span>
            <input
              type="text"
              name="PersonalImage"
              id="PersonalImage"
              onChange={handleChange("PersonalImage")}
            />
          </div>
          <button className="saveBTN" onClick={handleSave}>
            Save
          </button>
        </div>
      </div>
    </>
  );
};

export default EditUser;
