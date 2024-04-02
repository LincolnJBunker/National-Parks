import { useState } from "react";
import axios from "axios";
import { Modal } from "react-bootstrap";

function Contact() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [show, setShow] = useState(false);
  const [showError, setShowError] = useState(false)
  const bodyObj = {
    name,
    email,
    message,
  }
  const handleSend = (e) => {
    e.preventDefault()
    if (!name || !email || !message) {
      setShowError(true)
      return
    }
    axios.post('/api/newInbox', bodyObj)
      .then((res) => 
      setName(''),
      setEmail(''),
      setMessage('')
    );
    setShow(true)
  }

  const handleClose = () => {
    setShow(false);
    setShowError(false);
  }

  return (
    <div className="contact-page-container">
    <div className="contact-page">
      <h3>Fill out the form to send us a question!</h3>
      <form className="contact-form" method="POST" onSubmit={handleSend}>
        <div className="input-holders">
          <label htmlFor="name">Name</label>
          <input type="text" className="form-inputs" value={name} onChange={(e) => setName(e.target.value)} />
        </div>
        <div className="input-holders">
          <label htmlFor="email">Email</label>
          <input type="email" className="form-inputs" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div className="input-holders">
          <label htmlFor="message">Message</label>
          <input type="text" className="form-inputs" value={message} onChange={(e) => setMessage(e.target.value)} />
        </div>
        <div className="contact-button-container">
          <button className="contact-button" type="submit">Submit</button>
          {/* success */}
          <Modal show={show} onHide={handleClose}>
            <Modal.Body>
              <p>Thank you for your submission</p>
            </Modal.Body>
            <Modal.Footer>
              <button onClick={handleClose}>Close</button>
            </Modal.Footer>
          </Modal>
          {/* fail */}
          <Modal show={showError} onHide={handleClose}> 
            <Modal.Body>
              <p>Please fill out all of the fields</p>
            </Modal.Body>
            <Modal.Footer>
              <button onClick={handleClose}>Close</button>
            </Modal.Footer>
          </Modal>
        </div>
      </form>
    </div>
  </div>
  )
}

export default Contact