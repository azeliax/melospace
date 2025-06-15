import moon from "./graphics/moon.png";
import axios from 'axios';
import { useState, useEffect } from "react";

export default function UserProfile() {
    useEffect(() => {
        const fetchUser = async () => {
            try {
                const res = await axios.get('https://melospace.onrender.com/getusername');
                const username = res.data.username;
                console.log(username)

                document.getElementById('welcome-back').innerHTML = 'Welcome back, ' + username + '!';
            } catch (err) {
            }
        };

        fetchUser();
    }, []);

    return (
        <div className="user-profile">
            <p id="welcome-back">Welcome back, USERNAME!</p>
        </div>
    );
}