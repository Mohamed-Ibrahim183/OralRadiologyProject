import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import DarkMode from "../DarkMode/DarkMode";
import "./Nav.css";
import {
  AppBar,
  Avatar,
  Box,
  Button,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";
import logo from "./logo.png";

const Navbar = () => {
  const [Links, setLinks] = useState(null);
  const userType = sessionStorage["Type"];
  const [anchorElUser, setAnchorElUser] = useState(null);

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  useEffect(() => {
    switch (userType) {
      case "Admin":
        setLinks({
          navLinks: [
            { Text: "Add User", link: "/admin/AddProf" },
            { Text: "Add Group", link: "/admin/AddGroup" },
            { Text: "Users", link: "/admin/users" },
            { Text: "Dashboard", link: "/admin/Dashboard" },
          ],
        });
        break;
      case "Professor":
        setLinks({
          navLinks: [
            { Text: "Dashboard", link: "/professor/Dashboard" },
            { Text: "Grading Page", link: "/professor/Grading_Page" },
          ],
        });
        break;
      case "Student":
        setLinks({
          navLinks: [
            { Text: "Requirements", link: "/student/Assignments" },
            { Text: "Upload", link: "/student/submit" },
            { Text: "Dashboard", link: "/student/Dashboard" },
          ],
        });
        break;
      default:
        setLinks({
          navLinks: [
            { Text: "Home", link: "/" },
            { Text: "Login", link: "/Login3" },
          ],
        });
    }

    setLinks((prev) => ({
      ...prev,
      Pages: [
        { Text: "Profile", link: "/Profile" },
        { Text: "Home", link: "/" },
        { Text: "Logout", link: "/Login3", fun: () => sessionStorage.clear() }, // delete the current user
      ],
    }));
  }, [userType]);

  if (!Links) return null;

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="static"
        className="oralNavbar"
        style={{ position: "relative" }}
      >
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <Link to="/" style={{ color: "white" }}>
              <Typography
                variant="h5"
                color="inherit"
                sx={{ display: "flex", alignItems: "center" }}
              >
                <Avatar
                  src={logo}
                  alt="Oral Radiology"
                  sx={{ width: 60, height: 60 }}
                />
                Oral Radiology
              </Typography>
            </Link>
          </Typography>
          <Box
            sx={{
              color: "white",
              display: "flex",
              justifyContent: "space-around",
              alignItems: "center",
              gap: 2,
            }}
          >
            {Links.navLinks.map((ele, index) => (
              <Button color="inherit" key={index}>
                <Link style={{ color: "inherit" }} to={ele.link}>
                  {ele.Text}
                </Link>
              </Button>
            ))}
          </Box>
          {sessionStorage["PersonalImage"] && (
            <Tooltip title="Open Menu" sx={{ mx: 2 }}>
              <IconButton onClick={handleOpenUserMenu}>
                <Avatar
                  src={sessionStorage["PersonalImage"]}
                  alt={sessionStorage["Name"]}
                />
              </IconButton>
            </Tooltip>
          )}
          <Menu
            sx={{ mt: "45px" }}
            id="menu-appbar"
            anchorEl={anchorElUser}
            anchorOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            keepMounted
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            open={Boolean(anchorElUser)}
            onClose={handleCloseUserMenu}
          >
            {Links.Pages.map((page, index) => (
              <MenuItem key={index}>
                <Link
                  style={{ color: "inherit" }}
                  to={page.link}
                  onClick={page.fun ? () => page.fun() : null}
                >
                  {page.Text}
                </Link>
              </MenuItem>
            ))}
          </Menu>
          <DarkMode />
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Navbar;
