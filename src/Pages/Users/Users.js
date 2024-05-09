import React, { useEffect, useState } from "react";
import "./users2.css";
import Navbar from "../../Components/Navbar/Navbar";
import axios from "axios";
import { Navigate } from "react-router-dom";

const Users = () => {
  const [view, setView] = useState([]);
  const [Type, setType] = useState("Student");
  const [data, setData] = useState([]);

  useEffect(() => {
    document.body.classList.add("TableBody");

    FetchFirst();

    return () => document.body.classList.remove("TableBody");
  }, []);

  function FrontView(dataContent) {
    const content = dataContent.map((ele) => (
      <tr key={ele.Id}>
        <td>{ele.Id}</td>
        <td>{ele.MSAId}</td>
        <td>{ele.Type}</td>
        <td>{ele.Email}</td>
        <td className="select">
          <button className="button edit">Edit</button>
          <button className="button del">Delete</button>
        </td>
      </tr>
    ));
    setView(content);
  }

  function FetchFirst() {
    const url = "http://localhost/Projects/OralRadiology/userLogic.php/Users";
    axios.get(url).then((res) => {
      console.log(res.data);
      if (res.data) FrontView(res.data);
    });
    // .catch((error) => console.log(error));
  }

  function handleType(e) {
    setType(e.target.value);
  }
  useEffect(() => {
    // console.log(Type);
    const url =
      "http://localhost/Projects/OralRadiology/userLogic.php/Users/" + Type;
    axios.get(url).then((res) => {
      FrontView(res.data);
    });
  }, [Type]);

  if (sessionStorage["Type"] !== "Admin") {
    return <Navigate to="/" />;
  }

  return (
    <>
      <Navbar />
      <select name="Type" id="Type" onChange={handleType}>
        <option value="Student">Student</option>
        <option value="Professor">Professor</option>
        <option value="Admin">Admin</option>
      </select>
      <div className="Table">
        <h1>Users</h1>
        <main>
          <table>
            <thead>
              <tr>
                <th>#</th>
                <th>MSA ID</th>
                <th>Type</th>
                <th>Email</th>
                <th></th>
              </tr>
            </thead>
            <tfoot>
              <tr>
                <th colSpan="5">Spring 24</th>
              </tr>
            </tfoot>
            <tbody>{view}</tbody>
          </table>
        </main>
      </div>
    </>
  );
};

export default Users;
