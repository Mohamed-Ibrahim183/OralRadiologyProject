import React from "react";
import { Link } from "react-router-dom";
import "./404.css";
const NotFound = () => {
  return (
    <>
      <div className="cont-404">
        <img src={"./Images/404.svg"} alt="svg" />
        {/* <button>Back to Home</button> */}
        <Link to="/">Back To Home</Link>
      </div>
    </>
  );
};

export default NotFound;
