import React, { useState, useEffect } from "react";
import "react-calendar/dist/Calendar.css";
import "./NewAssignmentPage.css"; // Updated CSS file name

import {
  getAllCategoriesData,
  insertNewAssignment,
} from "../../Slices/PorfessorSlice";
function NewAssignment() {
  const [assignmentName, setAssignmentName] = useState("");
  const [topicName, setTopicName] = useState("");
  const [maxImages, setMaxImages] = useState("");
  const userId = sessionStorage["userId"];
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [weekNum, setweekNum] = useState();
  const saveAssignment = async () => {
    console.log(selectedCategories);
    if (!assignmentName || !topicName || !selectedCategories) {
      alert("Please fill in all fields.");
      return;
    }
    setLoading(true);
    const categoryIds = selectedCategories.map((cat) => cat.Id);
    console.log(categoryIds);
    insertNewAssignment({
      Name: assignmentName,
      Topic: topicName,
      ProfessorId: parseInt(userId, 10),
      categories: categoryIds,
      weekNum: weekNum,
    }).then((res) => console.log(res.msg));
    setLoading(false);
  };

  useEffect(() => {
    getAllCategoriesData().then((res) => {
      setCategories(res.msg);
    });
  }, []);

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
                {categories.map((cat) => (
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
              <label htmlFor="weekNumber">Week Number</label>
              <input
                type="number"
                id="weekNumber"
                name="weekNumber"
                onChange={(e) => {
                  setweekNum(parseInt(e.target.value));
                }}
                className="newAssignmentPage-inputField"
                placeholder="Enter week number"
              />
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
