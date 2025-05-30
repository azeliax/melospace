import axios from 'axios';
import './App.css';
import { useState } from "react";

export default function SearchSongs() {

    const searchSongs = async(e) => {
        e.preventDefault();
        try {
            const results = [];
            let query = document.querySelector('.inputQuery').value;

            const res = await axios.post('http://localhost:5000/searchsongs', { songQuery: query});

            const songs = res.data?.songSearch || [];

            const songDump = document.querySelector('.test');
            songDump.innerHTML = songs.map(song => `<p>${song.title} - ${song.artist}</p>`).join(' ');

        } catch(err) {}; }

    return (
        <div className="search-songs">
            <input type="text" onInput={searchSongs} className='inputQuery'></input>
            <div className='test'></div>
        </div>
    );
}