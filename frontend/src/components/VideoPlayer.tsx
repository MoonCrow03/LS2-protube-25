import React, { useEffect, useState } from 'react';
import {Link, useParams} from 'react-router-dom';
import './VideoPlayer.css';
import Comments from './Comments';

interface VideoPlayerProps {
    url?: string;
    title?: string;
}

type VideoStateType =
    | { state: 'loading' }
    | { state: 'error', message: string }
    | { state: 'success', video: { title: string; username:string; videoUrl: string; description: string } };

const VideoPlayer: React.FC<VideoPlayerProps> = () => {
    const { id } = useParams<{ id: string }>();
    const [state, setState] = useState<VideoStateType>({ state: 'loading' });

    useEffect(() => {
        setState({ state: 'loading' });
        fetch(`http://localhost:8080/api/videos/${id}`)
            .then(response => response.json())
            .then(data => {
                setState({
                    state: 'success',
                    video: { title: data.title, username:data.user, videoUrl: data.videoUrl, description: data.description },
                });
            })
            .catch(error => {
                console.error('Error fetching video:', error);
                setState({ state: 'error', message: error.message });
            });
    }, [id]);

    switch (state.state) {
        case 'loading':
            return <div className="loading">Loading...</div>;
        case 'error':
            return <div className="error">Error loading video. Please try again later.</div>;
        default:
            return (
                <div className="video-container">
                    <video className="video-player" controls data-testid="video-player">
                        <source src={state.video.videoUrl} type="video/mp4" />
                        Your browser does not support the video tag.
                    </video>
                    <Link to={`/user-channel/${state.video.username}`} style={{color: 'black', textDecoration: 'none'}}>
                        <h4 className="video-user">{state.video.username}</h4>
                    </Link>
                    <h4 className="videoplayer-title">{state.video.title}</h4>
                    <div className="video-description">
                        <p>{state.video.description}</p>
                    </div>
                    <h4 className="comment-title">Comments</h4>
                    <Comments videoId={id ?? ''} />
                </div>
            );
    }
};

export default VideoPlayer;
