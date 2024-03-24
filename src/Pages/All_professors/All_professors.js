import React from 'react';
//import "./All_professors.css";
import TableHeader from './TableHeader';
import TableRow from './TableRow';
import monem from './Professors.json';
import Navbar from '../../Components/Navbar/Navbar';
import "./AllProfessorPage.css";
function ProfessorTable() {
    return (

        <>
        <Navbar />
        <div className="monem_admin">
            <div className='oooo'>
                <h2>All Professors</h2>
                <button className='addbutton'>+ Add New</button>
            </div>
            <hr></hr>
        <label htmlFor='searchh'id='searchhh'>Search: </label>
        <input type='search' id='searchh'></input>
            <table className="table">
                <TableHeader />
                {monem.map(record => (
    <TableRow key={record.id} record={record} />
))}
            </table>
        </div>
        
        </>

    );
}
export default ProfessorTable;
