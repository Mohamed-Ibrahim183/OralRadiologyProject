import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import DarkMode from "../DarkMode/DarkMode";
import "./Nav.css";

const Navbar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [Links, setLinks] = useState(null);
  const userType = sessionStorage["Type"];

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
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };
  const content3 = Links.navLinks.map((ele) => (
    <li key={ele.link}>
      <Link to={ele.link}>{ele.Text}</Link>
    </li>
  ));

  const content2 = Links.Pages.map((ele) => (
    <li key={ele.link + ele.Text}>
      <Link
        to={ele.link}
        className="Page"
        onClick={ele.fun ? () => ele.fun() : null}
      >
        {ele.Text}
      </Link>
    </li>
  ));

  return (
    <>
      <div className="HEADER">
        <nav className="secondary-Navigation">
          <div></div>
          <input type="checkbox" id="check" />
          <label htmlFor="check" className="checkBtn">
            <i className="fas fa-bars"></i>
          </label>
          <label className="logo">
            <span>Oral Radiology</span>
          </label>
          <ul className="MainList">
            {content3}
            {userType && (
              <li className="DropParent" onClick={toggleDropdown}>
                <Link to="">
                  Pages <i className="fa-solid fa-caret-down"></i>
                </Link>
                <ul
                  className={`dropDown`}
                  style={{
                    display: isDropdownOpen ? "block" : "none",
                  }}
                >
                  {content2}
                </ul>
              </li>
            )}
          </ul>
        </nav>
        <DarkMode />
      </div>
    </>
  );
};

export default Navbar;
