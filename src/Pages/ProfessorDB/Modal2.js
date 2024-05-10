import React, { useEffect, useState } from "react";
import "./Modaalll.css";
import axios from "axios";

const Modal2 = ({ open, onClose, AssignmentId }) => {
  const [groups, setGroups] = useState([]);
  const [selectedGroupIndex, setSelectedGroupIndex] = useState(0);

  useEffect(() => {
    const url =
      "http://localhost/Projects/OralRadiology/GroupLogic.php/getGroupsNames";
    axios
      .get(url)
      .then((res) => {
        // console.log(res.data);
        // console.log("getGroupsNames", res.data);
        setGroups(
          res.data.map((group) => ({
            name: group["Name"],
            Id: group["Id"],
            openTime: "",
            closeTime: "",
          }))
        );
      })
      .catch((error) => console.error(error));
  }, []);
  if (!open) return null;

  const handleGroupChange = (event) => {
    setSelectedGroupIndex(event.target.value);
  };

  const handleTimeChange = (event) => {
    const { name, value } = event.target;
    const updatedGroups = [...groups]; // Create a copy of groups array
    updatedGroups[selectedGroupIndex] = {
      ...updatedGroups[selectedGroupIndex],
      [name]: value,
    };
    setGroups(updatedGroups);
  };
  function handleSave() {
    const url =
      "http://localhost/Projects/OralRadiology/AssignmentLogic.php/AssignmentGroup";
    let fData = new FormData();
    fData.append("Name", selectedGroup.name);
    fData.append("GroupId", selectedGroup.Id);
    fData.append("openTime", selectedGroup.openTime);
    fData.append("closeTime", selectedGroup.closeTime);
    fData.append("AssignmentId", AssignmentId);
    axios
      .post(url, fData)
      .then((res) => {
        console.log(res.data);
      })
      .catch((error) => console.error(error));
  }

  const selectedGroup = groups[selectedGroupIndex];
  // console.log(selectedGroup);
  // console.log("selectedGroup:", selectedGroup);
  // console.log("groups:", groups);
  return (
    <div className="Modal2Group" onClick={onClose}>
      <div className="ModalContent">
        <table>
          <thead>
            <tr>
              <td>Assignment Name</td>
              <td>Group Name</td>
              <td>Open Time</td>
              <td>Close Time</td>
            </tr>
          </thead>
        </table>
      </div>
      <div className="ModalContent" onClick={(e) => e.stopPropagation()}>
        <div className="Left"></div>
        <div className="Right">
          <button
            className="CloseButton"
            onClick={onClose}
            style={{ backgroundColor: "#c7cbcf00" }}
          >
            x
          </button>
          <section>
            <label htmlFor="Groups">Select the Group</label>
            <select
              name="Groups"
              id="Groups"
              onChange={handleGroupChange}
              value={selectedGroupIndex}
            >
              {groups.map((group, index) => (
                <option key={index} value={index}>
                  {group.name}
                </option>
              ))}
            </select>
          </section>
          <section>
            <label htmlFor="openTime">Select the Open Time</label>
            <input
              type="datetime-local"
              id="openTime"
              name="openTime"
              value={selectedGroup.openTime}
              onChange={handleTimeChange}
            />
          </section>
          <section>
            <label htmlFor="closeTime">Select the Close Time</label>
            <input
              type="datetime-local"
              id="closeTime"
              name="closeTime"
              value={selectedGroup.closeTime}
              onChange={handleTimeChange}
            />
          </section>
          <button
            className="MainBtn"
            style={{ marginLeft: "75px" }}
            onClick={handleSave}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal2;
