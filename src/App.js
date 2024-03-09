import React from "react";
import "./Components/Global/normalize.css";

import OverViewAssignmentsPage from "./Pages/OverViewAssignmentsPage";
import Navbar from "./Components/Navbar/navbar";

const App = () => {
  return (
    <>
      <Navbar />
      <OverViewAssignmentsPage />
    </>
  );
};

export default App;
