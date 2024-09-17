import React, { useEffect, useReducer, useState } from "react";
import toast from "react-hot-toast";
import { DeleteGroup, getAllGroupsData } from "../../Slices/AdminSlice";
import { validArray } from "../Controller";
import { Button } from "@mui/material";

const AddGroup2 = () => {
  const initialState = { groups: [], renderGroups: 0, editingGroup: {} };
  const [state, dispatch] = useReducer(reducer, initialState);
  function reducer(state, action) {
    switch (action.type) {
      case "setGroups":
        return {
          ...state,
          groups: action.payload,
          renderGroups: state.renderGroups + 1,
        };
      case "clearGroups":
        return { ...state, groups: [], renderGroups: state.renderGroups + 1 };
      case "render":
        return { ...state, renderGroups: state.renderGroups + 1 };
      case "setEditingGroup":
        return { ...state, editingGroup: action.payload };
      case "cancelEdit":
        return { ...state, editingGroup: {} };
      default:
        return { ...state, renderGroups: state.renderGroups + 1 };
    }
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
              {state.groups.map((group) => {
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
                      <button
                        className="Del"
                        onClick={() => DeleteSelectedGroup(group.Id)}
                      >
                        Delete
                      </button>
                      {/* <button
                        className="Edit"
                        onClick={() => {
                          setEditingGroup(group);
                          setEditingRows(group.Slots);
                          setEditingGroupIndex(group.Id);
                        }}
                      >
                        Edit
                      </button> */}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        ) : (
          <p>There Is No Groups In Database</p>
        )}

        <div className="section1">
          <label htmlFor="GroupName">Enter Group Name:</label>
          <input type="text" name="GroupName" id="GroupName" />
          {/* <button
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
          </button> */}
        </div>
        <div className="main">
          {/* {Array.from({ length: rows }, (_, index) => generateRow(index))} */}
          <div className="Buttons">
            {/* {(renderedRows.length > 0 || rows > 0) && (
              <button
                className="MainButton sub"
                onClick={() => handleSubmit(1)}
              >
                Submit
              </button>
            )} */}
          </div>
        </div>
      </div>
      <EditSection state={state} dispatch={dispatch} />
      {/* {editGroupForm()} */}
    </>
  );
};
function EditSection({ state, dispatch }) {
  // const oldGroupSlots = state.editingGroup.Slots;
  const [oldGroupSlots, setOldGroupsSlots] = useState(
    state.editingGroup.Slots || {}
  );

  if (!state.editingGroup) return;
  return (
    <div className="AddGroup">
      <h3>Editing Group {state.editingGroup.Name}</h3>
      <>
        {validArray(oldGroupSlots) &&
          oldGroupSlots.map((row, index) => (
            <div className={`row`} id={`row${index}`} key={index}>
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
                    document.getElementById(`row${index}`).remove();
                    // remove this slot from the old group slots
                    setOldGroupsSlots((prev) => {
                      prev.filter((slot) => slot.Id !== row.Id);
                    });
                  }}
                >
                  Remove Slot
                </Button>
              </div>
            </div>
          ))}
      </>
      <div className="Buttons">
        {/* <button className="MainButton sub" onClick={handleEditSubmit}>
          Save Changes
        </button> */}
        <button
          className="MainButton sub"
          onClick={() => dispatch({ type: "cancelEdit" })}
        >
          Cancel
        </button>
        <button
          className="MainButton sub"
          onClick={() => setOldGroupsSlots((prev) => prev.push({}))}
        >
          Add New Slot
        </button>
      </div>
    </div>
  );
}
export default AddGroup2;
