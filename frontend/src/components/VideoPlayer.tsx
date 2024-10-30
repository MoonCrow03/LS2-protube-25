import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './video-title.css';


interface VideoPlayerProps {
    url?: string;
    title?: string;
}

const VideoPlayer: React.FC<VideoPlayerProps> = () => {
    const { id } = useParams<{ id: string }>();
    const [video, setVideo] = useState<{ title: string; videoUrl: string } | null>(null);

    useEffect(() => {
        fetch(`http://localhost:8080/api/videos/${id}`)
            .then(response => response.json())
            .then(data => setVideo({ title: data.title, videoUrl: data.videoUrl }))
            .catch(error => console.error('Error fetching video:', error));
    }, [id]);

    if (!video) return <div>Loading...</div>;

    return (
        <div>
            <div>
                <video width="640" height="360" controls>
                    <source src={video.videoUrl} type="video/mp4"/>
                    Your browser does not support the video tag
                </video>
            </div>
            <div className="video-title">
                <h4>{video.title}</h4>
            </div>
        </div>
);
};

export default VideoPlayer;
