import React, { useState, useEffect } from "react";
import "react-calendar/dist/Calendar.css";
import "./NewAssignmentPage.css"; // Updated CSS file name

import {
  getAllCategoriesData,
  UpdateAssignment,
  getSingleAssignmentData,
} from "../../Slices/PorfessorSlice";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function EditAssignment() {
  const [assignmentName, setAssignmentName] = useState("");
  const [topicName, setTopicName] = useState("");
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedWeeks, setSelectedWeeks] = useState([]);
  const userId = sessionStorage["userId"];
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const navigator = useNavigate();
  const assignmentId = parseInt(sessionStorage.getItem("editAssignment"));
  const [assignmentData, setAssignmentData] = useState({});

  // Fetch assignment data on mount
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await getSingleAssignmentData(assignmentId);
        console.log("First getted data");
        console.log(response.msg);

        if (response.msg) {
          setAssignmentName(response.msg.Name);
          setTopicName(response.msg.Topic);
          setSelectedCategories(
            response.msg.categories.map((cat) => parseInt(cat.categoryId)) // Initialize categories
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

  // Fetch all categories
  useEffect(() => {
    getAllCategoriesData().then((res) => {
      setCategories(res.msg);
    });
  }, []);

  // Handle category selection
  const handleCategoryChange = (categoryId) => {
    if (selectedCategories.includes(categoryId)) {
      setSelectedCategories(
        selectedCategories.filter((id) => id !== categoryId)
      );
    } else {
      setSelectedCategories([...selectedCategories, categoryId]);
    }
  };

  // Handle week selection
  const handleWeekChange = (week) => {
    if (selectedWeeks.includes(week)) {
      setSelectedWeeks(selectedWeeks.filter((w) => w !== week));
    } else {
      setSelectedWeeks([...selectedWeeks, week]);
    }
  };

  const weeks = Array.from({ length: 20 }, (_, i) => i + 1); // Weeks 1 to 20

  const saveAssignment = async () => {
    if (false) {
      // This condition is for validation if needed
      toast.error("You Must Fill In All Fields");
      return;
    }
    setLoading(true);
    try {
      // Save logic here
      UpdateAssignment({
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
      console.log("Updated assignment Data");
      console.log({
        Id: assignmentId,
        Name: assignmentName,
        Topic: topicName,
        categories: selectedCategories.map((cat) => parseInt(cat)),
        weeks: selectedWeeks,
      });
      setLoading(false);
    }
  };

  return (
    <div className="newAssignmentPage-container">
      <div className="newAssignmentPage-content">
        <h2 className="newAssignmentPage-title">Edit Assignment</h2>
        <form onSubmit={(e) => e.preventDefault()}>
          <div className="newAssignmentPage-formGroup">
            <div className="newAssignmentPage-inputItem">
              <label htmlFor="assignmentName">Assignment Name</label>
              <input
                type="text"
                id="assignmentName"
                name="assignmentName"
                value={assignmentName} // Use local state
                className="newAssignmentPage-inputField"
                placeholder="Enter assignment name"
                onChange={(e) => setAssignmentName(e.target.value)} // Update local state
              />
            </div>
            <div className="newAssignmentPage-inputItem">
              <label htmlFor="topicName">Comment</label>
              <input
                type="text"
                id="topicName"
                name="topicName"
                value={topicName} // Use local state
                className="newAssignmentPage-inputField"
                placeholder="Enter comments"
                onChange={(e) => setTopicName(e.target.value)} // Update local state
              />
            </div>
            <div className="newAssignmentPage-inputItem">
              <label htmlFor="categorySelection">Categories</label>
              <div className="newAssignmentPage-categoryList">
                {Array.isArray(categories) &&
                  categories.map((cat) => (
                    <div key={cat.Id}>
                      <input
                        type="checkbox"
                        id={`category-${cat.Id}`}
                        style={{ marginRight: "7px" }}
                        value={cat.Id}
                        checked={selectedCategories.includes(cat.Id)} // Use selectedCategories state
                        onChange={() => handleCategoryChange(cat.Id)} // Handle category change
                      />
                      <label htmlFor={`category-${cat.Id}`}>{cat.Name}</label>
                    </div>
                  ))}
              </div>
            </div>
            <div className="newAssignmentPage-inputItem">
              <label htmlFor="weekNumber">Week Numbers</label>
              <div className="newAssignmentPage-weekList">
                <div className="newAssignmentPage-weekColumn">
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
                </div>
                <div className="newAssignmentPage-weekColumn">
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
          </div>
          <button
            type="button"
            onClick={saveAssignment}
            disabled={loading}
            className="newAssignmentPage-submitButton"
          >
            {loading ? "Saving..." : "Save"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default EditAssignment;
