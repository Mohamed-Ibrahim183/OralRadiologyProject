import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css"; // Import quill styles
import "./Maill.css";

function Mail() {
  const [to, setTo] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("Type Your Message");
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Process the form data here, such as sending it to a server
    console.log({ to, message, file });
  };

  return (
    <div className="mail-form">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="To"
          value={to}
          onChange={(e) => setTo(e.target.value)}
        />
        <input
          type="text"
          placeholder="Subject"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
        />
        <ReactQuill
          theme="snow"
          className="messageArea"
          value={message}
          onChange={setMessage}
        />
        <input type="file" onChange={handleFileChange} />
        <button type="submit" onAuxClick={handleSubmit}>
          Send
        </button>
      </form>
    </div>
  );
}

export default Mail;
