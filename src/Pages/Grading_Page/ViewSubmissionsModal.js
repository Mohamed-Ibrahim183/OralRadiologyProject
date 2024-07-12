import React, { useEffect, useState } from "react";

import "./ViewSubmissionsModal.css";
import { axiosMethods } from "../Controller";
import Button from "@mui/material/Button";
import BasicModalComp from "../../Components/BasicModal/BasicModalComp";

const ViewSubmissionsModal = ({ show, handleClose, submission }) => {
  const [images, setImages] = useState([]);
  const [openImageModal, setOpenImageModal] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    if (!submission) return;
    new axiosMethods()
      .get(
        "http://localhost/Projects/OralRadiology/AssignmentLogic.php/FetchAssignmentImages",
        { submission }
      )
      .then((res) => {
        console.log("Images:", res.msg);
        setImages(res.msg);
      });
  }, [submission]);

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
  function EvaluateImage() {
    new axiosMethods()
      .post(
        "http://localhost/Projects/OralRadiology/AssignmentLogic.php/EvaluateImage",
        {
          ImageId: images[currentImageIndex].Id,
          Grade: images[currentImageIndex].Grade,
        }
      )
      .then((res) => console.log(res.msg));
  }

  if (!show) {
    return null;
  }

  return (
    <BasicModalComp openModal={show} closeModal={handleClose}>
      <div className="modal-backdrop">
        <div className="modal-content">
          <h2>Submissions for Submission ID: {submission}</h2>
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
              <p>No Films available</p>
            )}
          </div>
          <button onClick={handleClose}>Close</button>

          {openImageModal && (
            // <Modal open={openImageModal} onClose={closeImageViewer} center>
            <BasicModalComp
              openModal={openImageModal}
              closeModal={closeImageViewer}
            >
              <div className="image-slider1">
                <button
                  className="closeButton"
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
                <div
                  className="grading"
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    gap: "20px",
                  }}
                >
                  <input
                    style={{
                      width: "200px",
                      padding: "8px",
                      borderRadius: "16px",
                    }}
                    type="number"
                    max={100}
                    min={0}
                    placeholder="Enter Grade of the Film"
                    value={images[currentImageIndex].Grade}
                    onChange={(event) => {
                      setImages((prev) => {
                        return prev.map((image) => {
                          if (image.Id === images[currentImageIndex].Id) {
                            return { ...image, Grade: event.target.value };
                          } else {
                            return image;
                          }
                        });
                      });
                    }}
                  />
                  <Button
                    variant="contained"
                    color="success"
                    onClick={EvaluateImage}
                  >
                    Grade
                  </Button>
                </div>
              </div>
            </BasicModalComp>
            // </Modal>
          )}
        </div>
      </div>
    </BasicModalComp>
  );
};

export default ViewSubmissionsModal;
