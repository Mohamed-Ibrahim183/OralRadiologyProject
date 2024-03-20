import React from 'react';

function TableRow_Grading_Page({ record }) {
    return (
        <tbody>
            <tr>
                <td><input type='Checkbox'></input></td>
                <td><img className="profile-pic" src={record.profilePic} alt={record.name} /></td>
                <td>{record.name}</td>
                <td>{record.department}</td>
                <td>{record.gender}</td>
                <td>{record.education}</td>
                <td>{record.mobile}</td>
                <td>{record.email}</td>
                <td>{record.joiningDate}</td>
                <td>

                </td>
            </tr>
        </tbody>
    );
}
export default TableRow_Grading_Page;