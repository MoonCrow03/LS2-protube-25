import React from 'react';
import VideoList from './components/VideoList';
import VideoPlayer from './components/VideoPlayer';
import LoginButton from "./components/LoginButton.tsx";
import {BrowserRouter as Router, Link, Route, Routes} from "react-router-dom";
import './ProTubeApp.css';
import VideoUpload from "./components/VideoUpload.tsx";
import UploadButton from "./components/UploadButton.tsx";




const ProTubeApp: React.FC = () => {
    return (
        <Router>
            <div className="App">
                <LoginButton />
                <h1 className="app-title">. . . . . ╰──╮ PRO ▷ TUBE ╭──╯ . . . . .</h1>
                <h1 className="app-title">────────────────────────────────────────</h1>
                <UploadButton />
                <Routes>
                    <Route path="/" element={<VideoList />} />
                    <Route path="/video/:id" element={<VideoPlayerWrapper />} />
                    <Route path="/upload" element={<VideoUpload />} /> {/* Add the route for the upload page */}
                </Routes>
            </div>
        </Router>
    );
};

const VideoPlayerWrapper = () => <VideoPlayer/>;

export default ProTubeApp;