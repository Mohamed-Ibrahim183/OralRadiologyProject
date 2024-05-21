import React, { useEffect, useState } from "react";
import "./API.css";
import "./ADDGroup.css";
import Navbar from "../../Components/Navbar/Navbar";
import axios from "axios";
import { Navigate } from "react-router-dom";

const AddGroup = () => {
  const [rows, setRows] = useState(0);
  const [render, setRender] = useState(1);
  const [groups, setGroups] = useState([]);

  const generateOptions = (start, end) => {
    const options = [];
    for (let i = start; i <= end; i++) {
      options.push(i);
    }
    return options;
  };

  function generateRow(index) {
    index += 1;
    return (
      <div className="row" key={index}>
        <div className="section">
          <label htmlFor={`Day${index}`}>Day:</label>
          <select name={`Day${index}`} id={`Day${index}`}>
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
          <label htmlFor={`Hour${index}`}>Hour:</label>
          <select name={`Hour${index}`} id={`Hour${index}`}>
            {generateOptions(0, 23).map((hour) => (
              <option key={hour}>{hour}</option>
            ))}
          </select>
        </div>
        <div className="section">
          <label htmlFor={`Duration${index}`}>Duration in Minutes:</label>
          <input
            type="number"
            name={`Duration${index}`}
            id={`Duration${index}`}
          />
        </div>
        <div className="section">
          <label htmlFor={`Minutes${index}`}>Minutes:</label>
          <input
            type="number"
            name={`Minutes${index}`}
            id={`Minutes${index}`}
          />
        </div>
        <div className="section">
          <label htmlFor={`Room${index}`}>Room:</label>
          <input type="text" name={`Room${index}`} id={`Room${index}`} />
        </div>
      </div>
    );
  }

  function handleSubmit() {
    let isValid = true;
    let formDataCopy = [];
    for (let i = 1; i < rows + 1; i++) {
      const day = document.getElementById(`Day${i}`).value;
      const hour = document.getElementById(`Hour${i}`).value;
      const duration = document.getElementById(`Duration${i}`).value;
      const minutes = document.getElementById(`Minutes${i}`).value;
      const Room = document.getElementById(`Room${i}`).value;
      if (
        day === "" ||
        hour === "" ||
        duration === "" ||
        minutes === "" ||
        document.getElementById("GroupName").value === "" ||
        Room === "" ||
        rows === 0
      ) {
        isValid = false;
        break;
      }

      formDataCopy[i - 1] = { day, hour, duration, minutes, Room };
    }
    console.log(rows);
    console.log(isValid);

    if (isValid) {
      const url = `http://localhost/Projects/OralRadiology/GroupLogic.php/Insert`;
      let fData = new FormData();
      fData.append("Name", document.getElementById("GroupName").value);
      Object.keys(formDataCopy).map((ele) => {
        fData.append(ele, JSON.stringify(formDataCopy[ele]));
        return null;
      });
      console.table(formDataCopy);
      axios
        .post(url, fData)
        .then((res) => console.log(` coming Back end ${res.data}`))
        .catch((error) => console.error(error));
      setRows(0);
      document.getElementById("GroupName").value = "";
      setRender(-render);
      fetchFirst();
    } else {
      console.log("Please fill in all fields.");
      alert("Please fill in all fields.");
    }
  }
  function fetchFirst() {
    const url = `http://localhost/Projects/OralRadiology/GroupLogic.php/Groups`;
    axios
      .get(url)
      .then((res) => {
        console.log(res.data);
        // Object.keys(res.data).forEach((e) => console.log(e));
        setGroups(res.data);
        // console.log(typeof res.data);
      })
      .catch((error) => console.error(error));
  }
  useEffect(() => {
    // get groups from data base
    async function s() {
      await setGroups({});
    }
    s();
    fetchFirst();
  }, [render]);
  if (sessionStorage["Type"] !== "Admin") {
    return <Navigate to="/" />;
  }
  function check(ele, key) {
    if (Array.isArray(ele) && ele.length > 0) {
      let s = "";
      s = ele.map((e) => {
        return e[key] + " ";
      });
      return s;
    }

    return "NO";
  }
  function Delete(index) {
    const url = `http://localhost/Projects/OralRadiology/GroupLogic.php/Delete`;
    let fData = new FormData();
    fData.append("id", index);
    axios
      .post(url, fData)
      .then((res) => {
        console.log(res.data);
      })
      .catch((error) => console.error(error));
    setRender(-render);
  }
  const content = Object.entries(groups).map(([key, group]) => {
    return (
      <tr key={key}>
        <td>{key}</td>
        <td>{group[0] || "no name"}</td>
        <td>{check(group.slice(1), "Day")}</td>
        <td>{check(group.slice(1), "Hour")}</td>
        <td>{check(group.slice(1), "Minute")}</td>
        <td>{check(group.slice(1), "DurationInMinutes")}</td>
        <td>{check(group.slice(1), "Room")}</td>
        <td>
          <button onClick={() => Delete(key)}>Delete</button>
        </td>
      </tr>
    );
  });

  return (
    <>
      <Navbar />
      <div className="AddGroup">
        <table cellSpacing={20}>
          <thead>
            <tr>
              <th>#</th>
              <th>Group Name</th>
              <th>Slots Days</th>
              <th>Slots Hours</th>
              <th>Slots Minutes</th>
              <th>Slots Duration</th>
              <th>Slots Room</th>
            </tr>
          </thead>
          <tbody>{content}</tbody>
        </table>
        <div className="section1">
          <label htmlFor="GroupName">Enter Group Name:</label>
          <input type="text" name="GroupName" id="GroupName" />
          <button className="NEW" onClick={() => setRows(rows + 1)}>
            Add New Slot
          </button>
        </div>
        <div className="main">
          {Array.from({ length: rows }, (_, index) => generateRow(index))}
          <div className="Buttons">
            <button
              className="MainButton sub"
              onClick={() => setRows(rows - 1)}
            >
              Remove Slot
            </button>
            <button className="MainButton sub" onClick={handleSubmit}>
              Submit
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddGroup;
