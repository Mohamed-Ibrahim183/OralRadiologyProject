import React, { useState } from "react";

function TableRow_Grading_Page({ record }) {
  const [isHovered, setIsHovered] = useState(false);

  const handleHover = () => {
    setIsHovered(!isHovered);
  };

  return (
    <tbody>
      <tr>
        <td>
          <input type="Checkbox"></input>
        </td>
        <td>
          <img
            className="profile-pic"
            src={record.profilePic}
            alt={record.name}
          />
        </td>
        <td>{record.name}</td>
        <td>{record.IDD}</td>
        <td>{record.email}</td>
        <td>{record.status}</td>
        <td className="grade_column">
          <input type="number" className="grade_num" />
          <button
            type="submit"
            className={`grade_button ${isHovered ? "hovered" : ""}`}
            onMouseEnter={handleHover}
            onMouseLeave={handleHover}
          >
            Grade
          </button>
        </td>
        <td></td>
        <td></td>
        <td>{record.joiningDate}</td>
        <td>
          <input type="text" className="FeedBack"></input>
        </td>
      </tr>
    </tbody>
  );
}
export default TableRow_Grading_Page;
