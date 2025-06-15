import React from 'react';
import { useState } from 'react';
import axios from 'axios';
import ReactDOM from 'react-dom';
import logo from "./graphics/logo.png";
import { useNavigate } from 'react-router-dom';

export default function Login() {
    const [form, setForm] = useState({username: '', password: ''});
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
          const res = await axios.post('https://melospace.onrender.com/login', form);
    
          console.log('Response from server:', res.data);
    
          alert('Logged in: ' + res.data?.user?.username);

          navigate('/homepage');
        } catch (err) {
          console.error('Login error:', err.response?.data || err.message);
          alert(err.response?.data?.error || 'Something went wrong');
        }
      };

      function navigateRegister() {
        navigate('/Register');
      }

    return (
        <form onSubmit={handleSubmit}>
        <div className="login"> <br></br>
            <div className='login-border'>&nbsp;⋆｡°✩ Login
            </div>
            <input type="text" placeholder="> Name" onChange={e => setForm({ ...form, username: e.target.value })}></input><br></br>
            <input type="password" placeholder="> Password" onChange={e => setForm({ ...form, password: e.target.value })}></input><br></br>
            <button type="submit" className='submit-form'>Login</button>
            <button onClick={navigateRegister} className='submit-form'>Register here</button>
        </div>
        </form>
    );
}