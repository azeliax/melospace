import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import PlaylistDetails from "./PlaylistDetails";
import LikedSongs from "./LikedSongs";
import PlaylistMaker from "./PlaylistMaker";

export default function PlaylistList({setPlaylistId}) {
    const [playlists, setPlaylists] = useState([]);
    const [details, showDetails] = useState(false);
    const [liked, showLiked] = useState(false);
    const [playlistId, setId] = useState(null);

    const showPlaylists = async() => {
        try {
            const res = await axios.get('https://melospace.onrender.com/playlistsync');
            setPlaylists(res.data.playlists);
        } catch (err) {};
    };

    useEffect(() => {
        showPlaylists();
    }, []);

    return (
        <div className="playlist-container">
        <div className="playlist-list">
            <dl>
                <dt onClick={() => showLiked(!liked)}>Liked</dt>
                {playlists.map((playlist) => (
                    <dt key={playlist.playlist_id} onClick={() => { setId(playlist.playlist_id); showDetails(!details); setPlaylistId(playlist.playlist_id);}}>{playlist.name}</dt>))}
            </dl>
        </div>
            {details && (
                <div>
                    <PlaylistDetails playlistId={playlistId}></PlaylistDetails>
                </div>)}
            {liked && (
                <div>
                    <LikedSongs></LikedSongs>
                </div>
            )}
        </div>
    );
}