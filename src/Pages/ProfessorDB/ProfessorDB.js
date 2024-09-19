import React, { useState, useEffect, useRef, useReducer } from "react";
// import Modal from "./Modal";
import AssignmentCard from "./AssignmentCard";
import Chart from "./Chart";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import Modal from "react-responsive-modal";
import "./professor.css";
import { Link, Navigate } from "react-router-dom";
import Modal2 from "./Modal2/Modal2";
import Button from "@mui/material/Button";
import {
  Box,
  Paper,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { Table } from "react-bootstrap";

import BasicModalComp from "../../Components/BasicModal/BasicModalComp";
import UserProfile from "../../Components/UserProfile";
import {
  addCategory,
  deleteAssignmentDB,
  deleteCategory,
  editCategory,
  getAllAssignmentsData,
  getAllCategoriesData,
  insertNewAssignment,
  getstartweek,
  updateStartWeek,
} from "../../Slices/PorfessorSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
  faSortAlphaDown,
  faSortAlphaUp,
  faSortNumericDown,
  faSortNumericUp,
} from "@fortawesome/free-solid-svg-icons";
import { getAssignmentsGroupsShow } from "../../Slices/PorfessorSlice";
import toast from "react-hot-toast";
import { validArray } from "../Controller";

function GroupsData() {
  const [isModalOpen, setModalOpen] = useState(false);
  const [groups, setGroups] = useState([]);
  const [loadingMessage, setLoadingMessage] = useState(
    "Loading Groups Data..."
  );
  const maxRetries = 2;

  useEffect(() => {
    const fetchData = (attempt = 0) => {
      getAssignmentsGroupsShow().then((res) => {
        if (res.msg.length > 0) setGroups(res.msg);
        else if (attempt < maxRetries)
          setTimeout(() => fetchData(attempt + 1), 1000);
        // Retry after 1 second
        else setLoadingMessage("No Groups Data");
      });
    };
    fetchData();
  }, []);

  const renderTableHeader = () => {
    return (
      <TableHead>
        <TableRow>
          <TableCell align="center">Group Name</TableCell>
          <TableCell align="center">Assignment Name</TableCell>
          <TableCell align="center">Open Time</TableCell>
          <TableCell align="center">Close Time</TableCell>
        </TableRow>
      </TableHead>
    );
  };

  const renderTableBody = () => {
    return (
      <TableBody>
        {groups.length > 0 &&
          Array.isArray(groups) &&
          groups.map((row) => (
            <TableRow
              key={row.Assignment + row.open}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.group}
              </TableCell>
              <TableCell align="center">{row.Assignment}</TableCell>
              <TableCell align="center">{row.openTime}</TableCell>
              <TableCell align="center">{row.closeTime}</TableCell>
            </TableRow>
          ))}
      </TableBody>
    );
  };

  return (
    <div>
      <Button
        variant="contained"
        color="primary"
        onClick={() => setModalOpen(true)}
        className="profDB_UpperButton"
      >
        Groups & Assignments
      </Button>
      <BasicModalComp
        openModal={isModalOpen}
        closeModal={() => setModalOpen(false)}
      >
        <div className="GroupsModal">
          <TableContainer component={Paper} className="GroupsModalContent">
            <Table aria-label="simple table">
              {renderTableHeader()}
              {renderTableBody()}
            </Table>
          </TableContainer>
          {!groups.length && <div>{loadingMessage}</div>}
        </div>
      </BasicModalComp>
    </div>
  );
}

function AddRequirementModal({ isOpen, onClose }) {
  const [assignmentName, setAssignmentName] = useState("");
  const [topicName, setTopicName] = useState("");
  const [maxImages, setMaxImages] = useState("");
  const userId = sessionStorage["userId"];
  const [loading, setLoading] = useState(false); // State to handle loading status
  const [categories, setcategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const saveAssignment = async () => {
    console.log(selectedCategories);

    if (!assignmentName || !topicName) {
      alert("Please fill in all fields.");
      return;
    }
    setLoading(true);
    insertNewAssignment({
      Name: assignmentName,
      Topic: topicName,
      maxLimitImages: parseInt(maxImages, 10),
      ProfessorId: parseInt(userId, 10),
    }).then((res) => console.log(res.msg));
    setLoading(false);
    onClose();
  };
  useEffect(() => {
    getAllCategoriesData().then((res) => {
      setcategories(res.msg);
      //console.log(res.msg);
    });
  }, []);

  if (!isOpen) return null;

  return (
    <>
      <BasicModalComp openModal={isOpen} closeModal={onClose}>
        <div className="modal">
          <div className="modal-content">
            <h2 style={{ marginBottom: "10px" }}>New Requirement</h2>
            <form onSubmit={(e) => e.preventDefault()}>
              <div className="form-group">
                <section className="AddRequirementModal-InputItem">
                  <label htmlFor="requirementName">Name</label>
                  <input
                    type="text"
                    id="requirementName"
                    name="requirementName"
                    value={assignmentName}
                    className="Inputt"
                    placeholder="Requirement Name"
                    onChange={(e) => setAssignmentName(e.target.value)}
                  />
                </section>
                <section className="AddRequirementModal-InputItem">
                  <label htmlFor="topicName">Add a comment</label>
                  <input
                    type="text"
                    id="topicName"
                    name="topicName"
                    className="Inputt"
                    placeholder="Write a comment"
                    value={topicName}
                    onChange={(e) => setTopicName(e.target.value)}
                  />
                </section>
                {/* <section className="AddRequirementModal-InputItem">
                  <label htmlFor="maxImages">Maximum Number of Images:</label>
                  <input
                    type="number"
                    id="maxImages"
                    name="maxImages"
                    className="Inputt"
                    value={maxImages}
                    onChange={(e) => setMaxImages(e.target.value)}
                  />
                </section> */}
                {/* //Mon3m working here */}
                <section className="AddRequirementModal-InputItem">
                  <label htmlFor="topicName">Category</label>
                  <div className="Inputt-requirementCateogries">
                    {Array.isArray(categories) &&
                      categories.map((cat) => (
                        <div key={cat.Id}>
                          <input
                            type="checkbox"
                            id={`checkcat-${cat.Id}`}
                            value={cat.Id}
                            style={{ marginRight: "8px" }}
                            checked={selectedCategories.some(
                              (selected) => selected.Id === cat.Id
                            )}
                            onChange={(e) => {
                              // console.log(selectedCategories);
                              if (e.target.checked) {
                                setSelectedCategories([
                                  ...selectedCategories,
                                  cat,
                                ]); // Add the whole category object
                              } else {
                                setSelectedCategories(
                                  selectedCategories.filter(
                                    (selected) => selected.Id !== cat.Id
                                  ) // Remove based on the Id
                                );
                              }
                            }}
                          />
                          <label htmlFor={`checkcat-${cat.Id}`}>
                            {cat.Name}
                          </label>
                        </div>
                      ))}
                  </div>
                </section>
                <section className="AddRequirementModal-InputItem">
                  <label htmlFor="week">Week</label>
                  <input type="num" id="week" name="week" className="Inputt" />
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
      </BasicModalComp>
    </>
  );
}

const ProfessorDB = () => {
  const professorName = sessionStorage.getItem("Name") || "Professor";
  const professorImage = sessionStorage.getItem("PersonalImage");
  const storedUserId = sessionStorage.getItem("userId");

  const [isModalOpen, setModalOpen] = useState(false);
  const [isModal2Open, setModal2Open] = useState(false);
  const [assignments, setAssignments] = useState([]);
  const [userId, setUserId] = useState(storedUserId);
  const [showCats, setShowCats] = useState(false);

  const [updateAssignments, setUpdateAssignments] = useState(0);
  const [filter, setFilter] = useState("All");
  const [sortingType, setSortingType] = useState("Name");
  const [sortingOrder, setSortingOrder] = useState("asc");
  const [filteredAssignments, setFilteredAssignments] = useState([]);
  const [startWeek, setStartWeek] = useState();
  const [oldStartWeek, setOldStartWeek] = useState();

  function DeleteAssignment(assignmentId) {
    deleteAssignmentDB(assignmentId);
    setUpdateAssignments(updateAssignments + 1);
  }

  useEffect(() => {
    !storedUserId
      ? console.error("UserId not found in sessionStorage")
      : setUserId(storedUserId);
    getAllAssignmentsData().then((res) => setAssignments(res.msg || []));
  }, [storedUserId, updateAssignments]);

  useEffect(() => {
    const filterAndSortAssignments = () => {
      const now = new Date();
      let filtered = [];

      if (filter === "Completed") {
        filtered = assignments.filter(
          (assignment) =>
            new Date(assignment.open) <= now && new Date(assignment.close) < now
        );
      } else if (filter === "Inprogress") {
        filtered = assignments.filter(
          (assignment) =>
            new Date(assignment.open) <= now &&
            new Date(assignment.close) >= now
        );
      } else if (filter === "Upcoming") {
        filtered = assignments.filter(
          (assignment) => new Date(assignment.open) > now
        );
      } else {
        filtered = assignments;
      }

      if (Array.isArray(filtered)) {
        if (sortingType === "Name") {
          filtered.sort((a, b) => {
            if (a.Name < b.Name) return sortingOrder === "asc" ? -1 : 1;
            if (a.Name > b.Name) return sortingOrder === "asc" ? 1 : -1;
            return 0;
          });
        } else if (sortingType === "OpenDate") {
          filtered.sort((a, b) => {
            if (new Date(a.open) < new Date(b.open))
              return sortingOrder === "asc" ? -1 : 1;
            if (new Date(a.open) > new Date(b.open))
              return sortingOrder === "asc" ? 1 : -1;
            return 0;
          });
        }
      } else {
        console.error("Filtered is not an array:", filtered);
      }
      setFilteredAssignments(filtered);
    };
    filterAndSortAssignments();
  }, [assignments, filter, sortingType, sortingOrder]);
  const toggleSortingOrder = () => {
    setSortingOrder(sortingOrder === "asc" ? "desc" : "asc");
  };

  const getstartweeek = () => {
    getstartweek()
      .then((res) => {
        setStartWeek(res.msg[0].Day || "");
        setOldStartWeek(res.msg[0].Day || "");
      })
      .catch((err) => console.log(err))
      .finally(() => {});
  };
  const handleStartWeekChange = () => {
    // console.log("start week changed");
    updateStartWeek(String(startWeek))
      .then((res) => console.log(res.msg))
      .catch((err) => console.error(err));
  };
  //console.log(startWeek);
  useEffect(() => {
    getstartweeek();
  }, []);

  const getStatusProps = (assignment) => {
    const now = new Date();
    const openDate = new Date(assignment.open);
    const closeDate = new Date(assignment.close);

    if (openDate <= now && closeDate < now) {
      return { state: "closed", col: "red", remaining: 0 };
    } else if (openDate <= now && closeDate >= now) {
      const remainingTime = (closeDate - now) / 60000; // remaining time in minutes
      let remaining;

      if (remainingTime > 1440) {
        // more than 24 hours
        remaining = `${Math.round(remainingTime / 1440)} days remaining`;
      } else {
        if (remainingTime > 60) {
          // more than 60 minutes
          remaining = `${Math.round(remainingTime / 60)} hours remaining`;
        } else {
          if (remainingTime < 60) {
            // less than 60 minutes
            remaining = `${Math.round(remainingTime)} minutes remaining`;
          }
        }
      }
      return { state: "inprogress", col: "blue", remaining };
    } else if (openDate > now) {
      return { state: "upcoming", col: "green", remaining: null };
    }
    return { state: "unknown", col: "grey", remaining: null };
  };

  const AssignmentsContainer = () => {
    const [categoriesModal, setCategoriesModal] = useState(false);
    const [startWeekModal, setStartWeekModal] = useState(false);
    const openStartWeekChangeModal = () => setStartWeekModal(true);
    const closeStartWeekChangeModal = () => setStartWeekModal(false);

    if (sessionStorage.getItem("Type") !== "Professor") {
      return <Navigate to="/" />;
    }
    return (
      <div className="container AssignmentSection">
        <div className="profDB_UpperButtons">
          <GroupsData />
          {/* <Link to="/professor/NewAssignment">
            <Button
              variant="contained"
              color="primary"
              // onClick={() => setModalOpen(true)}
              // endIcon={<Add />}

              className="profDB_UpperButton"
            >
              Add Requirement
            </Button>
          </Link> */}
          <Button
            variant="contained"
            color="primary"
            onClick={() => setCategoriesModal(!categoriesModal)}
            className="profDB_UpperButton"
          >
            Categories
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={() => {
              setStartWeekModal(!startWeekModal);
            }}
            className="profDB_UpperButton"
          >
            Start Week
          </Button>
        </div>
        <BasicModalComp
          openModal={categoriesModal}
          closeModal={() => setCategoriesModal(false)}
        >
          {<Categories />}
        </BasicModalComp>
        <BasicModalComp
          openModal={startWeekModal}
          closeModal={() => setStartWeekModal(false)}
        >
          <div className="startWeekModal">
            <div className="upperPart">
              <label>
                <h3>Start Week</h3>
              </label>
              <br></br>
              <input
                type="date"
                value={
                  startWeek
                    ? new Date(startWeek).toISOString().substr(0, 10)
                    : ""
                }
                className="startWeekModalInput"
                onChange={(e) => setStartWeek(e.target.value)}
              />
            </div>
            <div className="buttons">
              <Button
                className="changeStartWeek"
                variant="contained"
                color="primary"
                onClick={() => {
                  setOldStartWeek(startWeek);
                  handleStartWeekChange();
                  setStartWeekModal(false);
                }}
              >
                Change Start Week
              </Button>
              <Button
                className="cancelStartWeek"
                variant="contained"
                onClick={() => {
                  setStartWeek(oldStartWeek);
                  setStartWeekModal(false);
                }}
              >
                Cancel
              </Button>
            </div>
          </div>
        </BasicModalComp>
        <div className="BBBBBB">
          <h2 className="sectionTitle">My Requirements</h2>
          <div className="FilterandSorting">
            <div className="sortingOptions">
              <FontAwesomeIcon
                icon={
                  sortingType === "Name" && sortingOrder === "asc"
                    ? faSortAlphaDown
                    : faSortAlphaUp
                }
                className={`sortingOption ${
                  sortingType === "Name" ? "selected" : ""
                }`}
                onClick={() => {
                  setSortingType("Name");
                  toggleSortingOrder();
                }}
              />
              <FontAwesomeIcon
                icon={
                  sortingType === "OpenDate" && sortingOrder === "asc"
                    ? faSortNumericDown
                    : faSortNumericUp
                }
                className={`sortingOption ${
                  sortingType === "OpenDate" ? "selected" : ""
                }`}
                onClick={() => {
                  setSortingType("OpenDate");
                  toggleSortingOrder();
                }}
              />
            </div>
          </div>
        </div>
        <div className="cardAssignment">
          {validArray(filteredAssignments) &&
            filteredAssignments.map((assignment, i) => (
              <AssignmentCard
                key={i}
                userId={userId}
                assignmentId={assignment.Id}
                onDelete={DeleteAssignment}
                name={assignment.Name}
                info={`${assignment.Topic}`}
                toPage={`/professor/Grading_Page?assignmentId=${assignment.Id}`}
              />
            ))}
        </div>
      </div>
    );
  };

  return (
    <>
      <AddRequirementModal
        isOpen={isModalOpen}
        onClose={() => {
          setModalOpen(false);
          setUpdateAssignments(updateAssignments + 1);
        }}
      />
      <Modal2 open={isModal2Open} onClose={() => setModal2Open(false)} />
      <div className="fullProfessorPage">
        <div className="upper">
          {AssignmentsContainer()}
          <UserProfile
            professorImage={professorImage}
            professorName={"Dr. " + professorName}
          />
        </div>
        <div className="lower">
          <div className="cc1">
            <Chart className="chart1" />
          </div>
          <div className="calender">
            <h2>Calendar</h2>
            <Calendar />
          </div>
        </div>
      </div>
    </>
  );
};

function Categories() {
  const initialState = {
    cats: [],
    update: 0,
    addCatModal: false,
    editCatModal: false,
    deleteCatModal: false,
    newCatName: "",
    workingCat: {},
  };
  function catsReducer(state, action) {
    switch (action.type) {
      case "setCategories":
        return { ...state, cats: action.payload };
      case "update":
        return { ...state, update: state.update + 1 };
      case "updateDefault":
        return {
          ...state,
          update: state.update + 1,
          addCatModal: false,
          editCatModal: false,
          deleteCatModal: false,
          newCatName: "",
        };
      case "openAddCatModal":
        return { ...state, addCatModal: true };
      case "openDeleteCatModal":
        return { ...state, deleteCatModal: true, workingCat: action.payload };
      case "openEditCatModal":
        return { ...state, editCatModal: true, workingCat: action.payload };
      case "setWorkingCat":
        return { ...state, workingCat: action.payload };
      case "setNewName":
        return { ...state, newCatName: action.payload };
      default:
        return state;
    }
  }
  const [state, dispatch] = useReducer(catsReducer, initialState);

  const element = useRef();
  useEffect(() => {
    getAllCategoriesData().then((res) =>
      dispatch({ type: "setCategories", payload: res.msg })
    );
  }, [state.update]);

  function addNewCategory() {
    addCategory({ Name: element.current.value }).then((res) =>
      dispatch({ type: "updateDefault" })
    );
  }
  function AddCategoryComp() {
    return (
      <BasicModalComp
        openModal={state.addCatModal}
        closeModal={() => dispatch({ type: "updateDefault" })}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            gap: 2,
          }}
        >
          <Typography variant="h5" color="inherit">
            Adding a New Category
          </Typography>
          <form>
            <input
              ref={element}
              type="text"
              placeholder="Name of the Category Here"
            />
          </form>
        </Box>
        <Box sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}>
          <Button variant="contained" color="primary" onClick={addNewCategory}>
            Submit
          </Button>
          <Button
            variant="outlined"
            color="error"
            onClick={() => dispatch({ type: "updateDefault" })}
          >
            Cancel
          </Button>
        </Box>
      </BasicModalComp>
    );
  }
  function editingCategoryModal() {
    return (
      <BasicModalComp
        openModal={state.editCatModal}
        closeModal={() => dispatch({ type: "updateDefault" })}
      >
        <Typography variant="subtitle1" color="inherit">
          Are You want to Re name the {state.workingCat.Name}
        </Typography>
        <form
          onSubmit={() => {
            editCategory(state.workingCat.Id, state.newCatName);
            dispatch({ type: "updateDefault" });
            toast("Category edited successfully", {
              type: "success",
            });
          }}
          style={{ display: "flex", flexDirection: "column", gap: "20px" }}
        >
          <input
            type="text"
            placeholder="Name of the category"
            value={state.newCatName}
            onChange={(e) =>
              dispatch({ type: "setNewName", payload: e.target.value })
            }
          />
          <Button variant="contained" color="primary" type="submit">
            Re Name category
          </Button>
        </form>
      </BasicModalComp>
    );
  }
  function deletingCategoryModal() {
    return (
      <BasicModalComp
        openModal={state.deleteCatModal}
        closeModal={() => dispatch({ type: "updateDefault" })}
      >
        <Box sx={{ m: 2 }}>
          <Typography variant="subtitle1" color="inherit">
            Are You want to Delete the {state.workingCat.Name} Category?
          </Typography>
          <Box sx={{ display: "flex", gap: 4, m: 1 }}>
            <Button
              variant="outlined"
              color="warning"
              onClick={() => dispatch({ type: "updateDefault" })}
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              color="error"
              onClick={() => {
                deleteCategory(state.workingCat.Id).then((res) =>
                  dispatch({ type: "updateDefault" })
                );
              }}
            >
              Delete Category
            </Button>
          </Box>
        </Box>
      </BasicModalComp>
    );
  }
  return (
    <div className="cateogriesModal">
      {state.addCatModal && <AddCategoryComp />}
      {state.editCatModal && editingCategoryModal()}
      {state.deleteCatModal && deletingCategoryModal()}
      <div className="categoriesList">
        <h3 className="categoriesListTitle">Categories</h3>
        <div className="categoriesListItems">
          {validArray(state.cats) &&
            state.cats.map((cat) => (
              <div className="categoriesListItem" key={cat.Id}>
                <p>{cat.Name}</p>
                <div>
                  <Button
                    variant="outlined"
                    color="secondary"
                    onClick={() =>
                      dispatch({ type: "openEditCatModal", payload: cat })
                    }
                  >
                    Edit
                  </Button>
                  <Button
                    variant="outlined"
                    color="error"
                    onClick={() => {
                      dispatch({ type: "openDeleteCatModal", payload: cat });
                    }}
                  >
                    Delete
                  </Button>
                </div>
              </div>
            ))}
        </div>
      </div>
      <Button
        variant="outlined"
        color="primary"
        onClick={() => {
          dispatch({ type: "openAddCatModal" });
        }}
        className="addCategoryBtn"
      >
        Add Category
      </Button>
    </div>
  );
}

export default ProfessorDB;
