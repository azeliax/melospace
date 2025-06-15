import { useState, useEffect } from "react";
import axios from "axios";

export default function PlaylistAddSongs({selectedSongId}) {
    const [playlists, setPlaylists] = useState([]);
    const [playlistId, setId] = useState(null);

    const showPlaylists = async() => {
        try {
            const res = await axios.get('https://melospace.onrender.com/playlistsync');
            setPlaylists(res.data.playlists);
        } catch (err) {
        };
    };

    useEffect(() => {
            showPlaylists();
        }, []);

    const addSong = async(id, songId) => {
        if (!songId) return;

        try {
            console.log("Trying to add song:", id, songId); 
            const res = await axios.post('https://melospace.onrender.com/addtoplaylist', {playlistId: id, songId: songId});
            window.location.reload(false);
        } catch (err) {
            console.error("Failed to add song:", err);
        };
    }

    return (
        <div>
            <ol>
                {playlists.map((playlist) => (
                    <li key={playlist.playlist_id}
                    onClick={() => {
                                    addSong(playlist.playlist_id, selectedSongId)}}>{playlist.name}</li>
                ))}
            </ol>
        </div>
    );
}