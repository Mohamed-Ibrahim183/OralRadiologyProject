import React, { useEffect, useState } from "react";
import "./EditUser.css";
import Navbar from "../../Components/Navbar/Navbar";
import axios from "axios";
import { useParams } from "react-router-dom";

const EditUser = () => {
  const [data, setData] = useState({});
  const urlData = useParams();

  useEffect(() => {
    fetchData();
  }, [urlData]);

  const fetchData = async () => {
    try {
      const url = `http://localhost/Projects/Oral Radiology/api.php/${urlData.id}`;
      const response = await axios.get(url);
      setData(response.data);
      populateFormData(response.data);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  const populateFormData = (userData) => {
    const keys = [
      "Id",
      "Username",
      "Password",
      "MSAId",
      "Name",
      "Email",
      "Type",
      "PersonalImage",
    ];
    keys.forEach((key) => {
      document.querySelector(`#${key}`).value = userData[key] || "NONE";
    });
  };

  const handleSave = () => {
    const url = `http://localhost/Projects/Oral Radiology/api.php/${urlData.id}`;
    axios
      .put(url, data)
      .then((res) => console.log(res.data))
      .catch((error) => console.error(error));
  };

  const handleChange = (name) => (event) => {
    const value = event.target.value;
    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <>
      <Navbar />
      <div className="editPage">
        <h2 className="title">Edit User ID={urlData.id}</h2>
        <div className="main">
          <div className="mainLeft">
            {[
              "Id",
              "Username",
              "Password",
              "MSAId",
              "Name",
              "Email",
              "Type",
              "PersonalImage",
            ].map((fieldName) => (
              <div className="row" key={fieldName}>
                <span>{fieldName}</span>
                <input
                  type="text"
                  name={fieldName}
                  id={fieldName}
                  onChange={handleChange(fieldName)}
                />
              </div>
            ))}
            <button className="saveBTN" onClick={handleSave}>
              Save
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditUser;
