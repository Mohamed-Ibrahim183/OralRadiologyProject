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

  function handleInputChange(name) {
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
      toast(`User with MSAId:${finalData.MSAId} Inserted Successfully!`, {
        type: "success",
        icon: "👍",
      });
    } else {
      toast("Please Enter MSAId", {
        type: "error",
        icon: "🚫",
      });
    }
    setFinalData((prev) => ({ ...prev, MSAId: "" }));
  }

  return (
    <div className="container-add-prof">
      <h1 className="form-title">Add User</h1>
      <hr className="title-line" />
      <form action="" method="POST" onSubmit={handleSubmit}>
        <div className="user-info">
          <div className="input-box">
            <label htmlFor="MSAId">MSAId:</label>
            <input
              ref={inputField}
              type="text"
              id="MSAId"
              name="MSAId"
              placeholder="Enter MSAId"
              onChange={() => handleInputChange("MSAId")}
            />
          </div>
          <div className="input-box">
            <label htmlFor="Type">User Type:</label>
            <select
              id="Type"
              name="Type"
              onChange={() => handleInputChange("Type")}
              value={finalData.Type}
            >
              <option value="Student">Student</option>
              <option value="Professor">Professor</option>
              <option value="Admin">Admin</option>
            </select>
          </div>
        </div>
        <div className="submit-btn-container">
          <input type="submit" value="Add User" className="submit-btn" />
        </div>
      </form>
    </div>
  );
}
