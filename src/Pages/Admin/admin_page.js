import "./Admin.css";
import Calendar from "react-calendar";
import Mail from "./Mail.js";

import { Navigate } from "react-router-dom";
import { Box } from "@mui/material";
import { getSession } from "../Controller.jsx";

function AdminPage() {
  if (getSession("Type") !== "Admin") {
    return <Navigate to="/" />;
  }
  return (
    <>
      <div className="MainPage">
        <div className="AdminSection adminHomeSection containerWidth">
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <div className="AdminWrapper">
              <Mail />
              <Calendar />
            </div>
          </Box>
        </div>
      </div>
    </>
  );
}
export default AdminPage;
