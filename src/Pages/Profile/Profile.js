import React, { useState } from "react";
// import Navbar2 from "../../Components/Navbar/Navbar";
import Navbar from "../../Components/Navbar/Navbar";
import { useEffect } from "react";
import "./Profile.css";
import AccData from "./data.json";
import axios from "axios";
import { useParams } from "react-router-dom";

const Profile = () => {
  const [personalImag, setPersonalImag] = useState("");
  const urlData = useParams();
  useEffect(() => {
    // Add the class to the body element when the component mounts
    document.body.classList.add("ProfileBody");
    getPhoto();
    // Remove the class from the body element when the component unmounts
    return () => document.body.classList.remove("ProfileBody");
  }, []);
  function getPhoto() {
    const url =
      "http://localhost/Projects/Oral Radiology/PersonalImage.php/" +
      urlData.id;
    axios
      .get(url)
      .then((res) => {
        console.log(res.data);
        setPersonalImag("http://localhost/Projects/Oral Radiology" + res.data);
      })
      .catch((res) => console.log(res.data));
  }

  const [Data, setData] = React.useState([]);
  useEffect(() => setData(Object.values(AccData)), []);

  const content = Data.map(function (ele) {
    return (
      <div className="section">
        <label htmlFor={ele.name}>{ele.text}</label>
        <input
          type={ele.type !== undefined ? ele.type : "text"}
          name={ele.name}
          id={ele.name}
          placeholder={ele.placeholder}
        />
      </div>
    );
  });

  return (
    <>
      <Navbar />
      <div className="Profile">
        <div className="container">
          <div className="personalImage">
            <span className="ImageTitle">Profile Image</span>
            <div className="imageContent">
              <img src={personalImag} alt="Your" />
              <span className="imageNote">JPG or PNG no larger than 5 MB</span>
              <button className="SubImage">Upload Image</button>
            </div>
          </div>
          <div className="Information">
            <span className="informationTitle">Account Details</span>
            <div className="InformationContent">
              <div className="mainContent">
                <form action="#" id="AccData">
                  {content}
                </form>
                <button className="SubmitData">Save Changes</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
