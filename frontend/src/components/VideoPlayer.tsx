import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './VideoPlayer.css';

interface VideoPlayerProps {
    url?: string;
    title?: string;
}

type VideoStateType =
    | { state: 'loading' }
    | { state: 'error', message: string }
    | { state: 'success', video: { title: string; videoUrl: string; description: string } };

type CommentType = {
    id: number;
    user: { name: string };
    content: string;
    timestamp: string;
};

const VideoPlayer: React.FC<VideoPlayerProps> = () => {
    const { id } = useParams<{ id: string }>();
    const [state, setState] = useState<VideoStateType>({ state: 'loading' });
    const [comments, setComments] = useState<CommentType[]>([]);
    const [newComment, setNewComment] = useState<string>('');

    useEffect(() => {
        setState({ state: 'loading' });
        fetch(`http://localhost:8080/api/videos/${id}`)
            .then(response => response.json())
            .then(data => {
                setState({
                    state: 'success',
                    video: { title: data.title, videoUrl: data.videoUrl, description: data.description },
                });
            })
            .catch(error => {
                console.error('Error fetching video:', error);
                setState({ state: 'error', message: error });
            });
    }, [id]);

    useEffect(() => {
        fetch(`http://localhost:8080/api/videos/${id}/comments`)
            .then(response => response.json())
            .then(data => setComments(data))
            .catch(error => console.error('Error fetching comments:', error));
    }, [id]);

    const handleCommentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setNewComment(e.target.value);
    };

    const handleCommentSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (newComment.trim()) {
            const commentData = {
                content: newComment,
                videoId: id,
            };
            fetch(`http://localhost:8080/api/videos/${id}/comments`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(commentData),
            })
                .then(response => response.json())
                .then((comment: CommentType) => {
                    setComments(prevComments => [comment, ...prevComments]);
                    setNewComment('');
                })
                .catch(error => console.error('Error posting comment:', error));
        }
    };

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
                    <h4 className="videoplayer-title">{state.video.title}</h4>
                    <div className="video-description">
                        <p>{state.video.description}</p>
                    </div>
                    <h4 className="comment-title"> Comments </h4>
                    <div className="comments-container">
                        <form onSubmit={handleCommentSubmit} className="comment-form">
                            <textarea
                                value={newComment}
                                onChange={handleCommentChange}
                                placeholder="Add a comment..."
                                className="comment-input"
                            />
                            <button type="submit" className="submit-comment">
                                Submit Comment
                            </button>
                        </form>
                        <div className="comments-list">
                            {comments.length > 0 ? (
                                comments.map((comment) => (
                                    <div key={comment.id} className="comment">
                                        <strong>{comment.user.name}</strong>
                                        <p>{comment.content}</p>
                                        <span>{new Date(comment.timestamp).toLocaleString()}</span>
                                    </div>
                                ))
                            ) : (
                                <p>No comments yet. Be the first to comment!</p>
                            )}
                        </div>
                    </div>
                </div>
            );
    }
};

export default VideoPlayer;