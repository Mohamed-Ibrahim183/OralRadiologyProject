import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import DarkMode from "../DarkMode/DarkMode";
import LinksFile from "./NavLinks.json";
import PagesFiles from "./Pages.json";
import logo from "./imgs/logo.jpg";
import "./Nav.css";

const Navbar = () => {
  const [navLinks, setNavLinks] = useState([]);
  const [Pages, setPages] = useState([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  useEffect(() => {
    setNavLinks(LinksFile);
    setPages(PagesFiles);
  }, []);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const content3 = navLinks.map((ele) => (
    <li key={ele.link}>
      <Link to={ele.link}>{ele.Text}</Link>
    </li>
  ));

  const content2 = Pages.map((ele) => (
    <li key={ele.link}>
      <Link to={ele.link} className="Page">
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
          <label className="logo">Oral Radiology</label>
          <ul className="MainList">
            {content3}

            <li className="DropParent" onClick={toggleDropdown}>
              <Link to="">
                Pages <i className="fa-solid fa-caret-down"></i>
              </Link>
              <ul
                className={`dropDown`}
                // className={`dropDown ${isDropdownOpen ? "showDropList" : ""}`}
                // className=
                style={{
                  display: isDropdownOpen ? "block" : "none",
                }}
              >
                {content2}
              </ul>
            </li>
          </ul>
        </nav>
        <DarkMode />
      </div>
    </>
  );
};

export default Navbar;
