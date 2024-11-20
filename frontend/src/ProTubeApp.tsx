import React from 'react';
import VideoList from './components/VideoList';
import VideoPlayer from './components/VideoPlayer';
import UserChannel from './components/UserChannel';
import LoginButton from "./components/LoginButton.tsx";
import './ProTubeApp.css';
import VideoUpload from "./components/VideoUpload.tsx";
import UploadButton from "./components/UploadButton.tsx";
import { BrowserRouter as Router, Route, Routes, useNavigate } from "react-router-dom";


const ProTubeApp: React.FC = () => {
    return (
        <Router>
            <div className="App">
                <NavigateToUserChannelButton />
                <LoginButton />
                <div className="title-container">
                    <ClickableTitle />
                </div>
                <h1 className="app-title">────────────────────────────────────────</h1>
                <UploadButton />
                <Routes>
                    <Route path="/" element={<VideoList />} />
                    <Route path="/video/:id" element={<VideoPlayerWrapper />} />
                    <Route path="/upload" element={<VideoUpload />} />
                    <Route path="/user-channel" element={<UserChannelWrapper />} />
                </Routes>
            </div>
        </Router>
    );
};

// Clickable title component that redirects to the home page
const ClickableTitle = () => {
    return (
        <Link to="/" className="app-title-button">
            <h1 className="app-title">. . . . . ╰──╮ PRO ▷ TUBE ╭──╯ . . . . .</h1>
        </Link>
    );
};

const VideoPlayerWrapper = () => <VideoPlayer />;

const VideoPlayerWrapper = () => <VideoPlayer />;

const UserChannelWrapper = () => {
    const mockUser = {
        username: 'protube-admin',
        email: '12345@gmail.com',
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
