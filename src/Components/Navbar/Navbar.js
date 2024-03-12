import React from "react";
import logo from "./imgs/logo.jpg";
import { Link } from "react-router-dom";
import "./Nav.css";
import { useEffect, useState } from "react";
import LinksFile from "./NavLinks.json";
import PagesFiles from "./Pages.json";

const Navbar = () => {
  const [navLinks, setNavLinks] = useState([]);
  const [Pages, setPages] = useState([]);
  useEffect(() => setNavLinks(LinksFile), []);
  useEffect(() => setPages(PagesFiles), []);

  const content1 = navLinks.map(function (ele) {
    return (
      <li className="NavLink">
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
      <div className="Nav">
        <div className="leftLogo">
          <img src={logo} alt="logo" />
          <span className="logoName">Oral Radiology</span>
        </div>
        <nav class="primary-navigation">
          <ul>
            {content1}
            <li>
              Pages <i class="fa-solid fa-caret-down"></i>
              <ul className="dropdown">{content2}</ul>
            </li>
          </ul>
        </nav>
      </div>
    </>
  );
};

export default Navbar;
