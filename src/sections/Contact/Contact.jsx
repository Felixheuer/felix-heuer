import styles from './ContactStyles.module.css';
import React, { useState, useEffect } from 'react';



function Contact() {


  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch('http://localhost:9999/api/users')
      .then(response => response.json())
      .then(data => setUsers(data.users));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch('http://localhost:9999/api/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, email, message }),
    })
      .then(response => response.json())
      .then(data => {
        setUsers([...users, { id: data.id, name, email }]);
        setName('');
        setEmail('');
      });
  };


  return (
    <section id="contact" className={styles.container}>
      <h1 className="sectionTitle">Contact</h1>
      <form onSubmit={handleSubmit}>
        <div className="formGroup">
          <label htmlFor="name" hidden>
            Name
          </label>
          <input
            name="name"
            id="name"
            placeholder="Name"
            type="text" 
            value={name} onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="formGroup">
          <label htmlFor="email" hidden>
            Email
          </label>
          <input
            type="text"
            name="email"
            id="email"
            placeholder="Email"
            required
            value={email} onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="formGroup">
          <label htmlFor="message" hidden>
            Message
          </label>
          <textarea
            name="message"
            id="message"
            placeholder="Message"
            value={message} onChange={(e) => setMessage(e.target.value)}
            required></textarea>
        </div>
        <input className="hover btn" type="submit" value="Submit" />
      </form>
      <h2>Users</h2>
      <ul>
        {users.map(user => (
          <li key={user.id}>{user.name} ({user.email})</li>
        ))}
      </ul>
    </section>
    
  );
}

export default Contact;
