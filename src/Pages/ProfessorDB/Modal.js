import React, { useState } from "react";
import axios from "axios";
import "./Modal.css";

const Modal = ({ isOpen, onClose }) => {
  const [assignmentName, setAssignmentName] = useState("");
  const [topicName, setTopicName] = useState("");
  const [maxImages, setMaxImages] = useState("");
  const userId = sessionStorage["userId"];
  const [loading, setLoading] = useState(false); // State to handle loading status

  const saveAssignment = async () => {
    if (!assignmentName || !topicName || !maxImages) {
      alert("Please fill in all fields.");
      return;
    }
    setLoading(true);
    const url =
      "http://localhost/Projects/OralRadiology/AssignmentLogic.php/InsertAssignment";
    let fData = new FormData();
    fData.append("Name", assignmentName);
    fData.append("Topic", topicName);
    fData.append("maxLimitImages", parseInt(maxImages, 10));
    fData.append("ProfessorId", parseInt(userId, 10));
    axios
      .post(url, fData)
      .then((res) => {
        if (res.data === "Inserted") alert("Assignment Added Successfully");
      })
      .catch((error) => console.error(error));
    setLoading(false);
  };

  if (!isOpen) return null;

  return (
    <div className="modal">
      <div className="modal-content">
        <button className="close-button" onClick={onClose}>
          &times;
        </button>
        <h2 style={{ marginBottom: "10px" }}>Add Requirement</h2>
        <form onSubmit={(e) => e.preventDefault()}>
          <div className="form-group">
            <section>
              <label htmlFor="requirementName">Requirement Name:</label>
              <input
                type="text"
                id="requirementName"
                name="requirementName"
                value={assignmentName}
                onChange={(e) => setAssignmentName(e.target.value)}
              />
            </section>
            <section>
              <label htmlFor="topicName">Topic Name:</label>
              <input
                type="text"
                id="topicName"
                name="topicName"
                value={topicName}
                onChange={(e) => setTopicName(e.target.value)}
              />
            </section>
            <section>
              <label htmlFor="maxImages">Maximum Number of Images:</label>
              <input
                type="number"
                id="maxImages"
                name="maxImages"
                value={maxImages}
                onChange={(e) => setMaxImages(e.target.value)}
              />
            </section>
          </div>
          <button
            type="button"
            onClick={saveAssignment}
            disabled={loading}
            className="submit"
          >
            {loading ? "Saving..." : "Save"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Modal;
