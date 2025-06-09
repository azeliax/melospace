import moon from "./graphics/moon.png";

export default function UserProfile() {
    return (
        <div className="user-profile">
            <img src='/album_covers/saccharine.jpg' alt="avatar" id="avatar"></img>
            <p id="welcome-back">Welcome back, USERNAME!</p>
        </div>
    );
}