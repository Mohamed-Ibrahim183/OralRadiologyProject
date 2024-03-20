import React from 'react';

function TableRow_Grading_Page({ record }) {
    return (
        <tbody>
            <tr>
                <td><input type='Checkbox'></input></td>
                <td><img className="profile-pic" src={record.profilePic} alt={record.name} /></td>
                <td>{record.name}</td>
                <td>{record.IDD}</td>
                <td>{record.email}</td>
                <td>{record.status}</td>
                <td><input type='number' className='grade_num'></input></td>
                <td></td>
                <td></td>
                <td>{record.joiningDate}</td>
                <td><input type='text'></input></td>
            </tr>
        </tbody>
    );
}
export default TableRow_Grading_Page;