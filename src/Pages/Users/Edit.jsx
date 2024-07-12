import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import axios from "axios";
import {
  Avatar,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
} from "@mui/material";

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

export default function BasicModal({
  open,
  handleOpen,
  handleClose,
  selectedUser,
  setChanges,
}) {
  const [groups, setGroups] = React.useState(null);
  const [selectedGroup, setSelectedGroup] = React.useState("");

  React.useEffect(() => {
    const url = `http://localhost/Projects/OralRadiology/GroupLogic.php/Groups`;
    axios
      .get(url)
      .then((res) => {
        setGroups(res.data);
      })
      .catch((error) => console.error(error));
  }, []);

  if (!selectedUser) return null;

  const handleGroupChange = (event) => {
    setSelectedGroup(event.target.value);
    setChanges((prev) => ({
      ...prev,
      [selectedUser.Id]: {
        Group: event.target.value,
        Id: selectedUser.Id,
        Image: selectedUser.PersonalImage,
        Name: selectedUser.Name,
      },
    }));
  };

  return (
    <div>
      <Modal
        open={open}
        onClose={() => handleClose()}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
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
                    const name = groups[ele][0];
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
      </Modal>
    </div>
  );
}
