import { useState, useEffect } from "react";
import axios from "axios";

export default function PlaylistDetails ({playlistId}) {
    const [songs, setSongs] = useState([]);

    const showSongs = async() => {
        try {
            const res = await axios.post('http://localhost:5000/playlistdetails', {playlistId});
            setSongs(res.data.songsPlaylist);
        } catch (err) {}
    }

    useEffect(() => {
        if (playlistId) {
            showSongs(); }
        }, [playlistId]);

    return (
        <div className="playlist-details">
            <ul>
                {songs.map((song) => (
                    <li key={song.id}>{song.title}</li>
                ))}
            </ul>
        </div>
    );
}