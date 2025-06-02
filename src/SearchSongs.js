import axios from 'axios';
import './App.css';
import { useState } from "react";
import PlaylistList from './PlaylistList';

export default function SearchSongs() {
    const [search, setSearched] = useState([]);
    const [playlist, setPlaylistVis] = useState(false);
    const [selectedSongId, setSelectedSongId] = useState(null);

    const searchSongs = async() => {
        try {
            let query = document.querySelector('.inputQuery').value;

            const res = await axios.post('http://localhost:5000/searchsongs', { songQuery: query});
            setSearched(res.data.songSearch);

        } catch(err) {}; }

    const handleSongClick = (songId) => {
        setSelectedSongId(songId);
    };

    return (
        <div className="search-songs">
            <input type="text" onInput={searchSongs} className='inputQuery'></input>
            <div className='test'>
                {search.map((searched) => (
                    <p key={searched.song_id} onClick={() => {setPlaylistVis(!playlist); handleSongClick(searched.song_id)}}>{searched.title} - {searched.artist}</p> ))}
                 {playlist && (
                    <div>
                    <PlaylistList selectedSongId={selectedSongId}/> </div>)}
            </div>
        </div>
    );
}