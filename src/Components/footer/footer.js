import React, { useState } from "react";
import "./footer.css";
import { FaEnvelope, FaLinkedin } from "react-icons/fa"; // Import icons
import monem from "./imgs/Mana3emo.jpeg"; // Correctly imported image
import soltan from "./imgs/aboelSlateen.jpeg"; // Correctly imported image

const Footer = () => {
  const [modalInfo, setModalInfo] = useState({
    name: "",
    phone: "",
    email: "",
    linkedIn: "",
    photo: "",
  });
  const [isModalOpen, setIsModalOpen] = useState(false);

  const teamMembers = [
    {
      name: "Abdelmonem Hatem",
      phone: "01093820412",
      email: "abdelmonem.hatem@msa.edu.eg",
      linkedIn: "https://www.linkedin.com/in/abdelmonem-hatem",
      photo: monem, // Use the imported image
    },
    {
      name: "Mohamed Ibrahim",
      phone: "01027051271",
      email: "mohamed.ibrahim42@msa.edu.eg",
      linkedIn: "https://www.linkedin.com/in/msoltan1", // Use correct LinkedIn URL
      photo: soltan, // Use the imported image
    },
  ];

  const openModal = (member) => {
    setModalInfo({
      name: member.name,
      phone: member.phone,
      email: member.email,
      linkedIn: member.linkedIn,
      photo: member.photo, // Add photo to modal info
    });
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="footer">
      <footer>
        <div className="waves">
          <div className="wave" id="wave1"></div>
          <div className="wave" id="wave2"></div>
          <div className="wave" id="wave3"></div>
          <div className="wave" id="wave4"></div>
        </div>
        <ul className="social-icon">
          <li className="social-icon__item">
            <a className="social-icon__link" href="#">
              <ion-icon name="logo-facebook"></ion-icon>
            </a>
          </li>
          <li className="social-icon__item">
            <a className="social-icon__link" href="#">
              <ion-icon name="logo-twitter"></ion-icon>
            </a>
          </li>
          <li className="social-icon__item">
            <a className="social-icon__link" href="#">
              <ion-icon name="logo-linkedin"></ion-icon>
            </a>
          </li>
          <li className="social-icon__item">
            <a className="social-icon__link" href="#">
              <ion-icon name="logo-instagram"></ion-icon>
            </a>
          </li>
        </ul>
        <ul className="menu">
          <li className="menu__item">
            <a className="menu__link" href="#">
              Home
            </a>
          </li>
          <li className="menu__item">
            <a className="menu__link" href="#">
              About
            </a>
          </li>
          <li className="menu__item">
            <a className="menu__link" href="#">
              Services
            </a>
          </li>
          <li className="menu__item">
            <a className="menu__link" href="#">
              Team
            </a>
          </li>
          <li className="menu__item">
            <a className="menu__link" href="#">
              Contact
            </a>
          </li>
        </ul>
        <div className="copyrights">
          <div className="one">
            <p>&copy; this project made by MSA CS Students</p>
          </div>
          <div className="two">
            {teamMembers.map((member, index) => (
              <p
                key={index}
                className="team-member"
                onClick={() => openModal(member)}
              >
                {member.name}
              </p>
            ))}
          </div>
        </div>

        {isModalOpen && (
          <div className="modal-overlay" onClick={closeModal}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <h2>{modalInfo.name}</h2>
              <div className="memberInfo">
                <div className="leftpart">
                  <img
                    className="teamMemberPhoto"
                    src={modalInfo.photo}
                    alt="team member"
                  />
                </div>
                <div className="rightpart">
                  <p className="icon-linkk">
                    Phone: <span className="info-text"> {modalInfo.phone}</span>
                  </p>
                  <div className="icon-container">
                    <div className="icon-small-container">
                      <a
                        className="icon-link"
                        href={`mailto:${modalInfo.email}`} // Link to email
                      >
                        <FaEnvelope className="icon" />
                        <div className="linkk"> {modalInfo.email}</div>
                      </a>
                    </div>
                    <div className="icon-small-container">
                      <a
                        className="icon-link"
                        href={modalInfo.linkedIn}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <FaLinkedin className="icon linkedinicon" />
                        <div className="linkk"> {modalInfo.linkedIn}</div>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              <button onClick={closeModal}>Close</button>
            </div>
          </div>
        )}
      </footer>
    </div>
  );
};

export default Footer;
