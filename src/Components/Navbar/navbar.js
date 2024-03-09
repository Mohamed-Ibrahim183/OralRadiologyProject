import logo from "./imgs/logo.jpg";
import "./css/styles.css";
import "./css/bootstrap.min.css";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg bg-white navbar-light shadow sticky-top p-0">
      <a
        href="index.html"
        className="navbar-brand d-flex align-items-center px-4 px-lg-5"
      >
        <h2 className="m-0 text-primary">
          {" "}
          <img style={{ width: "100px" }} src={logo} alt="logo" />
        </h2>
        <h2 style={{ margin: "50px" }}>Oral Radiology</h2>
      </a>
      <button
        type="button"
        className="navbar-toggler me-4"
        data-bs-toggle="collapse"
        data-bs-target="#navbarCollapse"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarCollapse">
        <div className="navbar-nav ms-auto p-4 p-lg-0">
          <Link to="/" className="nav-item nav-link active">
            Home
          </Link>
          <Link to="/Assignments" className="nav-item nav-link">
            Assignments
          </Link>
          <Link to="/submit" className="nav-item nav-link">
            Upload
          </Link>
          <div className="nav-item dropdown">
            <a
              href="#None" // Edit this !!!
              className="nav-link dropdown-toggle"
              data-bs-toggle="dropdown"
            >
              Pages
            </a>
            <div className="dropdown-menu fade-down m-0">
              <a href="team.html" className="dropdown-item">
                Our Team
              </a>
              <a href="testimonial.html" className="dropdown-item">
                Testimonial
              </a>
              <a href="404.html" className="dropdown-item">
                404 Page
              </a>
            </div>
          </div>
          <a href="contact.html" className="nav-item nav-link">
            Contact
          </a>
        </div>
        <a
          href="#None" // Edit this !!!
          className="btn btn-primary py-4 px-lg-5 d-none d-lg-block"
        >
          Join Now<i className="fa fa-arrow-right ms-3"></i>
        </a>
      </div>
    </nav>
  );
}
export default Navbar;
