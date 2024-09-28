import React, { useRef, useReducer, useState } from "react";
import "./Profile.css";
import {
  changePassword,
  changesInUserProfile,
  savePersonalImage,
  serverURL,
} from "../../Slices/GeneralSlice";
import { getSession, setSession } from "../Controller";
import toast from "react-hot-toast";
import { Navigate } from "react-router-dom";

const initialState = {
  MSAId: getSession("MSAId"),
  username: getSession("Name"),
  Email: getSession("Email"),
  Group: getSession("Group"),
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
  console.log('getSession("PersonalImage"):', getSession("PersonalImage"));
  const [state, dispatch] = useReducer(reducer, initialState);
  const [personalImag, setPersonalImag] = useState(getSession("PersonalImage"));
  const [pass, setPass] = useState("");
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
  function handleChangePassword(e) {
    e.preventDefault();
    changePassword({
      password: pass,
      Id: getSession("userId"),
    }).then((res) => {
      if (res.error === "" || res.error.message === "")
        toast.success("Password Changed Successfully");
    });
  }

  function settingFile(event) {
    savePersonalImage(
      getSession("userId"),
      state.MSAId,
      event.target.files[0]
    ).then((res) => {
      console.log(res.msg);
      const newImageUrl = `${serverURL}${res.msg}?t=${Math.random()}`;
      setSession("PersonalImage", newImageUrl);
      setPersonalImag(newImageUrl);
    });
  }

  function updateUser(event) {
    event.preventDefault();
    changesInUserProfile(state).then((res) => {
      if (res.msg === "UPDATED") {
        setSession("Email", state.Email);
        setSession("Name", state.username);
        toast.success("User Updated   Successfully");
      }
    });
  }
  if (!getSession("userId")) return <Navigate to="/" />;

  return (
    <div className="Profile">
      <div className="container">
        <div className="personalImage">
          <span className="ImageTitle">Profile Image</span>
          <div className="imageContent">
            <img src={`${personalImag}`} alt="Profile" />
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
              <form id="AccData" onSubmit={updateUser}>
                {formFields.map((field) => (
                  <div className="section" key={field.name}>
                    <label htmlFor={field.name}>{field.text}</label>
                    <input
                      type={field.type || "text"}
                      name={field.name}
                      id={field.name}
                      placeholder={field.placeholder}
                      value={state[field.name] ?? ""}
                      onChange={(e) =>
                        dispatch({
                          type: "SET_FIELD",
                          field: field.name,
                          value: e.target.value,
                        })
                      }
                      disabled={
                        field.name === "MSAId" || field.name === "Group"
                      }
                    />
                  </div>
                ))}
                <button className="SubmitData" type="submit">
                  Save Changes
                </button>
              </form>
              <form className="newPassword" onSubmit={handleChangePassword}>
                <input
                  className="pass"
                  type="password"
                  placeholder="Write Your New Password"
                  value={pass ?? ""}
                  onChange={(e) => setPass(e.target.value)}
                />
                <button type="submit" className="SubmitData">
                  Change Password
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
