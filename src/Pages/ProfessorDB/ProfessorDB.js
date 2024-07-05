import React, { useState, useEffect, useRef } from "react";
import Modal from "./Modal";
import AssignmentCard from "./AssignmentCard";
import Chart from "./Chart";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "./ProfessorDB.css";
import "./professor.css";
import { Link, Navigate } from "react-router-dom";
import Modal2 from "./Modal2";
import axios from "axios";
import Button from "@mui/material/Button";
import { Add, RestaurantMenu } from "@mui/icons-material";
import {
  Box,
  Paper,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  ThemeProvider,
  createTheme,
  Typography,
} from "@mui/material";
import { Table } from "react-bootstrap";
import { axiosMethods } from "../Controller";
import BasicModal from "../Users/Edit";
import BasicModalComp from "../../Components/BasicModal/BasicModalComp";

const ProfessorDB = () => {
  const professorName = sessionStorage.getItem("Name") || "Professor";
  const professorImage = sessionStorage.getItem("PersonalImage");
  const storedUserId = sessionStorage.getItem("userId");

  const [isModalOpen, setModalOpen] = useState(false);
  const [isModal2Open, setModal2Open] = useState(false);
  const [assignments, setAssignments] = useState([]);
  const [userId, setUserId] = useState(storedUserId);
  const [groups, setGroups] = useState([]);
  const [showCats, setShowCats] = useState(false);

  useEffect(() => {
    !storedUserId
      ? console.error("UserId not found in sessionStorage")
      : setUserId(storedUserId);

    axios
      .get("http://localhost/Projects/OralRadiology/AssignmentLogic.php/GetAll")
      .then((res) => {
        setAssignments(res.data);
      })
      .catch((error) => console.error(error));
  }, [storedUserId]);

  useEffect(() => {
    axios
      .get(
        "http://localhost/Projects/OralRadiology/AssignmentLogic.php/AssignmentGroupsShow"
      )
      .then((res) => {
        setGroups(res.data);
      })
      .catch((error) => console.error(error));
  }, []);

  if (sessionStorage.getItem("Type") !== "Professor") {
    return <Navigate to="/" />;
  }

  function GroupsInfos() {
    if (!groups.length) {
      return <div>Loading...</div>;
    }

    return (
      <TableContainer component={Paper}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="center">Group Name</TableCell>
              <TableCell align="center">Assignment Name</TableCell>
              <TableCell align="center">Open Time</TableCell>
              <TableCell align="center">Close Time</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {groups.map((row) => (
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
        </Table>
      </TableContainer>
    );
  }
  // const newTheme =

  // console.log('localStorage.getItem("Theme"):', localStorage.getItem("Theme"));
  const darkTheme = createTheme({
    palette: {
      // mode: darkMode ? "dark" : "light",
      mode: localStorage.getItem("Theme") === "Dark" ? "dark" : "light",
    },
  });

  return (
    <ThemeProvider theme={darkTheme}>
      <Modal isOpen={isModalOpen} onClose={() => setModalOpen(false)}></Modal>
      <Modal2 open={isModal2Open} onClose={() => setModal2Open(false)} />
      <div className="fullProfessorPage">
        <div className="upper">
          <div className="container AssignmentSection">
            {GroupsInfos()}
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
              {assignments &&
                assignments.map((assignment, i) => (
                  <AssignmentCard
                    key={i}
                    userId={userId}
                    assignmentId={assignment.Id}
                    name={assignment.Name}
                    info={`${assignment.Topic}, April 30, 2024, 1:00 pm`}
                    toPage={`/professor/Grading_Page?assignmentId=${assignment.Id}`}
                  />
                ))}
            </div>
            <h5 className="seal">See all →</h5>
            <Button
              variant="contained"
              color="primary"
              onClick={() => setShowCats(!showCats)}
            >
              {showCats ? "Hide Categories" : "Show Categories"}
            </Button>
            {showCats && <Categories />}
          </div>
          <div className="userProfile">
            <div className="TEXT">
              <img
                src={professorImage}
                alt="Professor Profile"
                style={{
                  width: "100px",
                  height: "100px",
                  borderRadius: "20px",
                  marginTop: "-20px",
                  marginBottom: "20px",
                }}
              />

              <h4>Welcome Back</h4>
              <h2>Dr. {professorName}</h2>
              <p>Welcome to our Oral Radiology system</p>
            </div>
            <Link to="/Profile" className="ProfileButton stdBtn">
              Go To Profile
            </Link>
          </div>
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
    </ThemeProvider>
  );
};

function Categories() {
  const [cats, setCats] = useState([]); // categories
  const [addCat, setAddCat] = useState(false);
  const [update, setUpdate] = useState(0);

  const element = useRef();
  useEffect(() => {
    new axiosMethods()
      .get(
        "http://localhost/Projects/OralRadiology/AssignmentLogic.php/GetCategories"
      )
      .then((res) => {
        setCats(res.msg);
      });
  }, [update]);
  // if (cats.length === 0) return;
  function addNewCategory() {
    new axiosMethods()
      .post(
        "http://localhost/Projects/OralRadiology/AssignmentLogic.php/addCategory",
        { Name: element.current.value }
      )
      .then((res) => {
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
              // value={category}
              // onChange={(e) => setCategory(e.target.value)}
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
        <TableContainer component={Paper}>
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
