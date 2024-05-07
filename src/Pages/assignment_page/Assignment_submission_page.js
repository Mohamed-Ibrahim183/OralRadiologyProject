import React, { useState, useEffect } from "react";
import image from './Dental_Xray.png';
import "./submit_page.css";
import Navbar from "../../Components/Navbar/Navbar";
import axios from 'axios';

const AssignmentSubmission = () => {
  const [assignmentInfo, setAssignmentInfo] = useState({});
  
  useEffect(() => {
    const fetchAssignmentInfo = async () => {
      try {
        const assignmentId = sessionStorage.getItem('assignmentId');
        if (!assignmentId) {
          console.error("Assignment ID is not set in session storage.");
          return;
        }
        const response = await axios.get(`http://localhost/Projects/OralRadiology/get_ass_info.php?assignmentId=${assignmentId}`);
        if (response.data && !response.data.error) {
          setAssignmentInfo(response.data);
        } else {
          throw new Error(response.data.error || "Unknown error");
        }
      } catch (error) {
        console.error("Error fetching assignment info:", error);
      }
    };
  
    fetchAssignmentInfo();
  }, []);
  

  const AssignmentInfo = () => {
    const [files, setFiles] = useState([]);
  
    const handleFileChange = (event) => {
      const selectedFiles = Array.from(event.target.files);
      setFiles(selectedFiles);
    };
    const deleteFile = (index) => {
      const newFiles = files.filter((_, i) => i !== index);
      setFiles(newFiles);
    };
    const deleteLastFile = () => {
      setFiles([]);
    };
    const handleSubmit = async () => {
      if (files.length > (assignmentInfo.maxLimitImages )) {
        alert(`You can only upload up to ${assignmentInfo.maxLimitImages } images.`);
        return;
      }
    
      const formData = new FormData();
      files.forEach(file => {
        formData.append('images[]', file);
      });
      formData.append('userId', sessionStorage.getItem('userId'));
      formData.append('assignmentId', sessionStorage.getItem('assignmentId'));
    
      try {
        const userId = sessionStorage.getItem('userId');
        const assignmentId = sessionStorage.getItem('assignmentId');

const response = await axios.post(`http://localhost/Projects/OralRadiology/UploadAssignment.php`, formData, {
  headers: {
    'Content-Type': 'multipart/form-data'
  }
});

// In useEffect hook

        console.log(response.data);
        alert("Upload successful!");
      } catch (error) {
        console.error('Error uploading images:', error);
        alert('Error uploading images, please try again.');
      }
    };
    
  
    return (
      <>
        <div className="assignment-info">
          <h2 className="assignment-submission-text">{assignmentInfo.Name} SUBMISSION</h2>
  
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
  
          <button className="button btnA" type="button" onClick={deleteLastFile}>
            DELETE
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

  return (
    <>
      <Navbar />
      <div className="container_monemm">
        <div className="monem">
          <h2 className="assignment-submission-text2">REQUIREMENT SUBMISSION</h2>
          <Header assignmentInfo={assignmentInfo} />
          <AssignmentInfo />
        </div>
        <Feedback />
      </div>
    </>
  );
};

const Header = ({ assignmentInfo }) => {
  return (
    <div className="header">
      <div className="submit_images">
        <img src={image} alt="Teeth image" className="xray_iamge" />
      </div>
      <p>{`Max Limit of Images: ${assignmentInfo.maxLimitImages || 'Loading..'}`}</p>
      <br />
      <p>The Grade of The Requirement Will Appear Here Once Evaluated</p>
    </div>
  );
};

export default AssignmentSubmission;
