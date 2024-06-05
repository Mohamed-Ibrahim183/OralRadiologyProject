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
            {
              Text: "Add User",
              link: "/AddProf",
            },
            {
              Text: "Add Group",
              link: "/AddGroup",
            },
            {
              Text: "users",
              link: "/users",
            },
            {
              Text: "Dashboard",
              link: "/Dashboard",
            },
          ],
        });
        break;
      case "Professor":
        setLinks({
          navLinks: [
            {
              Text: "Dashboard",
              link: "/Dashboard",
            },
            {
              Text: "Grading Page",
              link: "/Grading_Page",
            },
          ],
        });
        break;
      case "Student":
        setLinks({
          navLinks: [
            {
              Text: "Requirements",
              link: "/Assignments",
            },
            {
              Text: "Upload",
              link: "/submit",
            },
            {
              Text: "Dashboard",
              link: "/Dashboard",
            },
          ],
        });
        break;

      default:
        setLinks({
          navLinks: [
            {
              Text: "Home",
              link: "/",
            },
            {
              Text: "Login",
              link: "/Login3",
            },
          ],
        });
    }

    setLinks((prev) => ({
      ...prev,
      Pages: [
        {
          Text: "Profile",
          link: "/Profile",
        },
        {
          Text: "Login",
          link: "/Login3",
        },
        {
          Text: "Home",
          link: "/",
        },
        {
          Text: "Logout",
          link: "/Login3",
          fun: () => sessionStorage.clear(),
        },
        // logOut ... login
      ],
    }));
  }, []);

  if (!Links) {
    return;
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <Link to="/" style={{ color: "white" }}>
              <Typography
                variant="h5"
                color="inherit"
                sx={{ display: "flex", alignItems: "center" }}
              >
                <Avatar
                  src="./Images/logo.png"
                  alt="Oral Radiology"
                  sx={{ width: 60 }}
                />
                Oral Radiology
              </Typography>
            </Link>
          </Typography>
          {/* {content3} */}
          <Box
            sx={{
              color: "white",
              display: "flex",
              justifyContent: "space-around",
              alignItems: "center",
              gap: 2,
            }}
          >
            {Links.navLinks.map((ele) => {
              return (
                <Button color="inherit">
                  <Link style={{ color: "inherit" }} to={ele.link}>
                    {ele.Text}
                  </Link>
                </Button>
              );
            })}
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
            {Links.Pages.map((page) => (
              <MenuItem key={page}>
                {/* <Typography textAlign="center">{setting}</Typography> */}
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
