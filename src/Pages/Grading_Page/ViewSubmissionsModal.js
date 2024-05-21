import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './ViewSubmissionsModal.css';

const ViewSubmissionsModal = ({ show, handleClose, studentId, assignmentId }) => {
    const [images, setImages] = useState([]);
    const [error, setError] = useState("");

    useEffect(() => {
        if (show && studentId && assignmentId) {
            axios.get(`http://localhost/Projects/OralRadiology/fetchImages.php`, {
                params: { studentId, assignmentId }
            }).then(response => {
                console.log("Data received:", response.data);  // Check what is actually in response.data
                if (response.data.error) {
                    setError(response.data.error);
                } else {
                    setImages(response.data);  // Make sure response.data is the array you expect
                }
            }).catch(error => {
                console.error("Error fetching images:", error);
                setError("Failed to fetch images");
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
                <div className="image-container">
    {Array.isArray(images) && images.length > 0 ? images.map((img, index) => (
        <img key={index} src={`http://localhost/Projects/OralRadiology/${img.Path}`} alt={`Submission ${index + 1}`} />
    )) : <p>No images available</p>}
</div>

                <button onClick={handleClose}>Close</button>
            </div>
        </div>
    );
};

export default ViewSubmissionsModal;
