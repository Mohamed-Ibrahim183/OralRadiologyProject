import React, { useEffect, useState } from "react";
import "./Modaalll.css";
import "./Modal2.css";
import Button from "@mui/material/Button";
import { Close, Send } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import {
  addNewAssignmentSlot,
  getGroupsNamesDB,
} from "../../Slices/PorfessorSlice";

const Modal2 = ({ open, onClose, AssignmentId }) => {
  const [groups, setGroups] = useState([]);
  const [selectedGroupIndex, setSelectedGroupIndex] = useState(0);

  useEffect(() => {
    getGroupsNamesDB().then((res) => {
      setGroups(
        res.msg.map((group) => ({
          name: group["Name"],
          Id: group["Id"],
          openTime: "",
          closeTime: "",
        }))
      );
    });
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
    addNewAssignmentSlot({
      Name: selectedGroup.name,
      GroupId: selectedGroup.Id,
      openTime: selectedGroup.openTime,
      closeTime: selectedGroup.closeTime,
      AssignmentId,
    });
  }

  const selectedGroup = groups[selectedGroupIndex];
  return (
    <div className="Modal2Group" onClick={onClose}>
      <main className="main">
        <div className="ModalContent" onClick={(e) => e.stopPropagation()}>
          <div className="Left"></div>
          <div className="Right">
            <IconButton onClick={onClose} className="CloseButton">
              <Close />
            </IconButton>
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
            <Button
              variant="outlined"
              color="secondary"
              onClick={handleSave}
              endIcon={<Send />}
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              Save
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Modal2;
