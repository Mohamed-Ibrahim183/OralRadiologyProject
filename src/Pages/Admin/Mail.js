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
import { axiosMethods, getSession } from "../Controller";
import emailjs from "@emailjs/browser";
import { serverURL } from "../../Slices/GeneralSlice";

function Mail() {
  const [to, setTo] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState(" ");
  const [file, setFile] = useState(null);
  const [usersData, setUsersData] = useState([]);
  const [user, setUser] = useState(null);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [groups, setGroups] = useState([]);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  useEffect(() => {
    new axiosMethods().get(`${serverURL}userLogic.php/Users`).then((res) => {
      const msg = res.msg;

      const users = msg.map((ele) => {
        return {
          ...ele,
          PersonalImage: serverURL + ele.PersonalImage,
        };
      });
      setUsersData(users);
      setFilteredUsers(users);
    });
    new axiosMethods()
      .get(`${serverURL}GroupLogic.php/getGroupsNames`)
      .then((res) => {
        setGroups(res.msg);
      });
  }, []);

  const handleUserSelect = (user) => {
    if (user.Email) {
      setTo(user.Email);
      setUser(user);
    } else {
      setTo(user.Name);
      setUser((prev) => ({ ...prev, Email: "", Id: user.Id })); // Destroy User Email
    }
  };

  const handleToChange = (event, value) => {
    setTo(value);
    if (!value) {
      setFilteredUsers(usersData);
    } else {
      const filtered = usersData.filter((user) => {
        const userIdString = user.Id.toString();
        return (
          userIdString.startsWith(value) ||
          user.MSAId.toString().startsWith(value) ||
          user.Name.toLowerCase().includes(value.toLowerCase()) ||
          user.Email.toLowerCase().includes(value.toLowerCase())
        );
      });
      setFilteredUsers(filtered);
    }
  };

  if (!groups) return;
  const sendMail = (e) => {
    e.preventDefault();

    // return;
    if (!user) return;
    if (user.Email) {
      // to filed is user
      emailjs.send(
        "service_i5cp5yq",
        "template_r8ll4fg",
        {
          to_name: user.Name,
          from_name: getSession("Name"),
          message: message,
          to_Email: user.Email,
        },
        "p5suXG8zm4KIy7q0l"
      );
    } else {
      // to filed is group
      new axiosMethods()
        .get(`${serverURL}GroupLogic.php/UsersMails/${user.Id}`)
        .then((res) => {
          const usersData = res.msg;

          usersData.forEach((element) => {
            emailjs.send(
              "service_i5cp5yq",
              "template_r8ll4fg",
              {
                to_name: element.Name,
                from_name: getSession("Name"),
                message: message,
                to_Email: element.Email,
              },
              "p5suXG8zm4KIy7q0l"
            );
          });
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
          options={[...filteredUsers, ...groups]}
          getOptionLabel={(option) =>
            `${option.Id} - ${option.MSAId} - ${option.Name} - ${option.Email}`
          }
          inputValue={to}
          onInputChange={handleToChange}
          onChange={(event, newValue) => handleUserSelect(newValue)}
          renderOption={(props, option) => (
            <li
              {...props}
              key={option.Id + option.Name}
              onClick={() => handleUserSelect(option)}
            >
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
