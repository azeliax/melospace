import './App.css';
import LikedSongs from './LikedSongs';
import Login from './Login';
import MusicPlayer from './MusicPlayer';
import Register from './Register';
import SearchSongs from './SearchSongs';
import character from "./graphics/character.png";
import Overlay from './Overlay';
import { useEffect } from 'react';

function App() {

  return (
    <div className='main-div'>
    <h1>Welcome to Melospace</h1> 
    <main>
    <img src={character} alt="character" height="80%" className='image-girl'/>
    <Login></Login>
    </main>
    {/* <Register></Register>
    <MusicPlayer></MusicPlayer>
    <LikedSongs></LikedSongs>
    <SearchSongs></SearchSongs> */}
    <Overlay></Overlay>
    <div className='onload'>
      <h1 className='animation'>Welcome to Melospace</h1>
    </div>
    </div>
  );
}

export default App;
