import React, { useState, useEffect, useRef } from "react";
// import Modal from "./Modal";
import AssignmentCard from "./AssignmentCard";
import Chart from "./Chart";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

import "./professor.css";
import { Navigate } from "react-router-dom";
import Modal2 from "./Modal2";
import Button from "@mui/material/Button";
import { Add } from "@mui/icons-material";
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
  getAllAssignmentsData,
  getAllCategoriesData,
  insertNewAssignment,
} from "../../Slices/PorfessorSlice";
import { getAssignmentsGroupsShow } from "../../Slices/PorfessorSlice";

function GroupsData() {
  const [groups, setGroups] = useState([]);
  const [showGroups, setShowGroups] = useState(false);
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
    <>
      <Button
        variant="contained"
        color="primary"
        onClick={() => setShowGroups(!showGroups)}
      >
        {showGroups ? "Hide" : "Show"} Groups & Assignments
      </Button>
      {showGroups ? (
        <TableContainer component={Paper}>
          <Table aria-label="simple table">
            {renderTableHeader()}
            {renderTableBody()}
          </Table>
        </TableContainer>
      ) : (
        ""
      )}
      {!groups.length && <div>{loadingMessage}</div>}
    </>
  );
}
function AddRequirementModal({ isOpen, onClose }) {
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
    insertNewAssignment({
      Name: assignmentName,
      Topic: topicName,
      maxLimitImages: parseInt(maxImages, 10),
      ProfessorId: parseInt(userId, 10),
    }).then((res) =>
      res.msg === "Inserted"
        ? alert("The New Assignment Inserted Successfully")
        : null
    );
    setLoading(false);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <>
      <BasicModalComp openModal={isOpen} closeModal={onClose}>
        <div className="modal">
          <div className="modal-content">
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

  if (sessionStorage.getItem("Type") !== "Professor") {
    return <Navigate to="/" />;
  }
  const AssignmentsContainer = () => {
    return (
      <div className="container AssignmentSection">
        <GroupsData />
        <div className="BBBBBB">
          <h2 className="sectionTitle">My Assignments</h2>
          <Button
            variant="contained"
            color="secondary"
            onClick={() => setModalOpen(true)}
            endIcon={<Add />}
          >
            Add Requirement
          </Button>
        </div>
        <div className="cardAssignment">
          {Array.isArray(assignments) &&
            assignments.length > 0 &&
            assignments.map((assignment, i) => (
              <AssignmentCard
                key={i}
                userId={userId}
                assignmentId={assignment.Id}
                onDelete={DeleteAssignment}
                name={"Name: " + assignment.Name}
                info={`Topic: ${assignment.Topic}`}
                toPage={`/professor/Grading_Page?assignmentId=${assignment.Id}`}
              />
            ))}
        </div>
        <Button
          variant="contained"
          color="primary"
          onClick={() => setShowCats(!showCats)}
        >
          {showCats ? "Hide Categories" : "Show Categories"}
        </Button>
        {showCats && <Categories />}
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
  const [cats, setCats] = useState([]); // categories
  const [addCat, setAddCat] = useState(false);
  const [update, setUpdate] = useState(0);

  const element = useRef();
  useEffect(() => {
    getAllCategoriesData().then((res) => setCats(res.msg));
  }, [update]);
  // if (cats.length === 0) return;
  function addNewCategory() {
    addCategory({ Name: element.current.value }).then((res) => {
      console.log(res.msg);
      setUpdate(update + 1);
      setAddCat(false);
    });
  }
  function AddCategoryComp() {
    return (
      <BasicModalComp openModal={addCat} closeModal={() => setAddCat(false)}>
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
            onClick={() => setAddCat(false)}
          >
            Cancel
          </Button>
        </Box>
      </BasicModalComp>
    );
  }
  return (
    <Box>
      {addCat && <AddCategoryComp />}
      {cats.length > 0 && (
        <TableContainer component={Paper} sx={{ width: "fit-content" }}>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="center">Category Name</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {cats.map((row) => (
                <TableRow
                  key={row.Name + row.Id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell align="center">{row.Name}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
      <Button
        variant="outlined"
        color="secondary"
        onClick={() => {
          setAddCat(!addCat);
        }}
      >
        Add Category
      </Button>
    </Box>
  );
}

export default ProfessorDB;
