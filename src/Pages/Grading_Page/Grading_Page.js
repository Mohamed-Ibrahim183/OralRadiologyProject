import React from 'react';
import "./Grading_Page.css";
import TableHeader_grading_page from './TableHeader_grading_page';
import TableRow_Grading_Page from './TableRow_Grading_Page';
import monem from './Grading_Page.json'
import Navbar from '../../Components/Navbar/Navbar';
function Grading_Page() {
    return (

        <>
        <Navbar />
        <div className="monem2_admin">
            <div className='oooo'>
                <h2>Submissions</h2>
            </div>
            <hr></hr>
        <label htmlFor='searchh'id='searchhh'>Search: </label>
        <input type='search' id='searchh'></input>
            <table className="table">
                <TableHeader_grading_page />
                {monem.map(record => (
    <TableRow_Grading_Page key={record.id} record={record} />
))}
            </table>
        </div>
        
        </>

    );
}
export default Grading_Page;
