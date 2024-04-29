import React, { useEffect } from "react";
// import { Link } from "react-router-dom";
import Navbar from "../../Components/Navbar/Navbar";
import axios from "axios";
// import { retinaScale } from "chart.js/helpers";
// import { Navigate } from "react-router-dom";

import { useParams } from "react-router-dom";
const Groups = () => {
  const [groups, setGroups] = React.useState([]);
  const id = useParams();
  console.log("id:", id);
  useEffect(() => {
    const url = "http://localhost/Projects/Oral Radiology/api.php/Display";
    axios
      .get(url)
      .then((res) => {
        console.log(res.data);
        setGroups(res.data);
      })
      .catch((error) => console.error(error));
    // Navigate("/");
  }, []);
  function handleEdit(id) {}
  return (
    <>
      <Navbar />
      {/* <button onClick={handleClick}>click me</button> */}
      <table cellSpacing={20}>
        <thead>
          <tr>
            <th>#</th>
            <th>username</th>
            <th>MSA ID</th>
            <th>Email</th>
            <th>User Type</th>
            {/* <th>Type</th>
            <th>Personal Image</th> */}
          </tr>
        </thead>
        <tbody>
          {groups.map((ele) => {
            return (
              <tr>
                <th>{ele.Id}</th>
                <td>{ele.Username}</td>
                {/* <td>{ele.Password}</td> */}
                <td>{ele.MSAId}</td>
                <td>{ele.Email}</td>
                <td>{ele.Type}</td>
                {/* <td>{ele.PersonalImage || "No Image"}</td> */}
                <button>{/* <Link to="/Home2">Go</Link> */}</button>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
};

export default Groups;
