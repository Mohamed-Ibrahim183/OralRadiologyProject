import React from "react";
import { Link } from "react-router-dom";
const NotFound = () => {
  return (
    <>
      <div className="container">
        <p>404 Not Found</p>
        <Link to="/">Go back home Link</Link>
      </div>
    </>
  );
};

export default NotFound;
