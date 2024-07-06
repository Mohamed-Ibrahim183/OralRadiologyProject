import React, { useState, useEffect } from "react";
import image from "./Dental_Xray.png";
import "./submit_page.css";
import Navbar from "../../Components/Navbar/Navbar";
import axios from "axios";
import { Navigate, useSearchParams } from "react-router-dom";
import IconButton from "@mui/material/IconButton";
import { ArrowBackIos, ArrowForwardIos, Delete } from "@mui/icons-material";
import { Box, Button, Fade, Menu, MenuItem } from "@mui/material";
import { axiosMethods } from "../Controller";

const AssignmentSubmission = () => {
  const [assignmentInfo, setAssignmentInfo] = useState({});
  const [searchParams, setSearchParams] = useSearchParams();
  const [files, setFiles] = useState([]);
  const [categories, setCategories] = useState({});
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const fetchAssignmentInfo = async () => {
      const assignmentId = sessionStorage.getItem("assignmentId");
      if (!assignmentId) {
        console.error("Assignment ID is not set in session storage.");
        return;
      }
      const url = `http://localhost/Projects/OralRadiology/AssignmentLogic.php/GetAssignment?assignmentId=${assignmentId}`;
      await axios
        .get(url)
        .then((res) => setAssignmentInfo(res.data))
        .catch((error) => console.error(error));
    };

    fetchAssignmentInfo();
  }, []);

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

    try {
      for (let i = 0; i < files.length; i++) {
        const formData = new FormData();
        formData.append("assignmentId", assignmentId);
        formData.append("StudentId", studentId);
        formData.append("file", files[i]);
        formData.append("category", categories[files[i].name]);

        new axiosMethods()
          .post(
            "http://localhost/Projects/OralRadiology/AssignmentLogic.php/UploadAssignmentImage",
            formData
          )
          .then((res) => {
            console.log(res.msg);
            setFiles([]);
            setCategories([]);
            setCurrentIndex(0);
          });
      }

      new axiosMethods()
        .post(
          "http://localhost/Projects/OralRadiology/AssignmentLogic.php/newSubmission",
          { studentId, assignmentId }
        )
        .then((res) => console.log("ss", res.msg));
      alert("Files uploaded successfully.");
    } catch (error) {
      console.error("Error uploading files:", error);
      alert("Failed to upload files.");
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
    return (
      <>
        <div className="assignment-info">
          <h2 className="assignment-submission-text">
            {assignmentInfo.Name} SUBMISSION
          </h2>
          <label htmlFor="submission-status">SUBMISSION STATUS</label>
          <input type="text" id="submission-status" disabled />
          <label htmlFor="grading-status">GRADING STATUS</label>
          <input type="text" id="grading-status" disabled />
          <label htmlFor="time-remaining">TIME REMAINING</label>
          <input type="text" id="time-remaining" disabled />
          <label htmlFor="file-upload">UPLOAD FILM</label>
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
          <button className="button btnB" type="button" onClick={handleSubmit}>
            CONFIRM
          </button>
        </div>
      </>
    );
  };

  const Feedback = () => {
    return (
      <div className="feedback">
        <h3>FEEDBACK</h3>
        <label htmlFor="grade">GRADE</label>
        <input type="text" id="grade" disabled />

        <label htmlFor="grade-on">GRADE ON</label>
        <input type="text" id="grade-on" disabled />

        <label htmlFor="grade-by">GRADE BY</label>
        <input type="text" id="grade-by" disabled />
      </div>
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
        {/* <Feedback /> */}
      </div>
    </>
  );
};

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
    new axiosMethods()
      .get(
        "http://localhost/Projects/OralRadiology/AssignmentLogic.php/GetCategories"
      )
      .then((res) => {
        setCats(res.msg);
      });
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
