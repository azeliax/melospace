import './App.css';
import axios from 'axios';
import { useState, useEffect, useRef } from "react";
import PlaylistDetails from './PlaylistDetails';

export default function MusicPlayer({playlistId}) {
    const [songs, setSongs] = useState([]);
    const [playingSong, setPlayingSong] = useState(0);
    const [stop, setIfStop] = useState(false);
    const likedSongsArr = [];
    const [progress, setProgress] = useState(0);
    const [duration, setDuration] = useState(0);
    const audioRef = useRef(null);
    const sourceRef = useRef(null);
    const titleRef = useRef(null);
    const artistRef = useRef(null);
    const coverRef = useRef(null);

    useEffect(() => {
        const fetchSongs = async () => {
            console.log(playlistId);
            if (!playlistId) return; 
            try {
                const res = await axios.post('https://melospace.onrender.com/playlistdetails', {playlistId});
                setSongs(res.data.songsPlaylist);
                setIfStop(true);
                console.log(res.data.songsPlaylist);
            } catch (err) {
                console.error("Error fetching songs:", err);
            }
        };

        fetchSongs();
    }, [playlistId]);

    useEffect(() => {
        if (songs.length > 0 && stop) {
        playSongFromIndex(playingSong);
        }
    }, [songs, stop]);

    useEffect(() => {
        const audio = audioRef.current;
        if (!audio) return;
        const handleTimeUpdate = () => {
            setProgress(audio.currentTime);
        };

        audio.addEventListener('timeupdate', handleTimeUpdate);

        return () => {
            audio.removeEventListener('timeupdate', handleTimeUpdate);
        };
    }, [songs, playingSong]);



    const playSongFromIndex = (index) => {
        const song = songs[index];
        if (!songs || songs.length === 0 || !songs[index]) return;
        setPlayingSong(index);
        const audio = audioRef.current;
        const source = sourceRef.current;
        const title = titleRef.current;
        const artist = artistRef.current;
        const cover = coverRef.current;

        audio.addEventListener("loadedmetadata", () => {
            setDuration(audio.duration);
        });

        const coverDisplay = `${process.env.PUBLIC_URL}/album_covers/${song.album}.jpg`;
        const newSong = `${process.env.PUBLIC_URL}/mp3_songs/${song.mp3_track}`;
        const newSongAbsoluteURL = new URL(newSong, window.location.origin).href; // idk how it works but it works only liek that
        
        cover.src = coverDisplay;
        title.innerHTML = song.title;
        artist.innerHTML = song.artist;

        if (source.src !== newSongAbsoluteURL) {
            source.src = newSong;
            audio.load(); 
        }

        audio.play();
    };

    const changeAndStop = (e) => {
        e.preventDefault();
        const audio = audioRef.current;
        const stopBtn = document.querySelector('.start-stop');

        if (stop) {
            setIfStop(false);
            stopBtn.innerHTML = 'Play';
            audio.pause();
        } else {
            setIfStop(true);
            stopBtn.innerHTML = 'Stop';
            audio.play();
        }
    };

    const next = (e) => {
        e.preventDefault();
        if (playingSong + 1 < songs.length) {
            setProgress(0);
            playSongFromIndex(playingSong + 1);
        }
    };

    const prev = (e) => {
        e.preventDefault();
        if (playingSong - 1 >= 0) {
            setProgress(0);
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
            <img ref={coverRef} src="#" alt="cover" className='cover'></img>
            <p ref={titleRef} className='title'>Title</p>
            <p ref={artistRef} className='artist'>Artist</p>
            <br></br>
            <audio ref={audioRef} id="audio" controls>
                <source ref={sourceRef} id="audioSource" type="audio/mpeg"></source>
                Your browser does not support the audio format.
            </audio>
            <input type="range" value={progress} max={duration} onChange={(e) => {setProgress(e.target.value); audioRef.current.currentTime = e.target.value}} id='progress'></input><br></br>
            <div className='audio-controls'>
            <button onClick={prev}>&#8249;</button>
            <button onClick={changeAndStop} className='start-stop'>Start</button>
            <button onClick={next}>&#8250;</button>
            <button onClick={like} className='like'><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#0037ff" class="bi bi-heart-fill" viewBox="0 0 16 16">
            <path fill-rule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314"/></svg></button>
            </div>
        </div>
    )
}