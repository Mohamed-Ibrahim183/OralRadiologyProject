import React, { useState } from "react";
import { useEffect } from "react";
import "./AddProf.css";
import File from "./data.json";
import NavAdmin from "../../Components/AdminNav2/NavAdmin";

export default function App() {
  useEffect(() => {
    // Add the class to the body element when the component mounts
    document.body.classList.add("PageBody");

    // Remove the class from the body element when the component unmounts
    return () => document.body.classList.remove("PageBody");
  }, []);

  const [data, setData] = useState([]);
  useEffect(() => setData(File), []);
  const content = data.map(function (ele) {
    return (
      <div className="user-input-box">
        <label htmlFor={ele.name}>{ele.text}:</label>
        <input
          type={ele.type}
          id={ele.name}
          name={ele.name}
          placeholder={ele.placeholder}
        />
      </div>
    );
  });
  const [state, setState] = useState(false);
  // useEffect(() => {
  //   if (state < 1000) {
  //     setState(true);
  //   }
  // }, []);

  return (
    <>
      <NavAdmin open={state} />
      <div class="container AddProf adminHomeSection">
        <h1 className="form-title">Add professor</h1>
        <hr class="title-line"></hr>
        <form action="#">
          <div className="main-user-info">
            {content}
            <div className="user-input-box">
              <label htmlFor="cvFile">Choose File</label>
              <input type="file" id="cvFile" name="cvFile" />
            </div>
            <div className="user-input-box">
              <label htmlFor="education">Education</label>
              <textarea
                id="education"
                name="education"
                placeholder="Enter Education"
              />
            </div>
            <div className="user-input-box">
              <label htmlFor="gender">Gender</label>
              <select id="gender" name="gender">
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </div>
          </div>
          <input type="submit" value="add professor" />
          {/* <div className="form-submit-btn">
        </div> */}
        </form>
      </div>
    </>
  );
}
