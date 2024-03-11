import React from "react";
import { useEffect } from "react";

import "./css/bootstrap.min.css";
import "./css/profile.css";
import Navbar from "../../Components/Navbar/navbar";
// import logo from "./img/logo.png";

function Profile() {
  const containerStyle = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "100vh",
    width: "100vw",
  };

  // const imgStyle = {
  //   width: "80px",
  //   height: "80px",
  // };

  const cardStyle = {
    width: "300px",
  };

  const smallFontStyle = {
    fontStyle: "italic",
    fontSize: "small",
    color: "grey",
    marginBottom: "4px",
  };

  useEffect(() => {
    // Add the class to the body element when the component mounts
    document.body.classList.add("ProfileBody");

    // Remove the class from the body element when the component unmounts
    return () => document.body.classList.remove("ProfileBody");
  }, []);

  return (
    <>
      <Navbar />

      <div style={containerStyle} className="Profile">
        <div className="container-xl px-4 mt-4">
          <div className="row">
            <div className="col-xl-4">
              <div className="card mb-4 mb-xl-0" style={cardStyle}>
                <div className="card-header">Profile Picture</div>
                <div className="card-body text-center">
                  <img
                    className="img-account-profile rounded-circle mb-2"
                    style={{ width: "200px", height: "200px" }}
                    src="https://media-hbe1-1.cdn.whatsapp.net/v/t61.24694-24/416174799_749980907087258_7853982289657493947_n.jpg?ccb=11-4&oh=01_AdS9MEq31f5H9fyYRViGQeI6Y00EP5F2sIpCUNMjhrd43Q&oe=65F19E22&_nc_sid=e6ed6c&_nc_cat=106"
                    alt=""
                  />
                  <div style={smallFontStyle}>
                    JPG or PNG no larger than 5 MB
                  </div>
                  <button className="btn btn-primary" type="button">
                    Upload new image
                  </button>
                </div>
              </div>
            </div>
            <div className="col-xl-8">
              <div className="card mb-4">
                <div className="card-header">Account Details</div>
                <div className="card-body">
                  <form>
                    <div className="mb-3">
                      <label className="small mb-1" htmlFor="inputUsername">
                        Username (MSA ID)
                      </label>
                      <input
                        className="form-control"
                        id="inputUsername"
                        type="text"
                        placeholder="Enter your username"
                        value="username"
                      />
                    </div>
                    <div className="row gx-3 mb-3">
                      <div className="col-md-6">
                        <label className="small mb-1" htmlFor="inputFirstName">
                          First name
                        </label>
                        <input
                          className="form-control"
                          id="inputFirstName"
                          type="text"
                          placeholder="Enter your first name"
                          value="Valerie"
                        />
                      </div>
                      <div className="col-md-6">
                        <label className="small mb-1" htmlFor="inputLastName">
                          Last name
                        </label>
                        <input
                          className="form-control"
                          id="inputLastName"
                          type="text"
                          placeholder="Enter your last name"
                          value="Luna"
                        />
                      </div>
                    </div>
                    <div className="row gx-3 mb-3">
                      <div className="col-md-6">
                        <label className="small mb-1" htmlFor="inputOrgName">
                          Groub
                        </label>
                        <input
                          className="form-control"
                          id="inputOrgName"
                          type="text"
                          placeholder="Enter your organization name"
                          value="Start Bootstrap"
                        />
                      </div>
                      <div className="col-md-6">
                        <label className="small mb-1" htmlFor="inputLocation">
                          Anything
                        </label>
                        <input
                          className="form-control"
                          id="inputLocation"
                          type="text"
                          placeholder="Enter your location"
                          value="San Francisco, CA"
                        />
                      </div>
                    </div>
                    <div className="mb-3">
                      <label className="small mb-1" htmlFor="inputEmailAddress">
                        Email address
                      </label>
                      <input
                        className="form-control"
                        id="inputEmailAddress"
                        type="email"
                        placeholder="Enter your email address"
                        value="name@example.com"
                      />
                    </div>
                    <div className="row gx-3 mb-3">
                      <div className="col-md-6">
                        <label className="small mb-1" htmlFor="inputPhone">
                          Phone number
                        </label>
                        <input
                          className="form-control"
                          id="inputPhone"
                          type="tel"
                          placeholder="Enter your phone number"
                          value="555-123-4567"
                        />
                      </div>
                      <div className="col-md-6">
                        <label className="small mb-1" htmlFor="inputBirthday">
                          Birthday
                        </label>
                        <input
                          className="form-control"
                          id="inputBirthday"
                          type="text"
                          name="birthday"
                          placeholder="Enter your birthday"
                          value="06/10/1988"
                        />
                      </div>
                    </div>
                    <button className="btn btn-primary" type="button">
                      Save changes
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Profile;
