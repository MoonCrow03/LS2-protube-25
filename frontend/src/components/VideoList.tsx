// components/VideoList.tsx
import React, { useEffect, useState } from 'react';
import Video from './Video';
import VideoPlayer from './VideoPlayer';

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
    const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);

    useEffect(() => {
        fetch('http://localhost:8080/api/videos/list')
            .then(response => response.json())
            .then((data: Video[]) => setVideos(data))
            .catch(error => console.error('Error fetching videos:', error));
    }, []);

    const handleVideoSelect = (id: number) => {
        const video = videos.find(video => video.id === id);
        if (video) setSelectedVideo(video);
    };

    return (
        <div>
            <h1>Lista de Videos</h1>
            {selectedVideo ? (
                <div>
                    <button onClick={() => setSelectedVideo(null)}>Volver a la lista</button>
                    <VideoPlayer url={selectedVideo.videoUrl} />
                </div>
            ) : (
                <div>
                    {videos.map(video => (
                        <Video
                            key={video.id}
                            id={video.id}
                            title={video.title}
                            thumbnailUrl={video.thumbnailUrl}
                            onVideoSelect={handleVideoSelect}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

export default VideoList;
