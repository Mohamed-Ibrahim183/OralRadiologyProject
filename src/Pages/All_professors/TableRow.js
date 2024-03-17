import React from 'react';
import bin from'./images/bin.png';
import pen from'./images/pen.png'
function TableRow({ record }) {
    return (
        <tbody>
            <tr>
                <td><img className="profile-pic" src={record.profilePic} alt={record.name} /></td>
                <td>{record.name}</td>
                <td>{record.department}</td>
                <td>{record.gender}</td>
                <td>{record.education}</td>
                <td>{record.mobile}</td>
                <td>{record.email}</td>
                <td>{record.joiningDate}</td>
                <td>
                <img src={pen} className="icon pen" />
                <img src={bin} className="icon basket" />
                </td>
            </tr>
        </tbody>
    );
}
export default TableRow;