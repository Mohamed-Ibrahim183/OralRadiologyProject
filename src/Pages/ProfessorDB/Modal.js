import React, { useState } from 'react';
import axios from 'axios';
import './Modal.css';

const Modal = ({ isOpen, onClose }) => {
  const [assignmentName, setAssignmentName] = useState('');
  const [topicName, setTopicName] = useState('');
  const [maxImages, setMaxImages] = useState('');
  const userId = sessionStorage.getItem("userId");
  const [loading, setLoading] = useState(false); // State to handle loading status

  const saveAssignment = async () => {
    if (!assignmentName || !topicName || !maxImages) {
      alert('Please fill in all fields.');
      return;
    }

    setLoading(true);
    try {
      const assignmentData = {
        Name: assignmentName,
        Topic: topicName,
        maxLimitImages: parseInt(maxImages, 10),
        ProfessorId: parseInt(userId, 10),
      };

      const response = await axios.post(`http://localhost/Projects/OralRadiology/add_assignment.php?userId=${userId}`, assignmentData, {
        withCredentials: true  // If using sessions that require cookies
      });
      console.log('Assignment saved successfully:', response.data);
      alert('Assignment saved successfully');
    } catch (error) {
      console.error('Failed to save assignment:', error);
      alert('Failed to save assignment: ' + (error.response ? error.response.data.error : error.message));
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal">
      <div className="modal-content">
        <button className="close-button" onClick={onClose}>×</button>
        <h2 style={{ marginBottom: '10px' }}>Add Requirement</h2>
        <form onSubmit={e => e.preventDefault()}>
          <div className="form-group">
            <label htmlFor="requirementname">Requirement Name:</label>
            <input type="text" id="requirementname" name="requirementname" value={assignmentName} onChange={e => setAssignmentName(e.target.value)} />
            <label htmlFor="topicName">Topic Name:</label>
            <input type="text" id="topicName" name="topicName" value={topicName} onChange={e => setTopicName(e.target.value)} />
            <label htmlFor="maxImages">Maximum Number of Images:</label>
            <input type="number" id="maxImages" name="maxImages" value={maxImages} onChange={e => setMaxImages(e.target.value)} />
          </div>
          <button type="button" onClick={saveAssignment} disabled={loading} className='submit'>
            {loading ? 'Saving...' : 'Save'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Modal;
