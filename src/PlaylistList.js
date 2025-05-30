import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";

export default function() {
    const [playlists, setPlaylists] = useState([]);

    const showPlaylists = async() => {
        try {
            const res = await axios.get('http://localhost:5000/playlistsync');
            setPlaylists(res.data.playlists);
        } catch (err) {};
    };

    useEffect(() => {
        showPlaylists();
    }, []);

    return (
        <div>
            <ul>
                {playlists.map((playlist) => (
                    <li key={playlist.playlist_id}>{playlist.name}</li>))}
            </ul>
        </div>
    );
}