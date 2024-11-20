import React from 'react';
import VideoList from './components/VideoList';
import VideoPlayer from './components/VideoPlayer';
import UserChannel from './components/UserChannel';
import LoginButton from "./components/LoginButton.tsx";
import {BrowserRouter as Router, Route, Routes, useParams} from "react-router-dom";
import './ProTubeApp.css';
import VideoUpload from "./components/VideoUpload.tsx";
import UploadButton from "./components/UploadButton.tsx";
import { BrowserRouter as Router, Route, Routes, useNavigate } from "react-router-dom";


const ProTubeApp: React.FC = () => {
    return (
        <Router>
            <div className="App">
                <LoginButton />
                <div className="title-container">
                    <ClickableTitle />
                </div>
                <h1 className="app-title">────────────────────────────────────────</h1>
                <UploadButton />
                <Routes>
                    <Route path="/" element={<VideoList />} />
                    <Route path="/video/:id" element={<VideoPlayerWrapper />} />
                    <Route path="/user-channel/:username" element={<UserChannelWrapper />} />
                    <Route path="/upload" element={<VideoUpload />} />
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

const UserChannelWrapper = () => {
    const username = useParams<{ username: string }>().username || '';

    return <UserChannel username={username}/>;
};


export default ProTubeApp;
