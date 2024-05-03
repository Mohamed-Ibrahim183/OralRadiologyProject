import React, { useState } from "react";
import "./File.css";
import axios from "axios";
const File = () => {
  const [msg, setMsg] = useState("");
  function selectFile() {
    document.getElementById("Photo").click();
  }
  function setFile(event) {
    const url = "http://localhost/Projects/Oral Radiology/File.php";
    const data = new FormData();
    data.append("File", event.target.files[0]);
    axios
      .post(url, data)
      .then((res) => {
        setMsg("");
        console.log(res.data);
      })
      .catch((res) => setMsg("Error"));
  }

  return (
    <div className="File container">
      <div className="main">
        <input type="file" name="Photo" id="Photo" onChange={setFile} />
        <button className="MainBtn" onClick={selectFile}>
          Select File
        </button>
        <p>{msg}</p>
      </div>
    </div>
  );
};

export default File;
