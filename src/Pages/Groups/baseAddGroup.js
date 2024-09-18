import React, { useEffect, useState } from "react";
import "./API.css";
import "./ADDGroup.css";
import { Navigate } from "react-router-dom";
import { createTheme, ThemeProvider, Button } from "@mui/material";
import {
  DeleteGroup,
  getAllGroupsData,
  insertNewGroup,
} from "../../Slices/AdminSlice";
import toast from "react-hot-toast";
import { validArray } from "../Controller";

const AddGroup = () => {
  const [rows, setRows] = useState(0);
  const [render, setRender] = useState(1);
  const [groups, setGroups] = useState([]);
  const [renderedRows, setRenderedRows] = useState([]);
  const [renderedEditRows, setRenderedEditRows] = useState([]);

  const [editingGroup, setEditingGroup] = useState(null);
  const [editingRows, setEditingRows] = useState([]);
  const [editingGroupIndex, setEditingGroupIndex] = useState(null);

  function generateRow(index) {
    index += 1;
    return (
      <div className={`row`} id={`row${index}`} key={index}>
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
        <div className="section">
          <Button
            variant="outlined"
            color="error"
            onClick={() => {
              // rows > 0 ? setRows(rows - 1) : setRows(rows);
              setRenderedRows((prev) => prev.filter((row) => row !== index));
              document.getElementById(`row${index}`).remove();
            }}
          >
            Remove Slot
          </Button>
        </div>
      </div>
    );
  }
  function checkFilledData(editFlag = "insert") {
    let isValid = true;
    if (editFlag === "edit") {
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
          Room === ""
        ) {
          isValid = false;
          break;
        }
      }
    }
    if (editFlag === "insert") {
      for (let i = 0; i < renderedRows.length; i++) {
        let index = renderedRows[i];
        const rowElement = document.getElementById(`row${index}`);
        // Skip the rows that have been deleted
        if (rowElement) {
          const day = document.getElementById(`Day${index}`).value;
          const Start = document.getElementById(`Start${index}`).value;
          const End = document.getElementById(`End${index}`).value;
          const Room = document.getElementById(`Room${index}`).value;

          if (
            day === "" ||
            Start === "" ||
            End === "" ||
            document.getElementById("GroupName").value === "" ||
            Room === ""
          )
            isValid = false;
        }
      }
    }
    return isValid;
  }

  async function handleSubmit(editFlag) {
    let isValid = true;
    let formDataCopy = [];

    if (editFlag === 2) {
      // console.log("editingRows:", editingRows);
      // return;
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
          Room === ""
        ) {
          isValid = false;
          break;
        }
        formDataCopy[i] = { day, Start, End, Room };
      }
    } else {
      let validRowsCount = 0;

      // console.log("renderedRows:", renderedRows);
      for (let i = 0; i < renderedRows.length; i++) {
        let index = renderedRows[i];
        const rowElement = document.getElementById(`row${index}`);
        // Skip the rows that have been deleted
        if (rowElement) {
          const day = document.getElementById(`Day${index}`).value;
          const Start = document.getElementById(`Start${index}`).value;
          const End = document.getElementById(`End${index}`).value;
          const Room = document.getElementById(`Room${index}`).value;

          if (
            day === "" ||
            Start === "" ||
            End === "" ||
            document.getElementById("GroupName").value === "" ||
            Room === ""
          ) {
            isValid = false;
            // break;
          }

          formDataCopy[validRowsCount] = { day, Start, End, Room };
          validRowsCount++;
        }
      }
    }
    if (isValid && (editingRows.length > 0 || renderedRows.length > 0)) {
      let fData = new FormData();

      if (editFlag === 1) {
        fData.append("Name", document.getElementById("GroupName").value);
      } else {
        fData.append("Name", editingGroup.Name);
      }

      formDataCopy.forEach((ele, index) => {
        fData.append(`Slot${index}`, JSON.stringify(ele));
      });

      insertNewGroup(fData)
        .then((res) => console.log(res.msg))
        .then((data) => console.log("Response from backend:", data))
        .catch((err) => console.error("Error:", err));

      setRows(0);
      setRenderedRows([]);
      document.getElementById("GroupName").value = "";
      setRender(render + 1);
      fetchFirst();
      alert("The Group Saved Successfully");
    } else {
      alert("Please fill in all fields.");
    }
  }

  function handleEditSubmit() {
    Delete(editingGroupIndex);
    handleSubmit(2);
    setEditingGroup(null);
  }

  function fetchFirst() {
    getAllGroupsData().then((res) => setGroups(res.msg));
  }
  useEffect(() => {
    fetchFirst();
  }, [render]);

  if (sessionStorage["Type"] !== "Admin") {
    return <Navigate to="/" />;
  }

  async function Delete(index) {
    DeleteGroup(index);
    setRender(render + 1);
    fetchFirst();
  }

  const content = validArray(groups)
    ? groups.map((group, index) => {
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
      })
    : "";

  const Theme = createTheme({
    palette: {
      mode: document.body.getAttribute("theme") === "Dark" ? "dark" : "light",
    },
  });

  const editGroupForm = () => {
    if (!editingGroup) return null;

    console.log("editingRows:", editingRows);
    console.log("editingGroup:", editingGroup);
    // console.log("editingGroup:", editingGroup);

    const addNewSlot = () => {
      if (renderedEditRows.length === 0) {
        setRenderedEditRows((prev) => [
          ...prev,
          ...Array.from({ length: editingRows.length }, (_, index) => index),
        ]);
      }
      setRenderedEditRows((prev) => [...prev, editingRows.length]);
      setEditingRows([
        ...editingRows,
        { Day: "", Start: "", End: "", Room: "" },
      ]);
    };
    // console.log(renderedEditRows);

    return (
      <div className="AddGroup">
        <h3>Editing Group {editingGroup.Name}</h3>
        {validArray(editingRows) &&
          editingRows.map((row, index) => (
            <div className={`row`} id={`row${index}`} key={index}>
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
              <div className="Action">
                <Button
                  variant="outlined"
                  color="error"
                  onClick={() => {
                    setRenderedEditRows((prev) =>
                      prev.filter((row) => row !== index)
                    );
                    console.log(editingRows);
                    // document.getElementById(`row${index}`).remove();
                    if (editingRows.length > 0) {
                      setEditingRows(editingRows.slice(0, -1));
                    }
                  }}
                >
                  Remove Slot
                </Button>
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
        </div>
      </div>
    );
  };

  // console.log("rows:", rows);
  return (
    <>
      <ThemeProvider theme={Theme}>
        <div className="AddGroup">
          {validArray(groups) ? (
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
          ) : (
            <p>There Is No Groups In Database</p>
          )}

          <div className="section1">
            <label htmlFor="GroupName">Enter Group Name:</label>
            <input type="text" name="GroupName" id="GroupName" />
            <button
              className="NEW"
              onClick={() => {
                if (checkFilledData("insert")) {
                  setRows(rows + 1);
                  setRenderedRows((prev) => [...prev, rows + 1]);
                } else
                  toast.error("You Must Fill In All Fields to Make a New One");
              }}
            >
              Add Slot
            </button>
          </div>
          <div className="main">
            {Array.from({ length: rows }, (_, index) => generateRow(index))}
            <div className="Buttons">
              {(renderedRows.length > 0 || rows > 0) && (
                <button
                  className="MainButton sub"
                  onClick={() => handleSubmit(1)}
                >
                  Submit
                </button>
              )}
            </div>
          </div>
        </div>
        {editGroupForm()}
      </ThemeProvider>
    </>
  );
};

export default AddGroup;
