import React, { useState, useEffect } from "react";
import image from "./Dental_Xray.png";
import "./submit_page.css";
import "./assignmentpage.css";

import { Navigate, useSearchParams } from "react-router-dom";
import IconButton from "@mui/material/IconButton";
import { ArrowBackIos, ArrowForwardIos } from "@mui/icons-material";
import { Box, Button, Fade, Menu, MenuItem } from "@mui/material";
import AssignmentCard from "../StudentDashBoard/AssignmentCard";
import {
  getAssignmentData,
  getSubmissionUserAssignment,
  makeNewSubmission,
  uploadNewAssignmentImage,
} from "../../Slices/StudentSlice";
import { getAllCategoriesData } from "../../Slices/PorfessorSlice";

const AssignmentSubmission = () => {
  const [assignmentInfo, setAssignmentInfo] = useState({});
  const [searchParams, setSearchParams] = useSearchParams();
  const [files, setFiles] = useState([]);
  const [categories, setCategories] = useState({});
  const [currentIndex, setCurrentIndex] = useState(0);
  const [update, setUpdate] = useState(0);
  const state = sessionStorage.getItem("state");

  useEffect(() => {
    const fetchAssignmentInfo = async () => {
      const assignmentId = sessionStorage.getItem("assignmentId");
      if (!assignmentId) {
        console.error("Assignment ID is not set in session storage.");
        return;
      }
      await getAssignmentData({
        assignmentId: assignmentId,
      }).then((res) => setAssignmentInfo(res.msg));
    };

    fetchAssignmentInfo();
  }, []);
  // console.log(assignmentInfo);

  if (sessionStorage["Type"] !== "Student") {
    return <Navigate to="/" />;
  }

  const handleFileChange = (event) => {
    const selectedFiles = Array.from(event.target.files);
    setFiles(selectedFiles);
    const initialCategories = {};
    selectedFiles.forEach((file) => {
      initialCategories[file.name] = "";
    });
    setCategories(initialCategories);
  };

  const deleteFile = (index) => {
    const newFiles = files.filter((_, i) => i !== index);
    setFiles(newFiles);
    const newCategories = { ...categories };
    delete newCategories[files[index].name];
    setCategories(newCategories);
    if (currentIndex > 0) setCurrentIndex(currentIndex - 1);
  };

  const deleteLastFile = () => {
    setFiles([]);
    setCategories({});
    setCurrentIndex(0);
  };

  const handleSubmit = async () => {
    if (files.length > assignmentInfo.maxLimitImages) {
      alert(
        `You can only upload up to ${assignmentInfo.maxLimitImages} images.`
      );
      return;
    }
    if (files.length === 0) {
      alert("The Files is empty");
      return;
    }

    const assignmentId = searchParams.get("assignmentId");
    const studentId = searchParams.get("userId");
    let flagCategories = true;
    Object.keys(categories).forEach((ele) => {
      if (categories[ele] === "") flagCategories = false;
    });
    if (flagCategories === false) {
      alert("You must fill the categories of each Film before submit");
      return;
    }

    try {
      let lastSubmission = -1;
      async function saveSubmission() {
        await makeNewSubmission({ studentId, assignmentId }).then(
          (res) => (lastSubmission = res.msg)
        );
      }
      await saveSubmission();
      for (let i = 0; i < files.length; i++) {
        console.log("before");
        console.log(files[i]);

        uploadNewAssignmentImage({
          assignmentId,
          StudentId: studentId,
          file: files[i],
          category: categories[files[i].name],
          submission: lastSubmission,
        }).then((res) => {
          console.log(res.msg);
          setFiles([]);
          setCategories([]);
          setCurrentIndex(0);
        });
      }

      alert("Files uploaded successfully.");
    } catch (error) {
      console.error("Error uploading files:", error);
      alert("Failed to upload files.");
    } finally {
      setUpdate(update + 1);
    }
  };

  const handleCategoryChange = (category) => {
    const newCategories = { ...categories };
    newCategories[files[currentIndex].name] = category;
    setCategories(newCategories);
    // setAnchorEl(null);
  };

  const nextImage = () => {
    if (currentIndex < files.length - 1) setCurrentIndex(currentIndex + 1);
  };

  const prevImage = () => {
    if (currentIndex > 0) setCurrentIndex(currentIndex - 1);
  };

  const AssignmentInfo = () => {
    const remainingTime = sessionStorage.getItem("RemainingTime");
    return (
      <>
        <div className="assignment-info">
          <h2 className="assignment-submission-text">
            {assignmentInfo.Name} SUBMISSION
          </h2>
          <label htmlFor="submission-status">SUBMISSION STATUS</label>
          <input
            type="text"
            id="submission-status"
            value={state}
            style={{
              color:
                state === "closed"
                  ? "red"
                  : state === "inprogress"
                  ? "green"
                  : "defaultColor",
            }}
            disabled
          />
          <label htmlFor="grading-status">GRADING STATUS</label>
          <input type="text" id="grading-status" disabled />
          <label htmlFor="time-remaining">TIME REMAINING</label>
          <input
            type="text"
            id="time-remaining"
            value={remainingTime}
            style={{
              color:
                state === "closed"
                  ? "red"
                  : state === "inprogress"
                  ? "green"
                  : "defaultColor",
            }}
            disabled
          />
          {state === "inprogress" && (
            <label htmlFor="file-upload">UPLOAD FILM</label>
          )}
          {state === "closed" && (
            <label htmlFor="file-upload">UPLOAD Closed</label>
          )}
          {state === "inprogress" && (
            <div className="upoladLogics">
              <input
                type="file"
                id="file-upload"
                multiple
                onChange={handleFileChange}
              />
              <ul>
                {files.map((file, index) => (
                  <li key={index}>
                    {file.name}{" "}
                    <button onClick={() => deleteFile(index)}>Delete</button>
                  </li>
                ))}
              </ul>
              <button
                className="button btnA"
                type="button"
                onClick={deleteLastFile}
              >
                DELETE ALL
              </button>
              <button
                className="button btnB"
                type="button"
                onClick={handleSubmit}
              >
                CONFIRM
              </button>
            </div>
          )}
        </div>
      </>
    );
  };

  function DeleteFilm() {
    const newFiles = files.filter((_, i) => i !== currentIndex);
    setFiles(newFiles);
    const newCategories = { ...categories };
    delete newCategories[files[currentIndex].name];
    setCategories(newCategories);
    if (currentIndex > 0) setCurrentIndex(currentIndex - 1);
  }

  return (
    <>
      <div className="container_monemm">
        <div className="monem">
          <h2 className="assignment-submission-text2">
            REQUIREMENT SUBMISSION
          </h2>
          <Header
            assignmentInfo={assignmentInfo}
            files={files}
            categories={categories}
            currentIndex={currentIndex}
            nextImage={nextImage}
            prevImage={prevImage}
            handleCategoryChange={handleCategoryChange}
            onDelete={DeleteFilm}
          />
          <AssignmentInfo />
        </div>
      </div>
      <Submissions assignment={assignmentInfo} update={update} />
    </>
  );
};
function Submissions({ assignment, update }) {
  const [submissions, setSubmissions] = useState([]);
  useEffect(() => {
    getSubmissionUserAssignment({
      userId: sessionStorage.getItem("userId"),
      assignmentId: sessionStorage.getItem("assignmentId"),
    }).then((res) => setSubmissions(res.msg));
  }, [update]);

  return (
    <div className="container_monemm">
      {submissions.length > 0 &&
        Array.isArray(submissions) &&
        submissions.map((sub) => {
          return (
            <AssignmentCard
              key={`${sub.Id}${sub.studentId}${sub.assignmentId}${sub.submitTime}`}
              name={assignment.Name || "Assignment Name"}
              // state="Good"
              grade={
                `${sub.Grade["Total"]} / ${sub.Grade["count"] * 100}` || "Grade"
              }
              info={`Topic: ${assignment.Topic} | SubmitTime:${sub.submitTime}`}
              col="#0082e6"
            />
          );
        })}
    </div>
  );
}

const Header = ({
  assignmentInfo,
  files,
  categories,
  currentIndex,
  nextImage,
  prevImage,
  handleCategoryChange,
  onDelete,
}) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [cats, setCats] = useState([]);
  useEffect(() => {
    getAllCategoriesData().then((res) => setCats(res.msg));
  }, []);
  const openMenuCats = Boolean(anchorEl);

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className="header">
      <div className="submit_images">
        {files.length > 0 ? (
          <>
            <Box sx={{ display: "flex", position: "relative" }}>
              <IconButton onClick={prevImage} disabled={currentIndex === 0}>
                <ArrowBackIos fontSize="20" />
              </IconButton>
              <img
                style={{ width: "100%" }}
                src={URL.createObjectURL(files[currentIndex])}
                alt={files[currentIndex].name}
                className="uploaded-image"
              />
              <IconButton
                size="large"
                onClick={nextImage}
                disabled={currentIndex === files.length - 1}
              >
                <ArrowForwardIos fontSize="20" />
              </IconButton>
            </Box>
            <div className="category-selection">
              <Button
                variant="contained"
                color="primary"
                onClick={(e) => setAnchorEl(e.currentTarget)}
              >
                {categories[files[currentIndex].name] || "Select the Category"}
              </Button>
              <Button
                variant="outlined"
                color="error"
                onClick={() => {
                  onDelete();
                }}
              >
                Delete This Film
              </Button>
              <Menu
                id="fade-menu"
                MenuListProps={{
                  "aria-labelledby": "fade-button",
                }}
                anchorEl={anchorEl}
                open={openMenuCats}
                onClose={handleClose}
                TransitionComponent={Fade}
              >
                {cats.length > 0 &&
                  cats.map((cat) => {
                    return (
                      <MenuItem
                        key={cat.Id + cat.Name}
                        onClick={() => {
                          handleCategoryChange(cat.Name);
                          setAnchorEl(null);
                        }}
                      >
                        {cat.Name}
                      </MenuItem>
                    );
                  })}
              </Menu>
            </div>
          </>
        ) : (
          <img src={image} alt="Teeth Film" className="xray_image" />
        )}
      </div>
      <p>{`Max Limit of Images: ${
        assignmentInfo.maxLimitImages || "Loading.."
      }`}</p>
      <br />
      <p>The Grade of The Requirement Will Appear Here Once Evaluated</p>
    </div>
  );
};

export default AssignmentSubmission;
