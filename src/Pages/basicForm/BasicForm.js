import React from "react";
import axios from "axios";
import Navbar from "../../Components/Navbar/Navbar";
const BasicForm = () => {
  const [name, setName] = React.useState("");

  function change(e) {
    setName(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    // console.log(name);
    const url = "http://localhost/Projects/Oral Radiology2/userLogic.php/Login";

    let fData = new FormData();
    fData.append("MSAId", name);
    fData.append("Password", document.querySelector("#pass").value);
    axios
      .post(url, fData)
      .then((response) => {
        console.log(response.data); // Log the response data
      })
      .catch((error) => alert(error));
  }

  return (
    <>
      <Navbar />
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="MSAId"
          placeholder="MSA ID"
          value={name}
          onChange={change}
        />
        <input type="text" name="Password" placeholder="password" id="pass" />
        <button type="submit">Submit</button>
      </form>
    </>
  );
};

export default BasicForm;
