import React, { useState } from 'react';
import './Footer.css'; 
const Footer = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle the submit action, like sending data to a server
    console.log({ name, email, message });
    // Clear the form fields after submission
    setName('');
    setEmail('');
    setMessage('');
  };

  return (
    <footer className="footer-feedback">
      <div className="feedback-container">
        <div className='FooterText'>
        <h2>Share Your Feedback with Us</h2>
        <p>We value your input! Whether you're a student looking to improve your learning experience or a professor seeking to enhance our platform, we welcome your suggestions and feedback. Your insights are invaluable in helping us continuously improve Academic Oral Radiology. Please feel free to share any ideas, comments, or suggestions you may have using the form below. We appreciate your contribution to making our platform the best it can be for the entire academic community.</p>
        </div>
        <form className="feedback-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Your Name</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Name ..."
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Your Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email..."
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="message">Message / Suggest</label>
            <textarea
              id="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Let Us Know What is Your Message And How Can We Help You."
              required
            />
          </div>
          <button type="submit" className="submit-btn">Send</button>
        </form>
      </div>
    </footer>
  );
};

export default Footer;
