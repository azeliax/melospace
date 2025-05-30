import Register from "./Register";
import MusicPlayer from "./MusicPlayer";
import LikedSongs from "./LikedSongs";
import SearchSongs from "./SearchSongs";
import PlaylistMaker from "./PlaylistMaker";

export default function HomePage() {
    return (
        <div className="homepage">
            <MusicPlayer></MusicPlayer>
            <LikedSongs></LikedSongs>
            <SearchSongs></SearchSongs>
            <PlaylistMaker></PlaylistMaker>
        </div>
    );
};