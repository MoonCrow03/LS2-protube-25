import React from 'react';
import VideoList from './components/VideoList';
import VideoPlayer from './components/VideoPlayer';
import UserChannel from './components/UserChannel';
import LoginButton from "./components/LoginButton.tsx";
import { BrowserRouter as Router, Route, Routes, useNavigate } from "react-router-dom";
import './ProTubeApp.css';

const ProTubeApp: React.FC = () => {
    return (
        <Router>
            <div className="App">
                <NavigateToUserChannelButton />
                <LoginButton />
                <h1 className="app-title">. . . . . ╰──╮ PRO ▷ TUBE ╭──╯ . . . . .</h1>
                <h1 className="app-title">────────────────────────────────────────</h1>
                <Routes>
                    <Route path="/" element={<VideoList />} />
                    <Route path="/video/:id" element={<VideoPlayerWrapper />} />
                    <Route path="/user-channel" element={<UserChannelWrapper />} />
                </Routes>
            </div>
        </Router>
    );
};

const VideoPlayerWrapper = () => <VideoPlayer />;

const UserChannelWrapper = () => {
    const mockUser = {
        username: 'john_doe',
        email: 'john@example.com',
        picture: 'https://via.placeholder.com/150',
        auth0Id: 'auth0|123456',
    };

    return <UserChannel {...mockUser} />;
};

const NavigateToUserChannelButton = () => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate('/user-channel');
    };

    return (
        <button onClick={handleClick} className="navigate-button">
            Go to User Channel
        </button>
    );
};

export default ProTubeApp;
