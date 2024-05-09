import React, { useState } from 'react';
import './Modaalll.css';

const initialGroups = [
  { name: "Group A", openTime: "", closeTime: "" },
  { name: "Group B", openTime: "", closeTime: "" },
  { name: "Group C", openTime: "", closeTime: "" }
];

const Modal2 = ({ open, onClose }) => {
  const [groups, setGroups] = useState(initialGroups);
  const [selectedGroupIndex, setSelectedGroupIndex] = useState(0);

  if (!open) return null;

  const handleGroupChange = (event) => {
    setSelectedGroupIndex(event.target.value);
  };

  const handleTimeChange = (event) => {
    const updatedGroups = groups.map((group, index) => {
      if (index === selectedGroupIndex) {
        return { ...group, [event.target.name]: event.target.value };
      }
      return group;
    });
    setGroups(updatedGroups);
  };

  const selectedGroup = groups[selectedGroupIndex];

  return (
    <div className="Modal2Group" onClick={onClose}>
      <div className="ModalContent" onClick={e => e.stopPropagation()}>
        <button className="CloseButton" onClick={onClose} style={{backgroundColor:"#c7cbcf00"}}>x</button>
        <section>
          <label htmlFor="Groups">Select the Group</label>
          <select name="Groups" id="Groups" onChange={handleGroupChange} value={selectedGroupIndex}>
            {groups.map((group, index) => (
              <option key={index} value={index}>{group.name}</option>
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
        <button className="MainBtn" style={{marginLeft:'75px'}}>Save</button>
      </div>
    </div>
  );
};

export default Modal2;
