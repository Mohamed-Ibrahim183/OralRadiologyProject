import React, { useEffect, useState } from "react";
import "./API.css";
import "./ADDGroup.css";
import { Navigate } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material";
import {
  DeleteGroup,
  getAllGroupsData,
  insertNewGroup,
} from "../../Slices/AdminSlice";

const AddGroup = () => {
  const [rows, setRows] = useState(0);
  const [render, setRender] = useState(1);
  const [groups, setGroups] = useState([]);

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
          <label htmlFor={`Start${index}`}>Start Time:</label>
          <input type="time" id={`Start${index}`} name={`Start${index}`} />
        </div>
        <div className="section">
          <label htmlFor={`End${index}`}>End Time:</label>
          <input type="time" id={`End${index}`} name={`End${index}`} />
        </div>
        <div className="section">
          <label htmlFor={`Room${index}`}>Room:</label>
          <input type="text" name={`Room${index}`} id={`Room${index}`} />
        </div>
      </div>
    );
  }

  async function handleSubmit(editFlag) {
    let isValid = true;
    let formDataCopy = [];
    if (editFlag === 2) {
      for (let i = 0; i < editingRows.length; i++) {
        const day = document.getElementById(`editDay${i}`).value;
        const Start = document.getElementById(`editStart${i}`).value;
        const End = document.getElementById(`editEnd${i}`).value;

        const Room = document.getElementById(`editRoom${i}`).value;
        if (
          day === "" ||
          Start === "" ||
          End === "" ||
          editingGroup.Name === "" ||
          Room === "" ||
          editingRows.length === 0
        ) {
          isValid = false;
          break;
        }

        formDataCopy[i] = { day, Start, End, Room };
      }
    } else {
      for (let i = 1; i < rows + 1; i++) {
        const day = document.getElementById(`Day${i}`).value;
        const Start = document.getElementById(`Start${i}`).value;
        const End = document.getElementById(`End${i}`).value;
        const Room = document.getElementById(`Room${i}`).value;
        if (
          day === "" ||
          Start === "" ||
          End === "" ||
          document.getElementById("GroupName").value === "" ||
          Room === "" ||
          rows === 0
        ) {
          isValid = false;
          break;
        }

        formDataCopy[i - 1] = { day, Start, End, Room };
      }
    }

    if (isValid && (editingRows != null || rows > 0)) {
      let fData = new FormData();

      editFlag === 1
        ? fData.append("Name", document.getElementById("GroupName").value)
        : fData.append("Name", editingGroup.Name);

      Object.keys(formDataCopy).map((ele) =>
        fData.append(ele, JSON.stringify(formDataCopy[ele]))
      );
      console.log(await insertNewGroup(fData));
      setRows(0);
      document.getElementById("GroupName").value = "";
      setRender(render + 1);
      fetchFirst();
      alert("The Group Saved Successfully");
    } else alert("Please fill in all fields.");
  }

  function handleEditSubmit() {
    Delete(editingGroupIndex);
    handleSubmit(2);
    setEditingGroup(null);
  }

  const fetchFirst = async () => setGroups(await getAllGroupsData());
  useEffect(() => {
    fetchFirst();
  }, [render]);

  if (sessionStorage["Type"] !== "Admin") {
    return <Navigate to="/" />;
  }

  async function Delete(index) {
    console.log(await DeleteGroup(index));
    setRender(render + 1);
    fetchFirst();
  }

  const content = groups.map((group, index) => {
    return (
      <tr key={group.Id}>
        <td>{group.Id}</td>
        <td>{group.Name || "-_-"}</td>
        {group.Slots[0] && (
          <React.Fragment key={group.Slots[0].Id}>
            <td> {group.Slots[0].StartTime}</td>
            <td> {group.Slots[0].EndTime}</td>
            <td> {group.Slots[0].Room}</td>
          </React.Fragment>
        )}
        <td>
          <button className="Del" onClick={() => Delete(group.Id)}>
            Delete
          </button>
          <button
            className="Edit"
            onClick={() => {
              setEditingGroup(group);
              setEditingRows(group.Slots);
              setEditingGroupIndex(group.Id);
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
        { Day: "", Start: "", End: "", Room: "" },
      ]);
    };

    const removeSlot = () => {
      if (editingRows.length > 0) {
        setEditingRows(editingRows.slice(0, -1));
      }
    };

    return (
      <div className="AddGroup">
        <h3>Editing Group {editingGroup.Name}</h3>
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
              <label htmlFor={`editStart${index}`}>Start:</label>
              <input
                type="time"
                id={`editStart${index}`}
                defaultValue={row.StartTime}
              />
            </div>
            <div className="section">
              <label htmlFor={`editEnd${index}`}>End:</label>
              <input
                type="time"
                id={`editEnd${index}`}
                defaultValue={row.EndTime}
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
      <ThemeProvider theme={Theme}>
        <div className="AddGroup">
          <table cellSpacing={20}>
            <thead>
              <tr>
                <th>#</th>
                <th>Group Name</th>
                <th>Start</th>
                <th>End</th>
                <th>Room</th>
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
