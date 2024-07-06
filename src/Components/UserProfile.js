import React from "react";
import { Link } from "react-router-dom";

function UserProfile({
  professorImage,
  professorName,
  color = "#a2d1fd",
  styles = {},
}) {
  const defaultStyles = {
    height: "fit-content",
    backgroundColor: color,
    paddingBottom: "24px",
    borderRadius: "16px",
  };

  const combinedStyles = { ...defaultStyles, ...styles };

  return (
    <div className="userProfile" style={combinedStyles}>
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
        <h2>{professorName}</h2>
        <p>Welcome to our Oral Radiology system</p>
      </div>
      <Link to="/Profile" className="ProfileButton stdBtn">
        Go To Profile
      </Link>
    </div>
  );
}

export default UserProfile;
