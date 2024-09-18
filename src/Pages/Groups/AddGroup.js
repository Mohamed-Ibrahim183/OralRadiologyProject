import React, { useEffect, useReducer, useState } from "react";
import {
  DeleteGroup,
  getAllGroupsData,
  insertNewGroup,
} from "../../Slices/AdminSlice";
import { validArray } from "../Controller";
import { Button } from "@mui/material";
import "./API.css";
import "./ADDGroup.css";
import toast from "react-hot-toast";
import { Navigate } from "react-router-dom";

const initialState = {
  groups: [],
  editingGroup: {},
  slots: [],
  renderGroups: 0,
};
const AddGroup2 = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [lastIndex, setLastIndex] = useState(0);

  // console.log("once");

  function reducer(state, action) {
    switch (action.type) {
      case "setGroups":
        return {
          ...state,
          groups: action.payload,
        };
      case "setEditingGroup":
        return { ...state, editingGroup: action.payload };
      case "cancelEdit":
        return { ...state, editingGroup: {} };
      case "addSlot":
        return { ...state, slots: [...state.slots, action.payload] };
      case "removeSlot":
        return {
          ...state,
          slots: state.slots.filter((slot) => slot.id !== action.id), // Use id instead of index
        };
      case "clearSlots":
        return { ...state, slots: [], renderGroups: state.renderGroups + 1 };
      case "clearEdit":
        return {
          ...state,
          renderGroups: state.renderGroups + 1,
          editingGroup: {},
        };
      case "render":
        return { ...state, renderGroups: state.renderGroups + 1 };
      default:
        return { ...state, renderGroups: state.renderGroups + 1 };
    }
  }
  function handleSubmitGroup(type = "insert") {
    let isValid = true;
    let formDataCopy = [];

    if (type === "insert") {
      let validRowsCount = 0;
      for (let i = 0; i < state.slots.length; i++) {
        const index = i;
        const rowElement = document.getElementById(`row${index}`);
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

          formDataCopy[validRowsCount] = { day, Start, End, Room };
          validRowsCount++;
        }
      }
    }
    if (isValid && state.slots.length > 0) {
      let fData = new FormData();

      if (type === "insert")
        fData.append("Name", document.getElementById("GroupName").value);
      // if (type === "edit") fData.append("Name", editingGroup.Name);

      formDataCopy.forEach((ele, index) => {
        fData.append(`Slot${index}`, JSON.stringify(ele));
      });

      insertNewGroup(fData);
      dispatch({ type: "clearSlots" });
      document.getElementById("GroupName").value = "";
      toast.success("Group Saved Successfully");
      getAllGroupsData().then((res) =>
        dispatch({ type: "setGroups", payload: res.msg })
      );
    } else toast.error("Please Fill In All Fields");
  }

  useEffect(() => {
    getAllGroupsData().then((res) =>
      dispatch({ type: "setGroups", payload: res.msg })
    );
  }, [state.renderGroups]);

  function DeleteSelectedGroup(index) {
    DeleteGroup(index);
    dispatch({ type: "render" });
  }

  // Function to add a new slot
  function addNewSlot() {
    if (checkFilledData("insert")) {
      const currentTime = new Date();
      const hoursToAdd = 1;

      // Format current time as "HH:MM" (24-hour format)
      const startTime = currentTime.toTimeString().slice(0, 5);

      // Add `hoursToAdd` to the current time to get the end time
      const endTime = new Date(
        currentTime.getTime() + hoursToAdd * 60 * 60 * 1000
      )
        .toTimeString()
        .slice(0, 5);

      // Generate a unique id for each slot
      const uniqueId = new Date().getTime() + Math.random();

      dispatch({
        type: "addSlot",
        payload: {
          id: uniqueId,
          index: lastIndex,
          day: "",
          start: startTime,
          end: endTime,
          room: "",
        },
      });
      setLastIndex((prev) => prev + 1);
    } else {
      toast.error("You Must Fill In All Fields to Make a New One");
    }
  }

  // console.log("state.slots:", state.slots);

  // Function to generate slot rows
  function generateRow(slot, index) {
    return (
      <div className={`row`} id={`row${index}`} key={slot.id}>
        <div className="section">
          <label htmlFor={`Day${index}`}>Day:</label>
          <select
            name={`Day${index}`}
            id={`Day${index}`}
            defaultValue={slot.day || ""}
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
          <label htmlFor={`Start${index}`}>Start Time:</label>
          <input
            type="time"
            id={`Start${index}`}
            name={`Start${index}`}
            defaultValue={slot.start}
          />
        </div>
        <div className="section">
          <label htmlFor={`End${index}`}>End Time:</label>
          <input
            type="time"
            id={`End${index}`}
            name={`End${index}`}
            defaultValue={slot.end}
          />
        </div>
        <div className="section">
          <label htmlFor={`Room${index}`}>Room:</label>
          <input
            type="text"
            name={`Room${index}`}
            id={`Room${index}`}
            defaultValue={slot.room}
          />
        </div>
        <div className="section">
          <Button
            variant="outlined"
            color="error"
            onClick={() => dispatch({ type: "removeSlot", id: slot.id })}
          >
            Remove Slot
          </Button>
        </div>
      </div>
    );
  }

  // Function to check filled data
  function checkFilledData(editFlag = "insert") {
    let isValid = true;
    if (editFlag === "insert") {
      state.slots.forEach((_, index) => {
        const day = document.getElementById(`Day${index}`).value;
        const start = document.getElementById(`Start${index}`).value;
        const end = document.getElementById(`End${index}`).value;
        const room = document.getElementById(`Room${index}`).value;

        if (!day || !start || !end || !room) {
          isValid = false;
        }
      });
    }
    return isValid;
  }
  if (sessionStorage["Type"] !== "Admin") return <Navigate to="/" />;

  return (
    <>
      <div className="AddGroup">
        {validArray(state.groups) ? (
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
            <tbody>
              {state.groups.map((group) => (
                <tr key={group.Id}>
                  <td>{group.Id}</td>
                  <td>{group.Name || "-_-"}</td>
                  {group.Slots[0] && (
                    <React.Fragment key={group.Slots[0].Id}>
                      <td>{group.Slots[0].StartTime}</td>
                      <td>{group.Slots[0].EndTime}</td>
                      <td>{group.Slots[0].Room}</td>
                    </React.Fragment>
                  )}
                  <td>
                    <button
                      className="Del"
                      onClick={() => DeleteSelectedGroup(group.Id)}
                    >
                      Delete
                    </button>
                    <button
                      className="Edit"
                      onClick={() => {
                        dispatch({ type: "setEditingGroup", payload: group });
                      }}
                    >
                      Edit
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>There Is No Groups In Database</p>
        )}

        <div className="section1">
          <label htmlFor="GroupName">Enter Group Name:</label>
          <input type="text" name="GroupName" id="GroupName" />
          <button className="NEW" onClick={addNewSlot}>
            Add Slot
          </button>
        </div>
        <div className="main">
          {state.slots.map((slot, index) => generateRow(slot, index))}

          <div className="Buttons">
            <button
              className="MainButton sub"
              onClick={() => handleSubmitGroup("insert")}
            >
              Submit
            </button>
          </div>
        </div>
      </div>

      {state.editingGroup.Id && (
        <EditSection state={state} dispatch={dispatch} />
      )}
    </>
  );
};

function EditSection({ state, dispatch }) {
  const [oldGroupSlots, setOldGroupSlots] = useState([]);

  function checkValidInputs(type = "edit") {
    let isValid = true;
    for (let i = 0; i < oldGroupSlots.length; i++) {
      const day = document.getElementById(`editDay${i}`).value;
      const Start = document.getElementById(`editStart${i}`).value;
      const End = document.getElementById(`editEnd${i}`).value;
      const Room = document.getElementById(`editRoom${i}`).value;

      if (day === "" || Start === "" || End === "" || Room === "")
        isValid = false;
    }
    return isValid;
  }
  function handleSubmitEditedGroup() {
    DeleteGroup(state.editingGroup.Id);
    let isValid = true;
    let formDataCopy = [];
    for (let i = 0; i < oldGroupSlots.length; i++) {
      const day = document.getElementById(`editDay${i}`).value;
      const Start = document.getElementById(`editStart${i}`).value;
      const End = document.getElementById(`editEnd${i}`).value;
      const Room = document.getElementById(`editRoom${i}`).value;

      if (day === "" || Start === "" || End === "" || Room === "")
        isValid = false;

      formDataCopy[i] = { day, Start, End, Room };
    }
    if (isValid && oldGroupSlots.length > 0) {
      let fData = new FormData();
      fData.append("Name", state.editingGroup.Name);
      formDataCopy.forEach((ele, index) =>
        fData.append(`Slot${index}`, JSON.stringify(ele))
      );
      insertNewGroup(fData);
      dispatch({ type: "clearEdit" });
      toast.success("The Group Updated Successfully");
    } else toast.error("Please Fill In ALl Fields");
  }

  useEffect(() => {
    if (state.editingGroup.Slots) {
      const slotsWithIds = state.editingGroup.Slots.map((slot) => ({
        ...slot,
        id: slot.Id || new Date().getTime() + Math.random(), // Ensure every slot has a unique id
      }));
      setOldGroupSlots(slotsWithIds);
    }
  }, [state.editingGroup]);

  if (!state.editingGroup.Id || !validArray(oldGroupSlots)) return null;

  return (
    <div className="AddGroup">
      <h3>Editing Group {state.editingGroup.Name}</h3>
      <>
        {oldGroupSlots.map((row, index) => (
          <div className={`row`} id={`row${index}`} key={row.id}>
            <div className="section">
              <label htmlFor={`editDay${index}`}>Day:</label>
              <select
                name={`editDay${index}`}
                id={`editDay${index}`}
                defaultValue={row.Day || ""}
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
                defaultValue={row.StartTime || ""}
              />
            </div>
            <div className="section">
              <label htmlFor={`editEnd${index}`}>End:</label>
              <input
                type="time"
                id={`editEnd${index}`}
                defaultValue={row.EndTime || ""}
              />
            </div>

            <div className="section">
              <label htmlFor={`editRoom${index}`}>Room:</label>
              <input
                type="text"
                name={`editRoom${index}`}
                id={`editRoom${index}`}
                defaultValue={row.Room || ""}
              />
            </div>
            <div className="Action">
              <Button
                variant="outlined"
                color="error"
                onClick={() => {
                  console.log("will remove row:", row);
                  setOldGroupSlots(
                    (prev) => prev.filter((slot) => slot.id !== row.id) // Use the `id` to remove slots
                  );
                }}
              >
                Remove Slot
              </Button>
            </div>
          </div>
        ))}
      </>
      <div className="Buttons">
        <button
          className="MainButton sub"
          onClick={() => dispatch({ type: "cancelEdit" })}
        >
          Cancel
        </button>
        <button
          className="MainButton sub"
          onClick={() => {
            if (checkValidInputs()) {
              setOldGroupSlots((prev) => [
                ...prev,
                { id: new Date().getTime() },
              ]); // Ensure new slots get unique id
            } else toast.error("Please Fill In All Fields To Create a New One");
          }}
        >
          Add New Slot
        </button>
        <button className="MainButton sub" onClick={handleSubmitEditedGroup}>
          Save Changes
        </button>
      </div>
    </div>
  );
}

export default AddGroup2;
