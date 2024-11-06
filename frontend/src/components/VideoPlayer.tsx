import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './video-title.css';


interface VideoPlayerProps {
    url?: string;
    title?: string;
}

type VideoStateType = { state: 'loading' } | { state: 'error', message: string } | { state: 'success', video: { title: string; videoUrl: string } }

const VideoPlayer: React.FC<VideoPlayerProps> = () => {
    const { id } = useParams<{ id: string }>();
    const [state, setState] = useState<VideoStateType>({ state: 'loading' });

    useEffect(() => {
        setState({ state: 'loading' });
        fetch(`http://localhost:8080/api/videos/${id}`)
            .then(response => response.json())
            .then(data => {
                setState({ state: 'success', video: { title: data.title, videoUrl: data.videoUrl }})
            })
            .catch(error => {
                console.error('Error fetching video:', error);
                setState({ state: 'error', message: error });
            });
    }, [id]);

    switch (state.state) {
        case 'loading':
            return <div>Loading...</div>;
        case 'error':
            return <div>Error loading video. Please try again later.</div>;
        default:
            return (
                <div>
                    <video width="640" height="360" controls>
                        <source src={state.video.videoUrl} type="video/mp4" />
                        Your browser does not support the video tag
                    </video>
                    <h4>{state.video.title}</h4>
                </div>
            );
    }
};

export default VideoPlayer;
