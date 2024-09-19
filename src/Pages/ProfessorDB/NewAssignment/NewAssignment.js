import React, { useState, useEffect } from "react";
import "react-calendar/dist/Calendar.css";
import "./NewAssignmentPage.css"; // Updated CSS file name

import {
  getAllCategoriesData,
  insertNewAssignment,
} from "../../../Slices/PorfessorSlice";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function NewAssignment() {
  const [assignmentName, setAssignmentName] = useState("");
  const [topicName, setTopicName] = useState("");
  const userId = sessionStorage["userId"];
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedWeeks, setSelectedWeeks] = useState([]);
  const navigator = useNavigate();

  const saveAssignment = async () => {
    if (
      !assignmentName ||
      !topicName ||
      !selectedCategories.length ||
      !selectedWeeks.length
    ) {
      toast.error("You Must Fill In All Fields");
      return;
    }
    setLoading(true);
    const categoryIds = selectedCategories.map((cat) => cat.Id);
    insertNewAssignment({
      Name: assignmentName,
      Topic: topicName,
      ProfessorId: parseInt(userId, 10),
      categories: categoryIds,
      weekNum: selectedWeeks,
    }).then((res) => console.log(res.msg));
    setLoading(false);
    toast("Requirement uploaded successfully", {
      type: "success",
    });
    navigator("/professor/Dashboard");
  };

  useEffect(() => {
    getAllCategoriesData().then((res) => {
      setCategories(res.msg);
    });
    // check if edit or insert
    if (sessionStorage.getItem("editAssignment")) {
      // get the assignment data
    }
  }, []);

  const handleWeekChange = (week) => {
    if (selectedWeeks.includes(week)) {
      setSelectedWeeks(selectedWeeks.filter((w) => w !== week));
    } else {
      setSelectedWeeks([...selectedWeeks, week]);
    }
  };

  const weeks = Array.from({ length: 20 }, (_, i) => i + 1); // Weeks 1 to 12

  return (
    <div className="newAssignmentPage-container">
      <div className="newAssignmentPage-content">
        <h2 className="newAssignmentPage-title">New Assignment</h2>
        <form onSubmit={(e) => e.preventDefault()}>
          <div className="newAssignmentPage-formGroup">
            <div className="newAssignmentPage-inputItem">
              <label htmlFor="assignmentName">Assignment Name</label>
              <input
                type="text"
                id="assignmentName"
                name="assignmentName"
                value={assignmentName}
                className="newAssignmentPage-inputField"
                placeholder="Enter assignment name"
                onChange={(e) => setAssignmentName(e.target.value)}
              />
            </div>
            <div className="newAssignmentPage-inputItem">
              <label htmlFor="topicName">Comments</label>
              <input
                type="text"
                id="topicName"
                name="topicName"
                value={topicName}
                className="newAssignmentPage-inputField"
                placeholder="Enter comments"
                onChange={(e) => setTopicName(e.target.value)}
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
                        checked={selectedCategories.some(
                          (selected) => selected.Id === cat.Id
                        )}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setSelectedCategories([...selectedCategories, cat]);
                          } else {
                            setSelectedCategories(
                              selectedCategories.filter(
                                (selected) => selected.Id !== cat.Id
                              )
                            );
                          }
                        }}
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
                  {weeks.slice(0, 8).map((week) => (
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
                  {weeks.slice(8, 16).map((week) => (
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

export default NewAssignment;
