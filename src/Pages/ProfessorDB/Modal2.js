import React, { useEffect, useState } from "react";
import "./Modaalll.css";
import axios from "axios";
import "./Modal2.css";

const Modal2 = ({ open, onClose, AssignmentId }) => {
  const [groups, setGroups] = useState([]);
  const [selectedGroupIndex, setSelectedGroupIndex] = useState(0);
  const [view, setView] = useState();

  useEffect(() => {
    const url = "http://localhost/Projects/OralRadiology/GroupLogic.php/";

    axios
      .get(url + "getGroupsNames")
      .then((res) => {
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

    GetGroupsData();
  }, []);
  if (!open) return null;

  function GetGroupsData() {
    const url =
      "http://localhost/Projects/OralRadiology/AssignmentLogic.php/AssignmentGroupsShow";
    axios
      .get(url)
      .then((res) => {
        const content = res.data.map((ele, i) => {
          return (
            <tr key={i}>
              <td>{ele.group}</td>
              <td>{ele.Assignment}</td>
              <td>{ele.openTime}</td>
              <td>{ele.closeTime}</td>
            </tr>
          );
        });
        setView(content);
      })
      .catch((error) => console.error(error));
  }
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
  return (
    <div className="Modal2Group" onClick={onClose}>
      <main className="main">
        {/* <div className="ModalContent Left">
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
        </div> */}
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
              <table cellSpacing={20}>
                <thead>
                  <tr>
                    <td>Group</td>
                    <td>Assignment</td>
                    <td>Open</td>
                    <td>Close</td>
                  </tr>
                </thead>
                <tbody>{view}</tbody>
              </table>
            </section>
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
      </main>
    </div>
  );
};

export default Modal2;
