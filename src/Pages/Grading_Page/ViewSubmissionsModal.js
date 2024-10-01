import React, { useEffect, useState } from "react";
import "./ViewSubmissionsModal.css";
// import { axiosMethods } from "../Controller";
import Button from "@mui/material/Button";
import BasicModalComp from "../../Components/BasicModal/BasicModalComp";
import {
  evaluateAssignmentImage,
  getAssignmentImages,
  saveDoctorComment,
} from "../../Slices/PorfessorSlice";
import { serverURL } from "../../Slices/GeneralSlice";
import toast from "react-hot-toast";
import { validArray } from "../Controller";
function ViewSubmissionsModal({
  show,
  handleClose,
  submission,
  fullSubmission,
}) {
  const [images, setImages] = useState([]);
  const [openImageModal, setOpenImageModal] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [doctorNote, setDoctorNote] = useState("");

  useEffect(() => {
    if (!submission) return;
    getAssignmentImages({ submission: submission }).then((res) => {
      setImages(res.msg);
    });
  }, [submission]);
  useEffect(() => {
    if (fullSubmission.DoctorsNote) setDoctorNote(fullSubmission.DoctorsNote);
  }, [fullSubmission.DoctorsNote]);

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
    evaluateAssignmentImage({
      ImageId: images[currentImageIndex].Id,
      Grade: images[currentImageIndex].Grade,
    });
    toast.success("Image Evaluated Successfully");
  }

  if (!show) {
    return null;
  }

  return (
    <BasicModalComp openModal={show} closeModal={handleClose}>
      <div className="modal-backdrop">
        <div className="modal-content">
          <h2>
            Submissions for {fullSubmission.Name} MSAId:{fullSubmission.MSAId}{" "}
            Week:{fullSubmission.weekNum}
          </h2>
          <div className="image-container">
            {validArray(images) ? (
              images.map((img, index) => (
                <img
                  key={index}
                  src={`${serverURL}${img.Path}`}
                  alt={`Submission ${index + 1}`}
                  className="submission-image"
                  onClick={() => openImageViewer(index)}
                />
              ))
            ) : (
              <p>No Films available</p>
            )}
          </div>
          <div>
            <button onClick={handleClose}>Close</button>
            <div>
              <input
                type="text"
                value={doctorNote}
                onChange={(e) => setDoctorNote(e.target.value)}
              />
              <button
                onClick={() =>
                  saveDoctorComment(fullSubmission.submission, doctorNote).then(
                    (res) => {
                      if (res.msg === "UPDATED")
                        toast.success("The note saved successfully");
                    }
                  )
                }
              >
                Save Note
              </button>
            </div>
          </div>

          {openImageModal && (
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
                  src={`${serverURL}${images[currentImageIndex].Path}`}
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
                  <p>{images[currentImageIndex].CategoryName}</p>
                </div>
              </div>
            </BasicModalComp>
          )}
        </div>
      </div>
    </BasicModalComp>
  );
}
export default ViewSubmissionsModal;
