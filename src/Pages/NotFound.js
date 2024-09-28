import React from "react";
import { Link } from "react-router-dom";
import "./404.css";
import NotFoundImage from "./404.svg";
const NotFound = () => {
  return (
    <>
      <div className="cont-404">
        <img src={NotFoundImage} alt="Not Found" />
        <Link to="/">Back To Home</Link>
      </div>
    </>
  );
};

export default NotFound;
