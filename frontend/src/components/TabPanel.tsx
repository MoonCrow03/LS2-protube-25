import React, {useEffect, useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import CommentList from "./CommentList";
import './VideoList.css';
import url from "url";

interface UsernameProps {
    username: string;
    tab: TabType;
}

interface Video {
    id: number;
    title: string;
    user: string;
    description: string;
    videoUrl: string;
    thumbnailUrl: string;
    duration: number;
}

interface Comment {
    id: number;
    user: string;
    content: string;
    timestamp: string;
}

type TabType = 'Videos' | 'Comments' | 'Invalid';

const TabPanel: React.FC<UsernameProps> = ({ username, tab }) => {
    const [videos, setVideos] = useState<Video[]>([]);
    const [comments, setComments] = useState<Comment[]>([]);
    const navigate = useNavigate();

    const loggedUser = localStorage.getItem('user');
    const currentUser = loggedUser ? JSON.parse(loggedUser) : null;

    if (tab !== 'Videos' && tab !== 'Comments') {
        console.error(`Invalid tab: ${tab}`);
        return null;
    }

    const handleVideoEditing = (videoId: number) => {
        navigate(`/video-edit/${videoId}`);
    }

    const handleDeleteVideo = (videoId : number) => {
        if (window.confirm('Are you sure you want to delete this video?')) {
            fetch(`http://localhost:8080/api/videos/${videoId}`, {
                method: 'DELETE',
            })
                .then((response) => {
                    if (!response.ok) {
                        throw new Error('Failed to delete video');
                    }
                    // Re-fetch the updated comments list
                    return fetch(`http://localhost:8080/api/users/${username}/videos`, { method: 'GET' });
                })
                .then((response) => {
                    if(!(response.status === 302 )){
                        throw new Error('Failed to fetch video');
                    }
                    return response.json();
                })
                .then((updatedVideos) => {
                    setVideos(updatedVideos); // Update the state with the new list
                })
                .catch((error) => console.error('Error handling delete:', error));
        }
    }


    useEffect(() => {
        if (tab === 'Videos') {
            fetch(`http://localhost:8080/api/users/${username}/videos`)
                .then(response => response.json())
                .then(data => setVideos(data))
                .catch(error => console.error('Error fetching videos:', error));
        } else if (tab === 'Comments') {
            fetch(`http://localhost:8080/api/users/${username}/comments`)
                .then(response => response.json())
                .then(data => setComments(data))
                .catch(error => console.error('Error fetching comments:', error));
        }
    }, [tab, username]);

    const handleUpdateComment = (updatedComment: Comment) => {
        setComments((prevComments) =>
            prevComments.map((comment) =>
                comment.id === updatedComment.id ? updatedComment : comment
            )
        );
    };

    return (
        <div>
            {tab === 'Videos' ? (
                <div>
                    {videos.length > 0 ? (
                        <ul className="video-list">
                            {videos.map(video => (
                                <li className="video-item" key={video.id}>
                                    {/* Apply CSS class for each video */}
                                    <Link to={`/video/${video.id}`} style={{ color: 'black', textDecoration: 'none' }}>
                                        <img
                                            className="video-thumbnail" // Apply CSS class to the image
                                            src={video.thumbnailUrl}
                                            alt={video.title}
                                        />
                                        <h3 className="video-title">{video.title}</h3> {/* Apply CSS to the title */}
                                        <h4 className="video-user">{video.user}</h4> {/* Apply CSS to the user */}
                                    </Link>
                                    {currentUser?.username === video.user && (
                                        <div className="button-container">
                                            <button
                                                className="edit-button"
                                                onClick={() => handleVideoEditing(video.id)}
                                            >
                                                Edit
                                            </button>
                                            <button
                                                className="delete-button"
                                                onClick={() => handleDeleteVideo(video.id)}
                                            >
                                                Delete
                                            </button>
                                        </div>
                                    )}
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p>No videos available.</p>
                    )}
                </div>
            ) : tab === 'Comments' ? (
                <div>
                    {comments.length > 0 ? (
                        <CommentList comments={comments} setComments={setComments} updateComment={handleUpdateComment} url={`http://localhost:8080/api/users/${username}/comments`}/>
                    ) : (
                        <p>No comments available.</p>
                    )}
                </div>
            ) : null}
        </div>
    );
}

export default TabPanel;

