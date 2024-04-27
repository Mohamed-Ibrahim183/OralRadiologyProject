import React from "react";
import axios from "axios";

const BasicForm = () => {
  const [name, setName] = React.useState("");

  function change(e) {
    setName(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    // console.log(name);
    const url = "http://localhost/testOral/server.php";
    let fData = new FormData();
    fData.append("name", name);
    axios
      .post(url, fData)
      .then((response) => {
        console.log(response. data); // Log the response data
        console.log("name", response.data["name"]);
        console.log("city", response.data["city"]);
        console.log(`age ${response.data["age"]}`);
        // end(response.data);
      })
      .catch((error) => alert(error));
  }

  // function end(data) {
  //   console.log(data);
  //   // Handle the response data here
  // }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="username"
        placeholder="username"
        value={name}
        onChange={change}
      />
      <input type="text" name="password" placeholder="password" />
      <button type="submit">Submit</button>
    </form>
  );
};

export default BasicForm;
