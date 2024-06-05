import React, { useRef, useState } from "react";
import Navbar from "../../Components/Navbar/Navbar";
// import { useEffect } from "react";
import "./Profile.css";
import AccData from "./data.json";
import axios from "axios";

const Profile = () => {
  const [personalImag, setPersonalImag] = useState(
    sessionStorage.getItem("PersonalImage")
  );
  const placeImage = useRef();
  const Data = Object.values(AccData);

  const content = Data.map(function (ele) {
    return (
      <div className="section" key={ele.name}>
        <label htmlFor={ele.name}>{ele.text}</label>
        <input
          type={ele.type !== undefined ? ele.type : "text"}
          name={ele.name}
          id={ele.name}
          placeholder={ele.placeholder}
          value={sessionStorage[ele.name]}
        />
      </div>
    );
  });
  function settingFile(event) {
    const url =
      "http://localhost/Projects/OralRadiology/userLogic.php/UpdateImage";
    let fData = new FormData();
    fData.append("Id", sessionStorage.getItem("userId"));
    fData.append("MSAId", sessionStorage.getItem("MSAId"));
    fData.append("Profile", event.target.files[0]);
    axios
      .post(url, fData)
      .then((res) => {
        const newImageUrl =
          "http://localhost/Projects/OralRadiology/" +
          res.data +
          "?t=" +
          Math.random();
        sessionStorage.setItem("PersonalImage", newImageUrl);
        setPersonalImag(newImageUrl);
      })
      .catch((error) => console.error(error));
  }

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
              <div className="Uploading">
                <input
                  type="file"
                  name="image"
                  id="image"
                  style={{ display: "none" }}
                  onChange={settingFile}
                  ref={placeImage}
                />
              </div>
              <button
                className="SubImage"
                onClick={() => placeImage.current.click()}
              >
                Upload Image
              </button>
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
