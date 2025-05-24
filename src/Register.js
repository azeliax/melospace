import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

export default function Register() {
    const [form, setForm] = useState({username: '', password: ''})

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
          const res = await axios.post('http://localhost:5000/register', form);
    
          console.log('Response from server:', res.data);
    
          alert('Registered: ' + res.data?.user?.username);
        } catch (err) {
          console.error('Registration error:', err.response?.data || err.message);
          alert(err.response?.data?.error || 'Something went wrong');
        }
      };
      

    return ( 
        <div className='register'>
        <div className='register-border'>&nbsp;⋆｡°✩ Login</div>
        <form onSubmit={handleSubmit}>
            <input type="text" placeholder="> Name" onChange={e => setForm({ ...form, username: e.target.value })}></input><br></br>
            <input type="password" placeholder="> Password" onChange={e => setForm({ ...form, password: e.target.value })}></input><br></br>
            <input type="password" placeholder="Confirm password"></input><br></br>
            <button type="submit">Register</button>
        </form>
        </div>
    );
}