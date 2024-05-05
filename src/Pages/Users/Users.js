import React, { useEffect, useState } from "react";
import "./users2.css";
import Navbar from "../../Components/Navbar/Navbar";
import axios from "axios";

const Users = () => {
  const [view, setView] = useState([]);

  useEffect(() => {
    document.body.classList.add("TableBody");

    FetchFirst();

    return () => document.body.classList.remove("TableBody");
  }, []);

  function FetchFirst() {
    const url = "http://localhost/Projects/OralRadiology/userLogic.php/Users";
    axios
      .get(url)
      .then((res) => {
        console.log(res.data);
        const content = res.data.map((ele) => (
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
      })
      .catch((error) => console.log(error));
  }

  return (
    <>
      <Navbar />
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
