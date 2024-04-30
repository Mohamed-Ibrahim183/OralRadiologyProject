import React, { useState } from "react";
import "./API.css";
import Navbar from "../../Components/Navbar/Navbar";
const AddGroup = () => {
  // Function to generate an array of numbers from start to end
  const [rows, setRows] = useState(0);
  const generateOptions = (start, end) => {
    const options = [];
    for (let i = start; i <= end; i++) {
      options.push(i);
    }
    return options;
  };

  function generateRow() {
    return (
      <div className="row">
        <div className="section">
          <label htmlFor="Day">Day:</label>
          <select name="Day" id="Day">
            {[
              "Sunday",
              "Monday",
              "Tuesday",
              "Wednesday",
              "Thursday",
              "Friday",
              "Saturday",
            ].map((day) => (
              <option key={day}>{day}</option>
            ))}
          </select>
        </div>
        <div className="section">
          <label htmlFor="Hour">Hour:</label>
          <select name="Hour" id="Hour">
            {generateOptions(0, 23).map((hour) => (
              <option key={hour}>{hour}</option>
            ))}
          </select>
        </div>
        <div className="section">
          <label htmlFor="Duration">Duration in Minutes:</label>
          <input type="number" name="Duration" id="Duration" />
        </div>
        <div className="section">
          <label htmlFor="Minutes">Minutes:</label>
          <input type="number" name="Minutes" id="Minutes" />
        </div>
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <div className="AddGroup">
        <div className="section1">
          <label htmlFor="GroupName">Enter Group Name:</label>
          <input type="text" name="GroupName" id="GroupName" />
          <button className="NEW" onClick={() => setRows((prev) => prev + 1)}>
            Add New Slot
          </button>
        </div>
        <div className="main">
          {Array.from({ length: rows }, (_, index) => generateRow(index))}
        </div>
      </div>
    </>
  );
};

export default AddGroup;
