import React, { useState, useEffect } from "react";
import "react-calendar/dist/Calendar.css";
import "./NewAssignmentPage.css"; // Updated CSS file name

import {
  getAllCategoriesData,
  insertNewAssignment,
  getSingleAssignmentData,
} from "../../Slices/PorfessorSlice";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function EditAssignment() {
  const [assignmentName, setAssignmentName] = useState("");
  const [topicName, setTopicName] = useState("");
  const userId = sessionStorage["userId"];
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedWeeks, setSelectedWeeks] = useState([]);
  const navigator = useNavigate();
  const assignmentId = parseInt(sessionStorage.getItem("editAssignment"));
  const [assignmentData, setAssignmentData] = useState({});
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // Make sure to pass the assignmentId in the request
        const response = await getSingleAssignmentData(assignmentId);

        console.log(response.msg);

        if (response.msg) {
          setAssignmentData(response.msg);
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

    // Call the async function
    fetchData();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [assignmentId]); // Add assignmentId as a dependency
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
  const saveAssignment = async () => {
    if (
      // !assignmentName ||
      // !topicName ||
      // !selectedCategories.length ||
      // !selectedWeeks.length
      false
    ) {
      toast.error("You Must Fill In All Fields");
      return;
    }
    setLoading(true);
    try {
      navigator("/professor/Dashboard");
    } catch (error) {
      console.error("Error:", error);
      toast.error("An error occurred");
    } finally {
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
                value={assignmentData.Name || ""}
                className="newAssignmentPage-inputField"
                placeholder="Enter assignment name"
                onChange={(e) => setAssignmentName(e.target.value)}
              />
            </div>
            <div className="newAssignmentPage-inputItem">
              <label htmlFor="topicName">Comment</label>
              <input
                type="text"
                id="topicName"
                name="topicName"
                value={assignmentData.Topic || ""}
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
                        checked={
                          assignmentData.categories &&
                          assignmentData.categories.some(
                            (cattt) => parseInt(cattt.categoryId) === cat.Id
                          )
                        }
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
                        checked={
                          assignmentData.weeks &&
                          assignmentData.weeks.some((cattt) => cattt === week)
                        }
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
                        checked={
                          assignmentData.weeks &&
                          assignmentData.weeks.some((cattt) => cattt === week)
                        }
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
