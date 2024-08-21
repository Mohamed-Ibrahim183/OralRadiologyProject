import React, { useRef, useReducer, useState } from "react";
import axios from "axios";
import "./Profile.css";
import { changesInUserProfile } from "../../Slices/GeneralSlice";

const initialState = {
  MSAId: sessionStorage.getItem("MSAId") || "",
  username: sessionStorage.getItem("Name") || "",
  Email: sessionStorage.getItem("Email") || "",
  Group: sessionStorage.getItem("Group") || "",
};

function reducer(state, action) {
  switch (action.type) {
    case "SET_FIELD":
      return { ...state, [action.field]: action.value };
    case "SET_ALL_FIELDS":
      return { ...state, ...action.payload };
    default:
      return state;
  }
}

const Profile = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [personalImag, setPersonalImag] = useState(
    sessionStorage.getItem("PersonalImage")
  );
  const placeImage = useRef();

  const formFields = [
    {
      name: "MSAId",
      text: "MSA ID",
      placeholder: "Your MSA ID",
      require: true,
    },
    {
      name: "username",
      text: "Username",
      placeholder: "Username",
      require: true,
    },
    {
      name: "Email",
      text: "Email (MSA Email)",
      placeholder: "Enter MSA Email",
      type: "Email",
      require: true,
    },
    {
      name: "Group",
      text: "Group",
      placeholder: "Group Name",
    },
  ];

  function settingFile(event) {
    const url =
      "http://localhost/Projects/OralRadiology/userLogic.php/UpdateImage";
    let fData = new FormData();
    fData.append("Id", sessionStorage.getItem("userId"));
    fData.append("MSAId", state.MSAId);
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

  function updateUser(event) {
    event.preventDefault();
    changesInUserProfile(state).then((res) => {
      console.log(res.msg);
      if (res.msg === "UPDATED") {
        sessionStorage.setItem("Email", state.Email);
        sessionStorage.setItem("Name", state.username);
      }
    });
  }

  return (
    <div className="Profile">
      <div className="container">
        <div className="personalImage">
          <span className="ImageTitle">Profile Image</span>
          <div className="imageContent">
            <img src={personalImag} alt="Profile" />
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
            <form id="AccData" onSubmit={updateUser}>
              {formFields.map((field) => (
                <div className="section" key={field.name}>
                  <label htmlFor={field.name}>{field.text}</label>
                  <input
                    type={field.type || "text"}
                    name={field.name}
                    id={field.name}
                    placeholder={field.placeholder}
                    value={state[field.name]}
                    onChange={(e) =>
                      dispatch({
                        type: "SET_FIELD",
                        field: field.name,
                        value: e.target.value,
                      })
                    }
                    disabled={field.name === "MSAId" || field.name === "Group"}
                  />
                </div>
              ))}
              <button className="SubmitData" type="submit">
                Save Changes
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
