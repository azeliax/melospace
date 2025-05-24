import React from 'react';
import { useState } from 'react';
import axios from 'axios';
import ReactDOM from 'react-dom';

export default function Login() {
    const [form, setForm] = useState({username: '', password: ''})

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
          const res = await axios.post('http://localhost:5000/login', form);
    
          console.log('Response from server:', res.data);
    
          alert('Logged in: ' + res.data?.user?.username);
        } catch (err) {
          console.error('Login error:', err.response?.data || err.message);
          alert(err.response?.data?.error || 'Something went wrong');
        }
      };

    return (
        <form onSubmit={handleSubmit}>
        <div className="login">
            <div className='login-border'>&nbsp;Login</div>
            <input type="text" placeholder="> Name" onChange={e => setForm({ ...form, username: e.target.value })}></input><br></br>
            <input type="password" placeholder="> Password" onChange={e => setForm({ ...form, password: e.target.value })}></input><br></br>
            <button type="submit">Login</button>
        </div>
        </form>
    );
}