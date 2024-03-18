import React from "react";
import "./AdminNav.css";
import { Link } from "react-router-dom";

const AdminNav = () => {
  const links = [
    {
      Text: "Dashboard",
      To: "/",
      logoClass: "bx bx-grid-alt",
    },
    {
      Text: "Product",
      To: "/",
      logoClass: "bx bx-box",
    },
    {
      Text: "Order list",
      To: "/",
      logoClass: "bx bx-list-ul",
    },
  ];
  const content = links.map(function (ele) {
    return (
      <li>
        <Link to={ele.To}>
          <i className={ele.logoClass}></i>
          <span className="links_name">{ele.Text}</span>
        </Link>
      </li>
    );
  });
  return (
    <div className="sidebar">
      <div className="logo-details">
        <i className="bx bxl-c-plus-plus"></i>
        <span className="logo_name">Admin</span>
      </div>
      <ul className="nav-links">
        {content}
        {/* <li className="log_out">
          <Link to="/">
            <i className="bx bx-log-out"></i>
            <span className="links_name">Log out</span>
          </Link>
        </li> */}
      </ul>
    </div>
  );
};

export default AdminNav;
