import './App.css';
import axios from 'axios';
import { useState, useEffect } from "react";

export default function MusicPlayer() {
    const [songs, setSongs] = useState([]);
    const [playingSong, setPlayingSong] = useState(0);
    const [stop, setIfStop] = useState(false);
    const likedSongsArr = [];

    useEffect(() => {
        const fetchSongs = async () => {
            try {
                const res = await axios.get('https://melospace.onrender.com/songs');
                setSongs(res.data.songs);
                console.log(res.data.songs);
            } catch (err) {
                console.error("Error fetching songs:", err);
            }
        };

        fetchSongs();
    }, []);

    useEffect(() => {
        if (songs.length > 0 && stop) {
            playSongFromIndex(playingSong);
        }
    }, [songs, stop]);


    const playSongFromIndex = (index) => {
        const song = songs[index];
        setPlayingSong(index);
        var audio = document.getElementById('audio');
        var source = document.getElementById('audioSource');
        var title = document.querySelector('.title');
        var artist = document.querySelector('.artist');
        var cover = document.querySelector('.cover');

        const coverDisplay = `${process.env.PUBLIC_URL}/album_covers/${song.album}.jpg`;
        const newSong = `${process.env.PUBLIC_URL}/mp3_songs/${song.mp3_track}`;

        cover.src = coverDisplay;
        source.src = newSong;

        title.innerHTML = song.title;
        artist.innerHTML = song.artist;

        audio.load()
        audio.play();
    };

    const changeAndStop = (e) => {
        e.preventDefault();
        const audio = document.getElementById('audio');
        const stopBtn = document.querySelector('.start-stop');

        if (!stop) {
            setIfStop(true);
            stopBtn.innerHTML = 'Stop';
            if (songs.length > 0) playSongFromIndex(playingSong);
        } else {
            setIfStop(false);
            stopBtn.innerHTML = 'Play';
            audio.pause();
        }
    };


    const next = (e) => {
        e.preventDefault();
        if (playingSong + 1 < songs.length) {
            playSongFromIndex(playingSong + 1);
        }
    };

    const prev = (e) => {
        e.preventDefault();
        if (playingSong - 1 >= 0) {
            playSongFromIndex(playingSong - 1);
        }
    };

    const like = async (e) => {
        e.preventDefault();

        const titleLiked = "idk";
        const likedSongs = document.querySelector('.liked-songs');

        if (likedSongsArr.includes(titleLiked)) return;

        likedSongsArr.push(titleLiked);
        const node = document.createElement("li");
        const textNode = document.createTextNode(titleLiked);
        node.appendChild(textNode);

        likedSongs.appendChild(node);
    }

    return (
        <div className="music-player">
            <img src="#" alt="cover" className='cover'></img>
            <p className='title'>Ttile</p>
            <p className='artist'>aritst</p>
            <br></br>
            <audio id="audio" controls>
                <source id="audioSource" type="audio/mpeg"></source>
                Your browser does not support the audio format.
            </audio>
            <button onClick={prev}>&#8249;</button>
            <button onClick={changeAndStop} className='start-stop'>Start</button>
            <button onClick={next}>&#8250;</button>
            <button onClick={like} className='like'><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#0037ff" class="bi bi-heart-fill" viewBox="0 0 16 16">
            <path fill-rule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314"/></svg></button>
            <input type="range" value={0} id='progress'></input>
        </div>
    )
}