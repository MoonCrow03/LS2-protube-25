import React from 'react';
import VideoList from './components/VideoList';
import VideoPlayer from './components/VideoPlayer';
import LoginButton from "./components/LoginButton.tsx";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import './ProTubeApp.css';




const ProTubeApp: React.FC = () => {
    return (
        <Router>
            <div className="App">
                <LoginButton />
                <h1 className="app-title">. . . . . ╰──╮ PRO ▷ TUBE ╭──╯ . . . . .</h1>
                <h1 className="app-title">────────────────────────────────────────</h1>
                <Routes>
                    <Route path="/" element={<VideoList/>}/>
                    <Route path="/video/:id" element={<VideoPlayerWrapper/>}/>
                </Routes>
            </div>
        </Router>
    );
};

const VideoPlayerWrapper = () => <VideoPlayer/>;

export default ProTubeApp;