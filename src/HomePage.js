import Register from "./Register";
import MusicPlayer from "./MusicPlayer";
import LikedSongs from "./LikedSongs";
import SearchSongs from "./SearchSongs";
import PlaylistMaker from "./PlaylistMaker";
import PlaylistDetails from "./PlaylistDetails";
import UserProfile from "./UserProfile";
import PlaylistList from "./PlaylistList";
import { useState } from "react";

export default function HomePage() {
    const [playlistId, setPlaylistId] = useState(null);

    return (
        <div className="homepage">
            <UserProfile></UserProfile>
            <MusicPlayer playlistId={playlistId}></MusicPlayer>
            <PlaylistList setPlaylistId={setPlaylistId}></PlaylistList>
            {/* <LikedSongs></LikedSongs> */}
            <PlaylistMaker></PlaylistMaker>
            <SearchSongs></SearchSongs>
        </div>
    );
};