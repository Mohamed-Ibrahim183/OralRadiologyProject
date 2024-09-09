const TableRowGradingPage = ({ record, onGradeChange, onCommentChange }) => {
  const handleGradeChange = (e) => {
    onGradeChange(record.IDD, e.target.value);
  };

  const handleCommentChange = (e) => {
    onCommentChange(record.IDD, e.target.value);
  };

  return (
    <tr>
      <td>
        <img
          src={record.profilePic}
          alt="Profile"
          style={{ width: "40px", height: "40px", borderRadius: "50%" }}
        />
      </td>
      <td>{record.name}</td>
      <td>{record.IDD}</td>
      <td>{record.email}</td>
      {/* <td></td> */}
      {/* Grade */}
      <td>
        <input
          type="number"
          className="GradingGradeInput"
          value={record.Grade["Total"] ?? 0} // Default to 0 if Grade is null or undefined
          readOnly={true}
          // onChange={handleGradeChange}
        />
      </td>
      <td>{record.Time}</td>

      {/* <td>{record.joiningDate}</td> */}
      <td>
        <button onClick={record.openModal} className="GradingViewSumbissionBtn">
          {" "}
          View Submissions
        </button>
      </td>
      {/* Feedback comment */}
      {/* <td>
        <input
          type="text"
          value={record.Comment ?? ""} // Default to empty string if Comment is null or undefined
          onChange={handleCommentChange}
        />
      </td> */}
    </tr>
  );
};

export default TableRowGradingPage;
