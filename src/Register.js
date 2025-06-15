import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

export default function Register() {
    const [form, setForm] = useState({username: '', password: '', passwordConfirm: ''})

    const handleSubmit = async (e) => {
        e.preventDefault();
        var errMess = document.querySelector('.err-message');
        if (form.password !== form.passwordConfirm) {
          return; }
        try {
          const res = await axios.post('https://melospace.onrender.com/register', form);

          errMess.innerHTML = "> Registered: " + res.data?.user?.username;
        } catch (err) {
          errMess.innerHTML = '> Registration error:' + err.response?.data || err.message;
        }
      };
      

    return ( 
        <div className='register'><br></br>
        <form onSubmit={handleSubmit}>
          <div className='login-border'>&nbsp;⋆｡°✩ Register
            </div>
            <input type="text" placeholder="> Name" onChange={e => setForm({ ...form, username: e.target.value })}></input><br></br>
            <input type="password" placeholder="> Password" onChange={e => setForm({ ...form, password: e.target.value })}></input><br></br>
            <input type="password" placeholder="> Confirm password" onChange={e => setForm({ ...form, passwordConfirm: e.target.value})}></input><br></br>
            <p className='err-message'></p>
            <button type="submit" className='submit-form'>Register</button>
        </form>
        </div>
    );
}