import React, { useEffect, useState } from "react";
// import "./NavAdmin.css";
import "./Admincss.css";
import { Link } from "react-router-dom";

const NavAdmin = () => {
  useEffect(() => {
    const arrowClickHandler = (e) => {
      let arrowParent = e.target.parentElement.parentElement;
      arrowParent.classList.toggle("showMenu");
    };

    const sidebarBtnClickHandler = () => {
      const sidebar = document.querySelector(".sidebar");
      sidebar.classList.toggle("close");
      document.querySelector(".AdminSection").classList.toggle("openSideBar");
      // document.querySelector(
      //   ".AdminSection"
      // ).style.cssText = `margin-left: 200px`;
    };

    const arrow = document.querySelectorAll(".arrow");
    arrow.forEach((element) => {
      element.addEventListener("click", arrowClickHandler);
    });

    const sidebarBtn = document.querySelector(".bx-menu");

    sidebarBtn.addEventListener("click", sidebarBtnClickHandler);

    return () => {
      arrow.forEach((element) => {
        element.removeEventListener("click", arrowClickHandler);
      });
      sidebarBtn.removeEventListener("click", sidebarBtnClickHandler);
    };
  }, []);

  const HeaderHeight = 80;
  const [scroll, setScroll] = useState(window.scrollY);
  const [styles, setStyle] = useState({ top: "80px" });

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > HeaderHeight) {
        setScroll(0);
      } else {
        setScroll(HeaderHeight - window.scrollY);
      }
    };
    setScroll(80);

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    setStyle({ top: `${scroll}px` });
  }, [scroll]);

  return (
    <div>
      <div className="sidebar close" style={styles}>
        <div className="logo-details">
          {/* <i className="bx bxl-c-plus-plus"></i> */}
          <i class="fa-solid fa-user-tie"></i>
          <span className="logo_name">Admin</span>
        </div>
        <ul className="nav-links">
          <li>
            <Link>
              <i className="bx bx-grid-alt"></i>
              <span className="link_name">Dashboard</span>
            </Link>
          </li>
          <li>
            <div className="iocn-link">
              <Link>
                <i className="bx bx-collection"></i>
                <span className="link_name">Category</span>
              </Link>
              <i className="bx bxs-chevron-down arrow"></i>
            </div>
            <ul className="sub-menu">
              <li>
                <Link>HTML & CSS</Link>
              </li>
              <li>
                <Link>JavaScript</Link>
              </li>
              <li>
                <Link>PHP & MySQL</Link>
              </li>
            </ul>
          </li>
          <li className="bx-menu">
            <Link>
              <i className="bx bx-menu"></i>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default NavAdmin;
