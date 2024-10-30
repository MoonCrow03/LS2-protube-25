import React from 'react';

interface VideoPlayerProps {
    url: string;
    title: string;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ url, title }) => {
    return (
        <div>
            <video width="640" height="360" controls>
                <source src={url} type="video/mp4" />
                Your browser does not support the video tag
            </video>
            <h4>{title}</h4>
        </div>
    );
};

export default VideoPlayer;
