import React, { useEffect, useState } from "react";
import "./API.css";
import "./ADDGroup.css";
import Navbar from "../../Components/Navbar/Navbar";
import axios from "axios";
import { Navigate } from "react-router-dom";
// import Button from "@mui/material/Button";
import {
  // Box,
  createTheme,
  // Modal,
  ThemeProvider,
  // Typography,
} from "@mui/material";

const AddGroup = () => {
  const [rows, setRows] = useState(0);
  const [render, setRender] = useState(1);
  const [groups, setGroups] = useState([]);
  // const [modalOpen, setModalOpen] = useState(false);
  // const [group, setGroup] = useState({});
  const [editingGroup, setEditingGroup] = useState(null);
  const [editingRows, setEditingRows] = useState([]);
  const [editingGroupIndex, setEditingGroupIndex] = useState(null);

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

  function handleSubmit(editFlag) {
    let isValid = true;
    let formDataCopy = [];
    if (editFlag === 2) {
      for (let i = 0; i < editingRows.length; i++) {
        const day = document.getElementById(`editDay${i}`).value;
        const hour = document.getElementById(`editHour${i}`).value;
        const duration = document.getElementById(`editDuration${i}`).value;
        const minutes = document.getElementById(`editMinutes${i}`).value;
        const Room = document.getElementById(`editRoom${i}`).value;
        if (
          day === "" ||
          hour === "" ||
          duration === "" ||
          minutes === "" ||
          editingGroup[0] === "" ||
          Room === "" ||
          editingRows === 0
        ) {
          isValid = false;
          break;
        }

        formDataCopy[i] = { day, hour, duration, minutes, Room };
      }
    } else {
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
    }

    if (isValid && (editingRows != null || rows > 0)) {
      const url = `http://localhost/Projects/OralRadiology/GroupLogic.php/Insert`;
      let fData = new FormData();

      editFlag === 1
        ? fData.append("Name", document.getElementById("GroupName").value)
        : fData.append("Name", editingGroup[0]);

      Object.keys(formDataCopy).map((ele) => {
        fData.append(ele, JSON.stringify(formDataCopy[ele]));
        return null;
      });
      axios
        .post(url, fData)
        .then((res) => console.log(`${res.data}`))
        .catch((error) => console.error(error));
      setRows(0);
      document.getElementById("GroupName").value = "";
      setRender(render + 1);
      fetchFirst();
      alert("The Group Saved Successfully");
    } else {
      console.log("Please fill in all fields.");
      alert("Please fill in all fields.");
    }
  }

  function handleEditSubmit() {
    // Logic for submitting edited group data
    // Object.keys(groups).forEach((ele) => {
    //   // Delete(ele);
    // });
    Delete(editingGroupIndex);
    handleSubmit(2);
    setEditingGroup(null);
    // console.log("editingGroup:", editingGroup);

    // console.log("editingGroupIndex:", editingGroupIndex);
    // alert("Submit the edited group logic here");
  }

  function fetchFirst() {
    const url = `http://localhost/Projects/OralRadiology/GroupLogic.php/Groups`;
    axios
      .get(url)
      .then((res) => {
        setGroups(res.data);
      })
      .catch((error) => console.error(error));
  }

  useEffect(() => {
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
    setRender(render + 1);
    fetchFirst();
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
          <button className="Del" onClick={() => Delete(key)}>
            Delete
          </button>
          <button
            className="Edit"
            onClick={() => {
              setEditingGroup(group);
              setEditingRows(group.slice(1));
              setEditingGroupIndex(key);
            }}
          >
            Edit
          </button>
        </td>
      </tr>
    );
  });

  const Theme = createTheme({
    palette: {
      mode: document.body.getAttribute("theme") === "Dark" ? "dark" : "light",
    },
  });

  const editGroupForm = () => {
    if (!editingGroup) return null;

    const addNewSlot = () => {
      setEditingRows([
        ...editingRows,
        { Day: "", Hour: "", DurationInMinutes: "", Minute: "", Room: "" },
      ]);
    };

    const removeSlot = () => {
      if (editingRows.length > 0) {
        setEditingRows(editingRows.slice(0, -1));
      }
    };

    return (
      <div className="AddGroup">
        <h3>Editing Group {editingGroup[0]}</h3>
        {editingRows.map((row, index) => (
          <div className="row" key={index}>
            <div className="section">
              <label htmlFor={`editDay${index}`}>Day:</label>
              <select
                name={`editDay${index}`}
                id={`editDay${index}`}
                defaultValue={row.Day}
              >
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
              <label htmlFor={`editHour${index}`}>Hour:</label>
              <select
                name={`editHour${index}`}
                id={`editHour${index}`}
                defaultValue={row.Hour}
              >
                {generateOptions(0, 23).map((hour) => (
                  <option key={hour}>{hour}</option>
                ))}
              </select>
            </div>
            <div className="section">
              <label htmlFor={`editDuration${index}`}>
                Duration in Minutes:
              </label>
              <input
                type="number"
                name={`editDuration${index}`}
                id={`editDuration${index}`}
                defaultValue={row.DurationInMinutes}
              />
            </div>
            <div className="section">
              <label htmlFor={`editMinutes${index}`}>Minutes:</label>
              <input
                type="number"
                name={`editMinutes${index}`}
                id={`editMinutes${index}`}
                defaultValue={row.Minute}
              />
            </div>
            <div className="section">
              <label htmlFor={`editRoom${index}`}>Room:</label>
              <input
                type="text"
                name={`editRoom${index}`}
                id={`editRoom${index}`}
                defaultValue={row.Room}
              />
            </div>
          </div>
        ))}
        <div className="Buttons">
          <button className="MainButton sub" onClick={handleEditSubmit}>
            Save Changes
          </button>
          <button
            className="MainButton sub"
            onClick={() => setEditingGroup(null)}
          >
            Cancel
          </button>
          <button className="MainButton sub" onClick={addNewSlot}>
            Add New Slot
          </button>
          <button className="MainButton sub" onClick={removeSlot}>
            Remove Slot
          </button>
        </div>
      </div>
    );
  };

  return (
    <>
      <Navbar />
      <ThemeProvider theme={Theme}>
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
                <th>Actions</th>
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
                onClick={() => (rows > 0 ? setRows(rows - 1) : setRows(rows))}
              >
                Remove Slot
              </button>
              <button
                className="MainButton sub"
                onClick={() => handleSubmit(1)}
              >
                Submit
              </button>
            </div>
          </div>
        </div>
        {editGroupForm()}
      </ThemeProvider>
    </>
  );
};

export default AddGroup;
