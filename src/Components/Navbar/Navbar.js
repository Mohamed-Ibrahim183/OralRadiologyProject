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
  Drawer,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import logo from "./logo.png";
import { getSession } from "../../Pages/Controller";
// import { decryptData } from "../../Pages/Controller";

const Navbar = () => {
  const [Links, setLinks] = useState(null);
  const userType = getSession("Type");
  // const userType = decryptData(sessionStorage["Type"]);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
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
            // { Text: "Grading Page", link: "/professor/Grading_Page" },
            { Text: "Students Grades", link: "/professor/studentsgrades" },
            { Text: "New Requirement", link: "/professor/NewAssignment" },
          ],
        });
        break;
      case "Student":
        setLinks({
          navLinks: [
            { Text: "Requirements", link: "/student/Assignments" },
            // { Text: "Upload", link: "/student/submit" },
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

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        <Link to="/" style={{ color: "inherit", textDecoration: "none" }}>
          <Avatar
            src={logo}
            alt="Oral Radiology"
            sx={{
              width: 80,
              height: 80,
              marginLeft: "auto",
              marginRight: "auto",
            }}
            className="OralLogo"
          />
          Oral Radiology
        </Link>
      </Typography>
      <List>
        {Links.navLinks.map((ele, index) => (
          <ListItem button key={index} component={Link} to={ele.link}>
            <ListItemText primary={ele.Text} />
          </ListItem>
        ))}
      </List>
    </Box>
  );
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="static"
        className="oralNavbar"
        style={{ position: "relative" }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
          >
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
              display: { xs: "none", sm: "flex" },
              justifyContent: "space-around",
              alignItems: "center",
              gap: 2,
            }}
          >
            {Links.navLinks.map((ele, index) =>
              userType === "Professor" && ele.Text === "New Requirement" ? (
                <Button
                  variant="contained" // You can choose "contained", "outlined", or "text" for the style
                  color="primary"
                  key={index}
                  onClick={() => {
                    //   sessionStorage.setItem("actionType", "insert");
                  }}
                >
                  <Link
                    style={{ color: "inherit", textDecoration: "none" }}
                    to={ele.link}
                  >
                    {ele.Text}
                  </Link>
                </Button>
              ) : (
                <Button color="inherit" key={index}>
                  <Link
                    style={{ color: "inherit", textDecoration: "none" }}
                    to={ele.link}
                  >
                    {ele.Text}
                  </Link>
                </Button>
              )
            )}
          </Box>
          {getSession("PersonalImage") && (
            // {decryptData(sessionStorage["PersonalImage"] || "") && (
            <Tooltip title="Open Menu" sx={{ mx: 2 }}>
              <IconButton onClick={handleOpenUserMenu}>
                <Avatar
                  src={getSession("PersonalImage")}
                  alt={getSession("Name")}
                  // src={decryptData(sessionStorage["PersonalImage"])}
                  // alt={decryptData(sessionStorage["Name"])}
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
      <Box component="nav">
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": { boxSizing: "border-box", width: "240px" },
          }}
        >
          {drawer}
        </Drawer>
      </Box>
    </Box>
  );
};

export default Navbar;
