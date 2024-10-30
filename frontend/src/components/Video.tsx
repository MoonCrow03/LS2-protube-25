import React from 'react';

interface VideoProps {
    id: number;
    title: string;
    thumbnailUrl: string;
    onVideoSelect: (id: number) => void;
}

const Video: React.FC<VideoProps> = ({ id, title, thumbnailUrl, onVideoSelect }) => {
    return (
        <div className="video-item" onClick={() => onVideoSelect(id)} style={{ cursor: 'pointer' }}>
            <img src={thumbnailUrl} alt={title} width="200" />
            <h3>{title}</h3>
        </div>
    );
};

export default Video;