import React, { useRef, useState } from "react";

import "./AddProf.css";

import { Navigate } from "react-router-dom";
import { insertByMSAId } from "../../Slices/AdminSlice";
import toast from "react-hot-toast";

export default function AddUser() {
  const [finalData, setFinalData] = useState({ Type: "Student" });
  const inputField = useRef();
  if (sessionStorage["Type"] !== "Admin") {
    return <Navigate to="/" />;
  }
  function change(name) {
    setFinalData((prev) => ({
      ...prev,
      [name]: document.getElementById(name).value,
    }));
  }
  function handleSubmit(e) {
    e.preventDefault();
    if (finalData.MSAId) {
      insertByMSAId(finalData);
      inputField.current.value = "";
      toast(
        `User with MSAId:${finalData.MSAId}  Inserted To Database Successfully!`,
        {
          Type: "Success",
          icon: "👍",
        }
      );
    } else {
      toast("Please Enter MSAId", {
        type: "error",
        icon: "🚫",
      });
    }
    setFinalData((prev) => ({
      ...prev,
      MSAId: "", // Clear MSAId but keep Type as "Student" or the selected option
    }));
  }

  return (
    <>
      <div className="container AddProf">
        <h1 className="form-title">Add User</h1>
        <hr className="title-line"></hr>
        <form action="" method="POST" onSubmit={handleSubmit}>
          <div className="main-user-info">
            <div className="user-input-box">
              <label htmlFor="MSAId">MSAId:</label>
              <input
                ref={inputField}
                type="text"
                id="MSAId"
                name="MSAId"
                placeholder="Enter MSAId"
                onChange={(e) => change("MSAId")}
              />
            </div>
          </div>
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
