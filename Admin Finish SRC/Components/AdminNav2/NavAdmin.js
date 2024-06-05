import React, { useEffect, useState } from "react";
import "./Admincss.css";
import { Link } from "react-router-dom";

const NavAdmin = ({ open = true }) => {
  useEffect(() => {
    async function setNav() {
      setScroll(HeaderHeight - window.scrollY);
    }
    setTimeout(() => {
      setNav();
    }, 0.001);

    const arrowClickHandler = (e) => {
      let arrowParent = e.target.parentElement.parentElement;
      arrowParent.classList.toggle("showMenu");
    };

    const sidebarBtnClickHandler = () => {
      const sidebar = document.querySelector(".sidebar");
      sidebar.classList.toggle("close");
      if (open) {
        document
          .querySelector(".adminHomeSection")
          .classList.toggle("openSideBar");
      }
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

  const links = [
    {
      Text: "Home",
      To: "/",
      logoClass: "bx bx-grid-alt",
    },
    {
      Text: "Professors",
      To: "",
      logoClass: "fa-solid fa-chalkboard-user",
      Menu: [
        {
          Text: "Add Professor",
          To: "/AddProf",
          logoClass: "fa-solid fa-user-plus",
        },
        {
          Text: "All Professor",
          To: "/Allprof",
          logoClass: "fa-solid fa-person-dots-from-line",
        },
      ],
    },
  ];

  function fill(arr) {
    return arr.map(function (ele) {
      return (
        <li key={ele.To}>
          <Link to={ele.To}>{ele.Text}</Link>
        </li>
      );
    });
  }

  const content = links.map(function (ele) {
    if (ele.Menu) {
      return (
        <li key={ele.To + ele.Text}>
          <div className="iocn-link">
            <Link to={ele.To}>
              <i className={ele.logoClass}></i>
              <span className="link_name">{ele.Text}</span>
            </Link>
            <i className="bx bxs-chevron-down arrow"></i>
          </div>
          <ul className="sub-menu">{fill(ele.Menu)}</ul>
        </li>
      );
    }
    return (
      <li key={ele.To + ele.Text}>
        <Link to={ele.To}>
          <i className={ele.logoClass}></i>
          <span className="link_name">{ele.Text}</span>
        </Link>
      </li>
    );
  });

  return (
    <div>
      <div className="sidebar close" style={styles}>
        <div className="logo-details">
          <i className="fa-solid fa-user-tie"></i>
          <span className="logo_name">Admin</span>
        </div>
        <ul className="nav-links">
          {content}
          <li className="bx-menu" key="menu-button">
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
