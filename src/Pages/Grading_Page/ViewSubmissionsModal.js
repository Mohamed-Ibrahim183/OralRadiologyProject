import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './ViewSubmissionsModal.css';

const ViewSubmissionsModal = ({ show, handleClose, studentId, assignmentId }) => {
  const [images, setImages] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    if (show) {
      axios.get(`http://localhost/Projects/OralRadiology/fetchImages.php`, {
        params: { studentId, assignmentId }
      })
      .then(response => {
        if (response.data.error) {
          setError(response.data.error);
        } else {
          setImages(response.data);
        }
      })
      .catch(error => {
        setError("Failed to fetch images");
        console.error("Error fetching images:", error);
      });
    }
  }, [show, studentId, assignmentId]);

  if (!show) {
    return null;
  }

  return (
    <div className="modal-backdrop">
      <div className="modal-content">
        <h2>Submissions for Student ID: {studentId}</h2>
        {error ? <p>{error}</p> : null}
        <div className="image-gallery">
          {images.map(image => (
            <img key={image.Id} src={image.Path} alt={`Assignment ${image.AssignmentId}`} />
          ))}
        </div>
        <button onClick={handleClose}>Close</button>
      </div>
    </div>
  );
};

export default ViewSubmissionsModal;
