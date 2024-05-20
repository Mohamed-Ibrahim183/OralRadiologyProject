import React from 'react';

const TableRow_Grading_Page = ({ record }) => {
  return (
    <tr>
      <td><input type='checkbox' /></td>
      <td><img src={record.profilePic} alt="Profile" /></td>
      <td>{record.name}</td>
      <td>{record.IDD}</td>
      <td>{record.email}</td>
      <td></td>
      <td></td>
      <td>{record.joiningDate}</td>
      <td>
        <button onClick={record.openModal}>View Submissions</button>
      </td>
      <td></td>
      <td><input type='' ></input></td>
    </tr>
  );
};

export default TableRow_Grading_Page;
