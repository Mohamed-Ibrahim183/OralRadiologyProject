import React, { useState, useEffect } from "react";
import "react-calendar/dist/Calendar.css";
import "./EditAssignmentPage.css"; // Updated CSS file name
import Modal from "react-modal"; // Import the Modal
import {
  getAllCategoriesData,
  UpdateAssignment,
  getSingleAssignmentData,
  deleteAssignmentDB,
} from "../../../Slices/PorfessorSlice";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { decryptData } from "../../Controller";
function EditAssignment() {
  const [assignmentName, setAssignmentName] = useState("");
  const [topicName, setTopicName] = useState("");
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedWeeks, setSelectedWeeks] = useState([]);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false); // State for modal
  const userId = sessionStorage["userId"];
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const navigator = useNavigate();
  const assignmentId = parseInt(
    decryptData(sessionStorage.getItem("editAssignment"))
  );

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await getSingleAssignmentData(assignmentId);

        if (response.msg) {
          setAssignmentName(response.msg.Name);
          setTopicName(response.msg.Topic);
          setSelectedCategories(
            response.msg.categories.map((cat) => parseInt(cat.categoryId))
          );
          setSelectedWeeks(response.msg.weeks);
        } else {
          toast.error("Failed to retrieve assignment data");
        }
      } catch (error) {
        console.error("Error:", error);
        toast.error("An error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [assignmentId]);

  useEffect(() => {
    getAllCategoriesData().then((res) => {
      setCategories(res.msg);
    });
  }, []);

  const handleCategoryChange = (categoryId) => {
    if (selectedCategories.includes(categoryId)) {
      setSelectedCategories(
        selectedCategories.filter((id) => id !== categoryId)
      );
    } else {
      setSelectedCategories([...selectedCategories, categoryId]);
    }
  };

  const handleWeekChange = (week) => {
    if (selectedWeeks.includes(week)) {
      setSelectedWeeks(selectedWeeks.filter((w) => w !== week));
    } else {
      setSelectedWeeks([...selectedWeeks, week]);
    }
  };

  const weeks = Array.from({ length: 20 }, (_, i) => i + 1);

  const saveAssignment = async () => {
    if (false) {
      toast.error("You Must Fill In All Fields");
      return;
    }
    setLoading(true);
    try {
      await UpdateAssignment({
        Id: assignmentId,
        Name: assignmentName,
        Topic: topicName,
        categories: selectedCategories.map((cat) => parseInt(cat)),
        weeks: selectedWeeks,
      });
      navigator("/professor/Dashboard");
    } catch (error) {
      console.error("Error:", error);
      toast.error("An error occurred");
    } finally {
      setLoading(false);
    }
  };

  const deleteAssignment = async () => {
    try {
      await deleteAssignmentDB(assignmentId);
      navigator("/professor/Dashboard");
      toast.success("Assignment deleted successfully");
    } catch (error) {
      console.error("Error:", error);
      toast.error("An error occurred while deleting");
    }
  };

  const openDeleteModal = () => setDeleteModalOpen(true);
  const closeDeleteModal = () => setDeleteModalOpen(false);

  return (
    <div className="editAssignmentPage-container">
      <div className="editAssignmentPage-content">
        <h2 className="editAssignmentPage-title">Edit Assignment</h2>
        <form onSubmit={(e) => e.preventDefault()}>
          <div className="editAssignmentPage-formGroup">
            <div className="editAssignmentPage-inputItem">
              <label htmlFor="assignmentName">Assignment Name</label>
              <input
                type="text"
                id="assignmentName"
                name="assignmentName"
                value={assignmentName}
                className="editAssignmentPage-inputField"
                placeholder="Enter assignment name"
                onChange={(e) => setAssignmentName(e.target.value)}
              />
            </div>
            <div className="editAssignmentPage-inputItem">
              <label htmlFor="topicName">Comment</label>
              <input
                type="text"
                id="topicName"
                name="topicName"
                value={topicName}
                className="editAssignmentPage-inputField"
                placeholder="Enter comments"
                onChange={(e) => setTopicName(e.target.value)}
              />
            </div>
            <div className="editAssignmentPage-inputItem">
              <label htmlFor="categorySelection">Categories</label>
              <div className="editAssignmentPage-categoryList">
                {Array.isArray(categories) &&
                  categories.map((cat) => (
                    <div key={cat.Id}>
                      <input
                        type="checkbox"
                        id={`category-${cat.Id}`}
                        style={{ marginRight: "7px" }}
                        value={cat.Id}
                        checked={selectedCategories.includes(cat.Id)}
                        onChange={() => handleCategoryChange(cat.Id)}
                      />
                      <label htmlFor={`category-${cat.Id}`}>{cat.Name}</label>
                    </div>
                  ))}
              </div>
            </div>
            <div className="editAssignmentPage-inputItem">
              <label htmlFor="weekNumber">Week Numbers</label>
              <div className="editAssignmentPage-weekList">
                {weeks.slice(0, 10).map((week) => (
                  <div key={week}>
                    <input
                      type="checkbox"
                      id={`week-${week}`}
                      value={week}
                      checked={selectedWeeks.includes(week)}
                      onChange={() => handleWeekChange(week)}
                    />
                    <label htmlFor={`week-${week}`}>Week {week}</label>
                  </div>
                ))}
                {weeks.slice(10).map((week) => (
                  <div key={week}>
                    <input
                      type="checkbox"
                      id={`week-${week}`}
                      value={week}
                      checked={selectedWeeks.includes(week)}
                      onChange={() => handleWeekChange(week)}
                    />
                    <label htmlFor={`week-${week}`}>Week {week}</label>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="editAssignmentPage-buttonGroup">
            <button
              type="button"
              onClick={openDeleteModal}
              className="editAssignmentPage-deleteButton"
            >
              Delete
            </button>
            <button
              type="button"
              onClick={saveAssignment}
              disabled={loading}
              className="editAssignmentPage-submitButton"
            >
              {loading ? "Saving..." : "Save"}
            </button>
          </div>
        </form>
      </div>

      <Modal
        isOpen={isDeleteModalOpen}
        onRequestClose={closeDeleteModal}
        contentLabel="Delete Assignment Confirmation"
        className="editAssignmentPage-modal"
        overlayClassName="editAssignmentPage-modalOverlay"
      >
        <h2>Confirm Deletion</h2>
        <p>Are you sure you want to delete this assignment?</p>
        <div className="editAssignmentPage-modalButtons">
          <button onClick={deleteAssignment} className="modal-confirmButton">
            Confirm
          </button>
          <button onClick={closeDeleteModal} className="modal-cancelButton">
            Cancel
          </button>
        </div>
      </Modal>
    </div>
  );
}

export default EditAssignment;
