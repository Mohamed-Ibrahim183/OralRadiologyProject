import React from 'react';

const TableRow_Grading_Page = ({ record }) => {
  return (
    <tr>
      <td><input type='checkbox' /></td>
      <td><img src={record.profilePic} alt="Profile" style={{width:"40px",height:"40px",borderRadius:"50%"}}/></td>
      <td>{record.name}</td>
      <td>{record.IDD}</td>
      <td>{record.email}</td>
      <td></td>
      {/* Grade */}
      <td><input type='number' style={{width:"50%"}} ></input></td>
      <td>{record.joiningDate}</td>
      <td>
        <button onClick={record.openModal}>View Submissions</button>
      </td>
      <td></td>
      {/* FeedBack comment */}
      <td><input type='text' ></input></td>
    </tr>
  );
};

export default TableRow_Grading_Page;
