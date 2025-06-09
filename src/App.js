import './App.css';
import LikedSongs from './LikedSongs';
import Login from './Login';
import MusicPlayer from './MusicPlayer';
import Register from './Register';
import SearchSongs from './SearchSongs';
import character from "./graphics/char.png";
import Overlay from './Overlay';
import { useEffect } from 'react';
import moon from "./graphics/moon.png";
import HomePage from './HomePage';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {

  return (
    <div className='main-div'>
    <header>
    <h1>Welcome to Melospace</h1>
    <p className='header-sub'>Disover the magic of melody</p>
    <div className='onload'>
      <h1 className='animation'>Welcome to Melospace</h1>
    </div>
    </header>
    <p className='border-header'>╳╳╳╳╳╳╳╳╳╳╳╳╳╳╳╳╳╳╳╳╳╳╳╳╳╳╳╳╳╳╳╳╳╳╳╳╳╳╳╳╳╳╳╳╳╳╳╳╳╳╳╳╳╳╳╳╳╳╳╳╳╳╳╳╳╳╳╳</p>
    <main>
    <img src={character} alt="character" height="50%" className='image-girl'/>
    <Router basename="/melospace">
      <Routes>
        <Route path="/" element={<Login></Login>} />
        <Route path="/homepage" element={<HomePage></HomePage>}/>
        <Route path="/register" element={<Register></Register>}/>
      </Routes>
    </Router>
    </main>
    <Overlay></Overlay>
    </div>
  );
}

export default App;
