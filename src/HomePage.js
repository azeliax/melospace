import Register from "./Register";
import MusicPlayer from "./MusicPlayer";
import LikedSongs from "./LikedSongs";
import SearchSongs from "./SearchSongs";
import PlaylistMaker from "./PlaylistMaker";
import PlaylistDetails from "./PlaylistDetails";
import UserProfile from "./UserProfile";
import PlaylistList from "./PlaylistList";

export default function HomePage() {
    return (
        <div className="homepage">
            <UserProfile></UserProfile>
            <MusicPlayer></MusicPlayer>
            <PlaylistList></PlaylistList>
            {/* <LikedSongs></LikedSongs>
            <PlaylistMaker></PlaylistMaker>
            <SearchSongs></SearchSongs> */}
        </div>
    );
};