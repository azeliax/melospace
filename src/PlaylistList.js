import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import PlaylistDetails from "./PlaylistDetails";

export default function PlaylistList({selectedSongId}) {
    const [playlists, setPlaylists] = useState([]);
    const [details, showDetails] = useState(false);
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

    const addSong = async(id, songId) => {
        try {
            console.log("Trying to add song:", playlistId, selectedSongId); 
            const res = await axios.post('https://melospace.onrender.com/addtoplaylist', {playlistId: id, songId: songId});
            console.log("SONG ADDED",res.data);
            showPlaylists();
        } catch (err) {};
    }

    return (
        <div className="playlist-list">
            
            <dl>
                {playlists.map((playlist) => (
                    <dt key={playlist.playlist_id} /*onClick={() => {setId(playlist.playlist_id); 
                    addSong(playlist.playlist_id, selectedSongId)}} onMouseEnter={() => {setId(playlist.playlist_id); showDetails(!details)}}*/>{playlist.name}</dt>))}
                    {/* {details && (
                    <div>
                        <PlaylistDetails playlistId={playlistId}></PlaylistDetails>
                    </div> )} */}
            </dl>
        </div>
    );
}