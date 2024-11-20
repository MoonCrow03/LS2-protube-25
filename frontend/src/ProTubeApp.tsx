import React from 'react';
import VideoList from './components/VideoList';
import VideoPlayer from './components/VideoPlayer';
import UserChannel from './components/UserChannel';
import LoginButton from "./components/LoginButton.tsx";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import './ProTubeApp.css';

const ProTubeApp: React.FC = () => {
    return (
        <Router>
            <div className="App">
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
    const loggedUser = localStorage.getItem('user');
    const user = loggedUser ? JSON.parse(loggedUser) : null;

    if(user)
        return <UserChannel {...user} />;

    const mockUser = {
        username: 'protube-admin',
        email: '12345@gmail.com',
        picture: 'https://via.placeholder.com/150',
        auth0Id: 'auth0|123456',
    };

    return <UserChannel {...mockUser} />;
};

export default ProTubeApp;
