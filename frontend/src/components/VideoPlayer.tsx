import React from 'react';

interface VideoPlayerProps {
    url: string;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ url }) => {
    return (
        <div>
            <video width="640" height="360" controls>
                <source src={url} type="video/mp4" />
                Tu navegador no soporta el video.
            </video>
        </div>
    );
};

export default VideoPlayer;
