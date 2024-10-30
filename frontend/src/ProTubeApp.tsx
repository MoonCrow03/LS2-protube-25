import React from 'react';
import VideoList from './components/VideoList';
import VideoPlayer from './components/VideoPlayer';
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";



const ProTubeApp: React.FC = () => {
    return (
        <Router>
            <div className="App">
                <h1>Mi YouTube Local</h1>
                <Routes>
                    <Route path="/" element={<VideoList />} />
                    <Route path="/video/:id" element={<VideoPlayerWrapper />} />
                </Routes>
            </div>
        </Router>
    );
};

const VideoPlayerWrapper = () => <VideoPlayer/>;

export default ProTubeApp;