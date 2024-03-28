import { useState } from "react";
import axios from "axios";

function Contact() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const bodyObj = {
    name,
    email,
    message,
  }
  const handleSend = (e) => {
    e.preventDefault()
    axios.post('/api/newInbox', bodyObj)
      .then((res) => 
      setName(''),
      setEmail(''),
      setMessage('')
    );
  }

  return (
    <div className="contact-page">
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
        <div className="contact-button">
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  )
}

export default Contact