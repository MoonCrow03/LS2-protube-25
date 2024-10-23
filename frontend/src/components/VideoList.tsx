import React, { useEffect, useState } from 'react';
import VideoPlayer from './VideoPlayer';

interface Video {
    id: number;
    title: string;
    url: string;
}

const VideoList: React.FC = () => {
    const [videos, setVideos] = useState<Video[]>([]);

    useEffect(() => {
        // Llamada al backend para obtener la lista de videos
        fetch('http://localhost:8080/videos/list')
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
                        <h3>{video.title}</h3>
                        <VideoPlayer url={video.url} />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default VideoList;

