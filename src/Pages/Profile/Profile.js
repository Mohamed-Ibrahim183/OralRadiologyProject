import React from "react";
import Navbar from "../../Components/Navbar/navbar";
import { useEffect } from "react";
import "./Profile.css";
import AccData from "./data.json";

const Profile = () => {
  useEffect(() => {
    // Add the class to the body element when the component mounts
    document.body.classList.add("ProfileBody");

    // Remove the class from the body element when the component unmounts
    return () => document.body.classList.remove("ProfileBody");
  }, []);

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
              <img
                src="https://media-hbe1-1.cdn.whatsapp.net/v/t61.24694-24/416174799_749980907087258_7853982289657493947_n.jpg?ccb=11-4&oh=01_AdS9MEq31f5H9fyYRViGQeI6Y00EP5F2sIpCUNMjhrd43Q&oe=65F19E22&_nc_sid=e6ed6c&_nc_cat=106"
                alt=""
              />
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
