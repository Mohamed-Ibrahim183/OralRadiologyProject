import React, { useEffect } from "react";
import { ReactComponent as Sun } from "./Sun.svg";
import { ReactComponent as Moon } from "./Moon.svg";
import "./DarkMode.css";

const DarkMode = () => {
  const setDarkMode = () => {
    document.querySelector("body").setAttribute("Theme", "Dark");
    localStorage.setItem("Theme", "Dark");
  };
  const setLightMode = () => {
    document.querySelector("body").setAttribute("Theme", "Light");
    localStorage.setItem("Theme", "Light");
  };
  function handleDarkMode(e) {
    if (e.target.checked) {
      setDarkMode();
    } else {
      setLightMode();
    }
  }
  useEffect(() => {
    if (localStorage.getItem("Theme") === "Dark") {
      setDarkMode();
    } else {
      setLightMode();
    }
  }, []);

  return (
    <div className="dark_mode">
      <input
        className="dark_mode_input"
        type="checkbox"
        id="dark-mode-toggle"
        onChange={handleDarkMode}
        defaultChecked={localStorage.getItem("Theme") === "Dark"}
      />
      <label className="dark_mode_label" htmlFor="dark-mode-toggle">
        <Sun />
        <Moon />
      </label>
    </div>
  );
};

export default DarkMode;
