import React from 'react';
import './ViewSubmissionsModal.css';

const ViewSubmissionsModal = ({ show, handleClose, studentId }) => {
  if (!show) {
    return null;
  }

  return (
    <div className="modal-backdrop">
      <div className="modal-content">
        <h2>Submissions for Student ID: {studentId}</h2>
        {/* Add content related to the submissions here */}
        <button onClick={handleClose}>Close</button>
      </div>
    </div>
  );
};

export default ViewSubmissionsModal;
