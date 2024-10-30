import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

interface Video {
    id: number;
    title: string;
    description: string;
    videoUrl: string;
    thumbnailUrl: string;
    duration: number;
}

const VideoList: React.FC = () => {
    const [videos, setVideos] = useState<Video[]>([]);

    useEffect(() => {
        fetch('http://localhost:8080/api/videos/list')
            .then(response => response.json())
            .then((data: Video[]) => setVideos(data))
            .catch(error => console.error('Error fetching videos:', error));
    }, []);

    return (
        <div>
            <h1>Lista de Videos</h1>
            <div>
                {videos.map(video => (
                    <div key={video.id}>
                        <Link to={`/video/${video.id}`} style={{ color: 'black', textDecoration: 'none' }}>
                            <img src={video.thumbnailUrl} alt={video.title} width="240" height="135"/>
                            <h3>{video.title}</h3>
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default VideoList;
