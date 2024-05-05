import React, { useState, useEffect } from 'react';
import './Modal.css';

const Modal = ({ isOpen, onClose }) => {
  const [selectedGroup, setSelectedGroup] = useState('');
  const [groups, setGroups] = useState([]);
  const [times, setTimes] = useState({});
  const [requirementName, setRequirementName] = useState('');
  const [topicName, setTopicName] = useState('');
  const [maxImages, setMaxImages] = useState('');

  useEffect(() => {
    const fetchGroups = async () => {
      try {
        const response = await fetch('http://localhost/Projects/Oral%20Radiology/getgroups.php');
        if (!response.ok) {
          throw new Error('Failed to fetch groups');
        }
        const data = await response.json();
        console.log("Groups fetched:", data); // This will show you the structure and content of `groups`
        setGroups(data);
      } catch (error) {
        console.error('Error fetching groups:', error);
      }
    };
    fetchGroups();
  }, []);
  

  if (!isOpen) return null;

  const handleGroupChange = (event) => {
    setSelectedGroup(event.target.value);
    setTimes(prevTimes => ({ ...prevTimes, [event.target.value]: {} }));
  };

  const handleTimeChange = (event) => {
    const { name, value } = event.target;
    setTimes(prevTimes => ({
      ...prevTimes,
      [selectedGroup]: {
        ...prevTimes[selectedGroup],
        [name]: value
      }
    }));
  };
const saveGroupTimes = async () => {
    const assignmentData = {
        requirementName,
        topicName,
        maxImages: parseInt(maxImages, 10),
        groups: { [selectedGroup]: times[selectedGroup] }
    };
    try {
        const response = await fetch('http://localhost/Projects/Oral Radiology/monem.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(assignmentData)
        });
        
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const responseData = await response.json();
        console.log('Data saved successfully:', responseData);
        

    } catch (error) {
        console.error('Failed to save data:', error);
        alert('A server error occurred. Please check the server logs.');
    }
};




  return (
    <div className="modal">
      <div className="modal-content">
        <button className="close-button" onClick={onClose}>×</button>
        <h2 style={{ marginBottom: '10px' }}>Add Requirement</h2>
        <form onSubmit={e => e.preventDefault()}>
            <div className="form-group">
                <label htmlFor="requirementname">Requirement Name:</label>
                <input type="text" id="requirementname" name="requirementname" onChange={e => setRequirementName(e.target.value)} />
                <label htmlFor="topicName">Topic Name:</label>
                <input type="text" id="topicName" name="topicName" onChange={e => setTopicName(e.target.value)} />
                <label htmlFor="maxImages">Maximum Number of Images:</label>
                <input type="number" id="maxImages" name="maxImages" onChange={e => setMaxImages(e.target.value)} />
            </div>
            <div style={{display: "flex"}}>
                <div className="form-group">
                    <label htmlFor="groups">Group:</label>
                    <select name="groups" id="groups" onChange={handleGroupChange} value={selectedGroup} className='select'>
                        <option value="">Select Group</option>
                        {groups.map(group => (
                          <option key={group.Id} value={group.Id}>{group.Name}</option>
                        ))}
                    </select>
                </div>
                {selectedGroup && (
                    <>
                        <div className="formgrouptime">
                            <label htmlFor="openTime">Open Time:</label>
                            <input 
                                type="datetime-local" 
                                id="openTime" 
                                name="openTime" 
                                value={times[selectedGroup]?.openTime || ''} 
                                onChange={handleTimeChange} 
                            />
                        </div>
                        <div className="formgrouptime">
                            <label htmlFor="closeTime">Close Time:</label>
                            <input 
                                type="datetime-local" 
                                id="closeTime" 
                                name="closeTime" 
                                value={times[selectedGroup]?.closeTime || ''} 
                                onChange={handleTimeChange} 
                            />
                        </div>
                    </>
                )}
            </div>
            <button type="button" onClick={saveGroupTimes} className='submit'>Save</button>
        </form>
      </div>
    </div>
  );
};

export default Modal;
