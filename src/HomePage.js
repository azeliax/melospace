import Register from "./Register";
import MusicPlayer from "./MusicPlayer";
import LikedSongs from "./LikedSongs";
import SearchSongs from "./SearchSongs";
import PlaylistMaker from "./PlaylistMaker";
import PlaylistDetails from "./PlaylistDetails";

export default function HomePage() {
    return (
        <div className="homepage">
            <MusicPlayer></MusicPlayer>
            <LikedSongs></LikedSongs>
            <PlaylistMaker></PlaylistMaker>
            <SearchSongs></SearchSongs>
        </div>
    );
};