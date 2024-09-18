import React, { useEffect, useReducer, useState } from "react";
import "./users2.css";
import { Navigate } from "react-router-dom";
import BasicModal from "./Edit";
import {
  Avatar,
  Box,
  Button,
  Paper,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Table,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { Cancel, Delete, PlaylistAddOutlined } from "@mui/icons-material";
import BasicModalComp from "../../Components/BasicModal/BasicModalComp";
import {
  changeUserGroup,
  deleteUserFromDB,
  getAllGroupsData,
  getUsersOfType,
} from "../../Slices/AdminSlice";
import { resetPassword, serverURL } from "../../Slices/GeneralSlice";
import toast from "react-hot-toast";
import { validArray } from "../Controller";

const initialState = {
  users: [],
  render: 0,
  type: "Student",
  editChanges: [],
  workingUser: {},
  finalModal: false,
  deleteModal: false,
  resetPasswordModal: false,
  editUserModal: false,
};
const Users = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  function reducer(state, action) {
    switch (action.type) {
      case "setUsers":
        return { ...state, users: action.payload };
      case "changeType":
        return { ...state, type: action.payload };
      case "openEditModal":
        return { ...state, finalModal: true };
      case "closeEditModal":
        return { ...state, finalModal: false };
      case "openDeleteModal":
        return { ...state, workingUser: action.payload, deleteModal: true };
      case "closeDeleteModal":
        return {
          ...state,
          workingUser: {},
          deleteModal: false,
          render: state.render + 1,
        };
      case "openResetPasswordModal":
        return {
          ...state,
          resetPasswordModal: true,
          workingUser: action.payload,
        };
      case "closeResetPasswordModal":
        return {
          ...state,
          resetPasswordModal: false,
          workingUser: {},
          render: state.render + 1,
        };
      case "newChange":
        return {
          ...state,
          editChanges: { ...state.editChanges, ...action.payload },
        };
      case "openEditUserModal":
        return { ...state, editUserModal: true, workingUser: action.payload };
      case "closeEditUserModal":
        return { ...state, editUserModal: false, workingUser: {} };
      case "clearChanges":
        return { ...state, editChanges: [], finalModal: false };
      case "render":
        return { ...state, render: state.render + 1 };
      default:
        return { ...state, render: state.render + 1 };
    }
  }

  const [changes, setChanges] = useState([]);

  const [render, setRender] = useState(1);

  console.log("Render Once");

  useEffect(() => {
    document.body.classList.add("TableBody");

    return () => document.body.classList.remove("TableBody");
  }, []);

  function handleSaveChanges2() {
    if (!state.editChanges) return;
    let fData = new FormData();
    Object.keys(state.editChanges).forEach((ele) => {
      fData.append(ele, state.editChanges[ele].Group);
    });
    changeUserGroup(fData).then((res) => {
      console.log(res.msg);
      dispatch({ type: "clearChanges" });
      dispatch({ type: "render" });
    });
  }

  useEffect(() => {
    getUsersOfType(state.type).then((res) => {
      if (res.msg !== "") {
        dispatch({ type: "setUsers", payload: res.msg });
      }
    });
  }, [state.type, state.render]);

  if (sessionStorage["Type"] !== "Admin") {
    return <Navigate to="/" />;
  }

  return (
    <>
      <FinalModalBeforeSubmit
        open={state.finalModal}
        close={() => dispatch({ type: "closeEditModal" })}
        changes={state.editChanges}
        handleSaveChanges2={handleSaveChanges2}
      />
      <DeleteModalContent
        open={state.deleteModal}
        close={() => dispatch({ type: "closeDeleteModal" })}
        deleteUser={state.workingUser}
        onFinish={() => dispatch({ type: "closeDeleteModal" })}
      />
      <ResetPasswordModal
        open={state.resetPasswordModal}
        close={() => dispatch({ type: "closeResetPasswordModal" })}
        resetUser={state.workingUser}
      />
      <EditUser
        open={state.editUserModal}
        close={() => dispatch({ type: "closeEditUserModal" })}
        selectedUser={state.workingUser}
        addNewChange={(change) =>
          dispatch({ type: "newChange", payload: change })
        }
      />

      <div className="Table">
        <select
          className="select"
          name="Type"
          id="Type"
          onChange={(e) =>
            dispatch({ type: "changeType", payload: e.target.value })
          }
          value={state.type}
        >
          <option value="Student">Student</option>
          <option value="Professor">Professor</option>
          <option value="Admin">Admin</option>
        </select>
        <h1>Users</h1>
        <main>
          {validArray(state.users) && (
            <table>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Image</th>
                  <th>Name</th>
                  <th>MSA ID</th>
                  <th>Type</th>
                  <th>Email</th>
                  <th>Group</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tfoot>
                <tr>
                  <th colSpan="7">Spring 24</th>
                </tr>
              </tfoot>
              <tbody>
                {validArray(state.users) &&
                  state.users.map((user) => {
                    return (
                      <tr key={user.Id}>
                        <td>{user.Id}</td>
                        <td>
                          <Avatar
                            src={serverURL + user.PersonalImage}
                            alt={user.Name}
                            sx={{
                              m: "auto",
                              width: "75px",
                              height: "75px",
                              objectFit: "cover",
                            }}
                          />
                        </td>
                        <td>{user.Name}</td>
                        <td>{user.MSAId}</td>
                        <td>{user.Type}</td>
                        <td>{user.Email}</td>
                        <td>{user.Group}</td>
                        <td className="select">
                          <button
                            className="button edit"
                            onClick={() => {
                              // setClickedUser(user);
                              // setOpen(true);
                              dispatch({
                                type: "openEditUserModal",
                                payload: user,
                              });
                            }}
                          >
                            Change Group
                          </button>
                          <button
                            className="button del"
                            onClick={() => {
                              // setDeleteUser(user);
                              // setDeleteModal(true);
                              dispatch({
                                type: "openDeleteModal",
                                payload: user,
                              });
                            }}
                          >
                            Delete
                          </button>
                          <button
                            className="button edit"
                            onClick={() =>
                              dispatch({
                                type: "openResetPasswordModal",
                                payload: user,
                              })
                            }
                          >
                            Reset Password
                          </button>
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          )}
        </main>
        <Button
          sx={{ mb: 5 }}
          fullWidth
          variant="contained"
          color="primary"
          onClick={() => {
            // if (!changes) return;
            dispatch({ type: "openEditModal" });
          }}
        >
          Save Changes
        </Button>
      </div>
    </>
  );
};
function FinalModalBeforeSubmit({ open, close, changes, handleSaveChanges2 }) {
  return (
    <BasicModalComp openModal={open} closeModal={() => close(false)}>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="center">ID</TableCell>
              <TableCell align="center">Image</TableCell>
              <TableCell align="center">Name</TableCell>
              <TableCell align="center">To Group</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {Object.keys(changes).map((key) => (
              <TableRow key={key}>
                <TableCell align="center">{key}</TableCell>
                <TableCell align="center">
                  <Avatar
                    src={serverURL + changes[key].Image}
                    alt={changes[key].Name}
                    sx={{
                      m: "auto",
                      width: "75px",
                      height: "75px",
                      objectFit: "cover",
                    }}
                  />
                </TableCell>
                <TableCell align="center">{changes[key].Name}</TableCell>
                <TableCell align="center">{changes[key].Group}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Button
        variant="contained"
        color="primary"
        onClick={() => handleSaveChanges2()}
      >
        Submit Changes
      </Button>
    </BasicModalComp>
  );
}

function DeleteModalContent({ deleteUser, open, close, onFinish }) {
  function deleteUserDB(userId) {
    deleteUserFromDB(userId).then((res) => {
      console.log(res.msg);
      onFinish();
    });
  }
  if (!deleteUser) return;
  return (
    <BasicModalComp openModal={open} closeModal={close}>
      <Typography variant="h6" component="h3">
        Are You Sure You Want to Delete this User?
      </Typography>
      <Box sx={{ display: "flex", alignItems: "center", mt: 2 }}>
        <Avatar
          src={serverURL + deleteUser.PersonalImage}
          alt={deleteUser.Name}
          sx={{ width: 80, height: 80, objectFit: "cover" }}
        />
        <Typography variant="body1" color="initial" sx={{ mx: 2 }}>
          {deleteUser.Name}
        </Typography>
      </Box>
      <Box
        sx={{
          mt: 2,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Button
          variant="contained"
          color="warning"
          endIcon={<Cancel />}
          onClick={() => onFinish()}
        >
          Cancel
        </Button>
        <Button
          variant="contained"
          color="error"
          endIcon={<Delete />}
          onClick={() => deleteUserDB(deleteUser.Id)}
        >
          Delete
        </Button>
      </Box>
    </BasicModalComp>
  );
}

function ResetPasswordModal({ open, close, resetUser }) {
  return (
    <BasicModalComp openModal={open} closeModal={close}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          m: 2,
        }}
      >
        <Box>
          <Typography variant="subtitle1" color="inherit">
            Are you Want to Reset Password For User:
            <Typography
              variant="body1"
              color="inherit"
              sx={{ display: "flex", alignItems: "center", m: 2 }}
            >
              {resetUser.Name}
              <Avatar
                src={serverURL + resetUser.PersonalImage}
                alt={resetUser.Name}
                sx={{
                  m: "auto",
                  width: "75px",
                  height: "75px",
                  objectFit: "cover",
                }}
              />
            </Typography>
          </Typography>
        </Box>

        <Box
          sx={{
            my: 2,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: 4,
          }}
        >
          <Button
            variant="contained"
            color="warning"
            endIcon={<Cancel />}
            onClick={() => {
              // setResetUser(null);
              // resetPass(false);
              close();
            }}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            color="error"
            // endIcon={<Delete />}
            onClick={() => {
              resetPassword(resetUser.Id);
              toast(
                `USER: ${resetUser.Name} Has Reset The Password to "pass" Successfully!`,
                {
                  type: "success",
                }
              );
              // setResetUser(null);
              // setResetPass(false);
              close();
            }}
          >
            Reset Password
          </Button>
        </Box>
        <Typography variant="body1" color="inherit">
          Note: Password will reset to be "pass"
        </Typography>
      </Box>
    </BasicModalComp>
  );
}

function EditUser({ open, close, selectedUser, addNewChange }) {
  const [groups, setGroups] = React.useState(null);
  const [selectedGroup, setSelectedGroup] = React.useState("");
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
    color: "black",
  };

  useEffect(() => {
    getAllGroupsData().then((res) => setGroups(res.msg));
  }, []);

  if (!selectedUser) return null;

  const handleGroupChange = (event) => {
    setSelectedGroup(event.target.value);
    addNewChange({
      [selectedUser.Id]: {
        Group: event.target.value,
        Id: selectedUser.Id,
        Image: selectedUser.PersonalImage,
        Name: selectedUser.Name,
      },
    });
  };

  return (
    <BasicModalComp
      openModal={open}
      closeModal={() => {
        close();
        setSelectedGroup("");
      }}
    >
      <Box sx={style}>
        <Typography
          id="modal-modal-title"
          variant="h6"
          component="h2"
          sx={{ display: "flex", gap: 2 }}
        >
          Editing{" "}
          <Avatar
            src={
              "http://localhost/Projects/OralRadiology/" +
              selectedUser.PersonalImage
            }
            alt={selectedUser.Name}
          />
          {selectedUser.Name}
        </Typography>
        <Typography variant="div" color="inherit">
          Select Group
          {groups && (
            <FormControl fullWidth>
              <InputLabel id="select-group-label">Group</InputLabel>
              <Select
                labelId="select-group-label"
                id="selectGroup"
                value={selectedGroup}
                label="Group"
                onChange={handleGroupChange}
              >
                {Object.keys(groups).map((ele) => {
                  const name = groups[ele].Name;
                  if (name) {
                    return (
                      <MenuItem key={ele} value={name}>
                        {name}
                      </MenuItem>
                    );
                  }
                  return null;
                })}
              </Select>
            </FormControl>
          )}
        </Typography>
      </Box>
    </BasicModalComp>
  );
}
export default Users;
