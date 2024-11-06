import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './video-title.css';


interface VideoPlayerProps {
    url?: string;
    title?: string;
}

type VideoState = 'loading' | 'error' | 'success';

const VideoPlayer: React.FC<VideoPlayerProps> = () => {
    const { id } = useParams<{ id: string }>();
    const [video, setVideo] = useState<{ title: string; videoUrl: string } | null>(null);
    const [status, setStatus] = useState<VideoState>('loading');

    useEffect(() => {
        setStatus('loading');
        fetch(`http://localhost:8080/api/videos/${id}`)
            .then(response => {
                return response.json();
            })
            .then(data => {
                setVideo({ title: data.title, videoUrl: data.videoUrl });
                setStatus('success');
            })
            .catch(error => {
                console.error('Error fetching video:', error);
                setStatus('error');
            });
    }, [id]);

    if (status === 'loading') return <div>Loading...</div>;

    if (status === 'error') return <div>Error loading video. Please try again later.</div>;

    return (
        <div>
            <video width="640" height="360" controls>
                <source src={video?.videoUrl} type="video/mp4" />
                Your browser does not support the video tag
            </video>
            <h4>{video?.title}</h4>
        </div>
);
};

export default VideoPlayer;
