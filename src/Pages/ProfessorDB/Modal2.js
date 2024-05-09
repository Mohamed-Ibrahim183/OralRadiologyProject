import React, { useState } from "react";

import "./Modal2.css";

const data = ["Group A", "Group B", "Group C"];

const Modal2 = (props) => {
  const [show, setShow] = useState(true);

  return !props.open ? null : (
    <div className="Modal2Group" onClick={props.handleClose2}>
      <div className="ModalContent">
        <section>
          <label htmlFor="Groups">Select the Group</label>
          <select name="Groups" id="Groups">
            {data.map((ele) => {
              return <option value={ele}>{ele}</option>;
            })}
          </select>
        </section>
        <section>
          <label htmlFor="openTime">Select the open Time</label>
          <input
            type="datetime-local"
            id="openTime"
            name="openTime"
            // value={times[selectedGroup]?.openTime || ""}
            // onChange={handleTimeChange}
          />
        </section>
        <section>
          <label htmlFor="closeTime">Select the Close Time</label>
          <input
            type="datetime-local"
            id="closeTime"
            name="closeTime"
            // value={times[selectedGroup]?.openTime || ""}
            // onChange={handleTimeChange}
          />
        </section>
        <button className="MainBtn">Save</button>
      </div>
    </div>
  );
};

export default Modal2;
