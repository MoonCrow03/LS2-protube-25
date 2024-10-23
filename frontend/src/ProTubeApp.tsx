import React from 'react';
import VideoList from './components/VideoList';

const ProTubeApp: React.FC = () => {
    return (
        <div className="App">
            <h1>Mi YouTube Local</h1>
            <VideoList />
        </div>
    );
};

export default ProTubeApp;