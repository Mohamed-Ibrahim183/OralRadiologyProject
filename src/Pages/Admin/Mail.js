import React, { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css"; // Import quill styles
import "./Mail.css";
import {
  TextField,
  Button,
  Avatar,
  Typography,
  Autocomplete,
} from "@mui/material";
import { getSession } from "../Controller";
import { serverURL } from "../../Slices/GeneralSlice";
import {
  getAllGroupsNamesDB,
  getAllUsersDB,
  getUsersMails,
  sendMailAPI,
} from "../../Slices/AdminSlice";

function Mail() {
  const [to, setTo] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState(""); // Fixed initial value
  const [file, setFile] = useState(null);
  const [usersData, setUsersData] = useState([]);
  const [user, setUser] = useState(null);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [groups, setGroups] = useState([]);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  useEffect(() => {
    getAllUsersDB().then((res) => {
      const users = res.msg.map((ele) => {
        return {
          ...ele,
          PersonalImage: serverURL + ele.PersonalImage,
        };
      });
      setUsersData(users);
      setFilteredUsers(users);
    });

    getAllGroupsNamesDB().then((res) => setGroups(res.msg));
  }, []);

  const handleUserSelect = (user) => {
    if (user.Email) {
      setTo(user.Email);
      setUser(user);
    } else {
      setTo(user.Name);
      setUser((prev) => ({ ...prev, Email: "", Id: user.Id }));
    }
  };

  const handleToChange = (event, value) => {
    setTo(value);
    if (!value) {
      setFilteredUsers(usersData);
    } else {
      const filtered = usersData.filter((user) => {
        const userIdString = user.Id ? user.Id.toString() : "";
        const msaIdString = user.MSAId ? user.MSAId.toString() : "";
        const userName = user.Name ? user.Name.toLowerCase() : "";
        const userEmail = user.Email ? user.Email.toLowerCase() : "";

        return (
          userIdString.startsWith(value) ||
          msaIdString.startsWith(value) ||
          userName.includes(value.toLowerCase()) ||
          userEmail.includes(value.toLowerCase())
        );
      });
      setFilteredUsers(filtered);
    }
  };

  const sendMail = (e) => {
    e.preventDefault(); // Prevent page reload

    if (!user) return;
    if (user.Email)
      sendMailAPI(user.Name, getSession("Name"), message, user.Email);
    else {
      getUsersMails(user.Id).then((res) => {
        const usersData = res.msg;
        usersData.forEach((element) =>
          sendMailAPI(element.Name, getSession("Name"), message, element.Name)
        );
      });
    }
    alert("Email Sent Successfully");
  };

  return (
    <div className="mail-form">
      <form>
        <Autocomplete
          id="free-solo-demo"
          freeSolo
          options={[...(filteredUsers || []), ...(groups || [])]} // Added fallback for null
          getOptionLabel={(option) =>
            option.Email
              ? `${option.Id} - ${option.MSAId} - ${option.Name} - ${option.Email}`
              : `Group ${option.Id} - ${option.Name}`
          }
          inputValue={to}
          onInputChange={handleToChange}
          onChange={(event, newValue) => handleUserSelect(newValue)}
          renderOption={(props, option) => (
            <li {...props} key={option.Id + option.Name}>
              <Typography variant="body1" color="initial">
                {option.Email ? option.Id : `G${option.Id}`}
              </Typography>
              <Avatar
                src={option.PersonalImage || ""}
                alt={option.Email ? option.Name : `Group ${option.Name}`}
                sx={{ mx: 2 }}
              />
              <Typography variant="body1" color="initial">
                {option.Email ? option.Name : `Group ${option.Name}`}
              </Typography>
              <Typography variant="body1" color="initial" sx={{ ml: 2 }}>
                {option.Email || ""}
              </Typography>
            </li>
          )}
          renderInput={(params) => (
            <TextField {...params} label="To" variant="outlined" fullWidth />
          )}
        />
        <TextField
          label="Subject"
          variant="outlined"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          fullWidth
          margin="normal"
        />
        <ReactQuill
          theme="snow"
          className="messageArea"
          value={message}
          onChange={setMessage}
        />
        <input type="file" onChange={handleFileChange} />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          onClick={sendMail}
        >
          Send
        </Button>
      </form>
    </div>
  );
}

export default Mail;
