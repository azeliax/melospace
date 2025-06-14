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
                console.error("Error fetching songs:", err);
            }
        };

        fetchUser();
    }, []);

    return (
        <div className="user-profile">
            <img src='./album_covers/saccharine.jpg' alt="avatar" id="avatar"></img>
            <p id="welcome-back">Welcome back, USERNAME!</p>
        </div>
    );
}