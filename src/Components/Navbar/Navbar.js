import React, { useEffect, useState } from "react";
import logo from "./imgs/logo.jpg";
import { Link } from "react-router-dom";
import "./Nav.css";
import LinksFile from "./NavLinks.json";
import PagesFiles from "./Pages.json";

const Navbar = () => {
  const [navLinks, setNavLinks] = useState([]);
  const [Pages, setPages] = useState([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  useEffect(() => setNavLinks(LinksFile), []);
  useEffect(() => setPages(PagesFiles), []);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  // const closeDropdown = () => {
  //   setIsDropdownOpen(false);
  // };

  const content1 = navLinks.map(function (ele) {
    return (
      <li className="NavLink">
        <Link to={ele.link}>{ele.Text}</Link>
      </li>
    );
  });

  const content3 = navLinks.map(function (ele) {
    return (
      <li>
        <Link to={ele.link}>{ele.Text}</Link>
      </li>
    );
  });

  const content2 = Pages.map(function (ele) {
    return (
      <li>
        <Link to={ele.link} className="Page">
          {ele.Text}
        </Link>
      </li>
    );
  });

  return (
    <>
      <nav className="secondary-Navigation">
        <input type="checkbox" id="check" />
        <label htmlFor="check" className="checkbtn">
          <i className="fas fa-bars"></i>
        </label>
        <label className="logo">Oral Radiology</label>
        <ul>
          {content3}
          <li className="DropParent" onClick={toggleDropdown}>
            {/* two */}
            <Link to="">
              Pages <i className="fa-solid fa-caret-down"></i>
            </Link>
            <ul
              className="dropDown"
              style={{ display: isDropdownOpen ? "block" : "none" }}
            >
              {content2}
            </ul>
          </li>
        </ul>
      </nav>
    </>
  );
};

export default Navbar;
