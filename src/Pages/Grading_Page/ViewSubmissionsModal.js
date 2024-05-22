import React, { useEffect, useState } from "react";
import axios from "axios";
import Modal from "react-responsive-modal";
import "./ViewSubmissionsModal.css";
import { axiosMethods } from "../Controller";

const ViewSubmissionsModal = ({
  show,
  handleClose,
  studentId,
  assignmentId,
}) => {
  const [images, setImages] = useState([]);
  const [error, setError] = useState("");
  const [openImageModal, setOpenImageModal] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    if (show && studentId && assignmentId) {
      new axiosMethods()
        .get(
          "http://localhost/Projects/OralRadiology/AssignmentLogic.php/FetchAssignmentImages",
          { studentId, assignmentId }
        )
        .then((res) => (res.msg ? setImages(res.msg) : setError(res.error)));
    }
  }, [show, studentId, assignmentId]);

  const openImageViewer = (index) => {
    setCurrentImageIndex(index);
    setOpenImageModal(true);
  };

  const closeImageViewer = () => {
    setOpenImageModal(false);
  };

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex(
      (prevIndex) => (prevIndex - 1 + images.length) % images.length
    );
  };

  if (!show) {
    return null;
  }

  return (
    <div className="modal-backdrop">
      <div className="modal-content">
        <h2>Submissions for Student ID: {studentId}</h2>
        {error ? <p>{error}</p> : null}
        <div className="image-container">
          {Array.isArray(images) && images.length > 0 ? (
            images.map((img, index) => (
              <img
                key={index}
                src={`http://localhost/Projects/OralRadiology/${img.Path}`}
                alt={`Submission ${index + 1}`}
                className="submission-image"
                onClick={() => openImageViewer(index)}
              />
            ))
          ) : (
            <p>No images available</p>
          )}
        </div>
        <button onClick={handleClose}>Close</button>

        {openImageModal && (
          <Modal open={openImageModal} onClose={closeImageViewer} center>
            <div className="image-slider">
              <button
                className="closebutton"
                onClick={closeImageViewer}
                style={{ marginTop: "-50px" }}
              >
                &#10005;
              </button>
              <button className="prev-button" onClick={prevImage}>
                &#10094;
              </button>

              <img
                src={`http://localhost/Projects/OralRadiology/${images[currentImageIndex].Path}`}
                alt={`Submission ${currentImageIndex + 1}`}
                className="large-image"
              />
              <button className="next-button" onClick={nextImage}>
                &#10095;
              </button>
            </div>
          </Modal>
        )}
      </div>
    </div>
  );
};

export default ViewSubmissionsModal;
