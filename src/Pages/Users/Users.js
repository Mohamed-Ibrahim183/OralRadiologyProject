import React, { useEffect, useState } from "react";
import "./users2.css";
import Navbar from "../../Components/Navbar/Navbar";
import axios from "axios";
import { Navigate } from "react-router-dom";
import BasicModal from "./Edit";
import { Avatar, Button } from "@mui/material";
import { axiosMethods } from "../Controller";

const Users = () => {
  const [open, setOpen] = useState(false);
  const [clickedUser, setClickedUser] = useState();
  const [view, setView] = useState([]);
  const [Type, setType] = useState("Student");
  const [changes, setChanges] = useState([]);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  useEffect(() => {
    document.body.classList.add("TableBody");

    // Clean up the class on unmount
    return () => document.body.classList.remove("TableBody");
  }, []);

  function FrontView(dataContent) {
    console.table(dataContent);
    const content = dataContent.map((ele) => (
      <tr key={ele.Id}>
        <td>{ele.Id}</td>
        <td>
          <Avatar
            src={"http://localhost/Projects/OralRadiology/" + ele.PersonalImage}
            alt={ele.Name}
            sx={{
              m: "auto",
              width: "75px",
              height: "75px",
              objectFit: "cover",
            }}
          />
        </td>
        <td>{ele.Name}</td>
        <td>{ele.MSAId}</td>
        <td>{ele.Type}</td>
        <td>{ele.Email}</td>
        <td className="select">
          <button
            className="button edit"
            onClick={() => {
              setClickedUser(ele);
              setOpen(true);
            }}
          >
            Edit
          </button>
          <button className="button del">Delete</button>
        </td>
      </tr>
    ));
    setView(content);
  }

  function handleSaveChanges() {
    if (!changes) return;
    const url =
      "http://localhost/Projects/OralRadiology/GroupLogic.php/Changes";
    let fData = new FormData();
    Object.keys(changes).forEach((ele) => {
      fData.append(ele, changes[ele]);
    });
    axios
      .post(url, fData)
      .then((res) => console.log(res.data))
      .catch((error) => console.error(error));
  }

  function handleType(e) {
    setType(e.target.value);
  }

  useEffect(() => {
    const url =
      "http://localhost/Projects/OralRadiology/userLogic.php/Users/" + Type;
    new axiosMethods()
      .get(url)
      .then((res) => (res.msg ? FrontView(res.msg) : console.error(res.error)));
  }, [Type]);

  if (sessionStorage["Type"] !== "Admin") {
    return <Navigate to="/" />;
  }

  return (
    <>
      <Navbar />
      <BasicModal
        open={open}
        handleOpen={handleOpen}
        handleClose={handleClose}
        selectedUser={clickedUser}
        setChanges={setChanges}
      />
      <div className="Table">
        
      <select className="select" name="Type" id="Type" onChange={handleType} value={Type}>
        <option value="Student">Student</option>
        <option value="Professor">Professor</option>
        <option value="Admin">Admin</option>
      </select>
        <h1>Users</h1>
        <main>
          <table>
            <thead>
              <tr>
                <th>#</th>
                <th>Image</th>
                <th>Name</th>
                <th>MSA ID</th>
                <th>Type</th>
                <th>Email</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tfoot>
              <tr>
                <th colSpan="7">Spring 24</th>
              </tr>
            </tfoot>
            <tbody>{view}</tbody>
          </table>
        </main>
        <Button
          sx={{ mb: 5 }}
          fullWidth
          variant="contained"
          color="primary"
          onClick={handleSaveChanges}
        >
          Save Changes
        </Button>
      </div>
    </>
  );
};

export default Users;
