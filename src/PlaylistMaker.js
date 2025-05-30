import { useState } from "react";
import PlaylistList from "./PlaylistList";
import axios from 'axios';

export default function() {
    const [namePlaylist, setName] = useState('');

    const addPlaylist = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('http://localhost:5000/playlistadd', {playlistName: namePlaylist});
            console.log("Playlist added: ", res.data);
        } catch (err) {};
    }

    return (
        <div className="playlist-maker">
            <form onSubmit={addPlaylist}>
            <input type="text" placeholder="name" onChange={e => setName(e.target.value)}></input>
            <button type="submit">Create a new playlist</button>
            </form>
            <PlaylistList></PlaylistList>
        </div>
    );
}