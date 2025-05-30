import './App.css';
import axios from 'axios';
import { use, useState } from "react";

export default function MusicPlayer() {
    const [playingSong, setPlayingSong] = useState(1);
    const [indexSong, setIndexSong] = useState(1);
    const [stop, setIfStop] = useState(false);
    const [currentSong, setCurrentSong] = useState(null);
    const likedSongsArr = [];

    const playSong = async (e) => {
        e.preventDefault();
        try {
          const res = await axios.post('http://localhost:5000/songs', { indexSong });
          const song = res.data?.song;
          const newSong = `/mp3_songs/${res.data?.song?.mp3_track}`;
          setPlayingSong(newSong);
          setCurrentSong(song);

          const titleDisplay = res.data?.song?.title;
          const artistDisplay = res.data?.song?.artist;
          const coverDisplay = `/album_covers/${res.data?.song?.album}.jpg`;
          

          var audio = document.getElementById('audio');
          var source = document.getElementById('audioSource');
          var title = document.querySelector('.title-artist');
          var cover = document.querySelector('.cover');
        
          cover.src = coverDisplay;
          title.innerHTML = titleDisplay + ' - ' + artistDisplay;
          source.src = newSong;

          audio.load()
          audio.play();
        } catch (err) {
          console.error('Error:', err.response?.data || err.message);
        }
      };

    const changeAndStop = async (e) => {
        e.preventDefault();
        var audio = document.getElementById('audio');
        
        try {
            const stopBtn = document.querySelector('.start-stop');
            if (stop === false) {
                setIfStop(true);
                stopBtn.innerHTML = 'Stop';
                playSong(e);
            }
            else {
                setIfStop(false);
                stopBtn.innerHTML = 'Play';
                audio.pause();
            }

        } catch (err) {};
    };

    const next = async (e) => {
        e.preventDefault();
        try {
            const newIndex = indexSong + 1
        setIndexSong(newIndex);
        playSong(e); } catch (err) {};
    };

    const prev = async (e) => {
        e.preventDefault();
        try {
            const newIndex = Math.max(indexSong - 1, 1);
        setIndexSong(newIndex);
        if (indexSong >= 1) {
        playSong(e); } } catch (err) {};
    };

    const like = async (e) => {
        e.preventDefault();

         const titleLiked = currentSong.title;
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
            <p className='title-artist'>Ttile & artist</p>
            <br></br>
            <audio id="audio" controls>
                <source id="audioSource" type="audio/mpeg" src={playingSong}></source>
                Your browser does not support the audio format.
            </audio>
            <button onClick={prev}>Previous</button>
            <button onClick={changeAndStop} className='start-stop'>Play</button>
            <button onClick={next}>Next</button>
            <button onClick={like}>Like</button>
        </div>
    )
}