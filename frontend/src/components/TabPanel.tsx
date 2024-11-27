import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import CommentList from "./CommentList";
import './VideoList.css';

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

    if (tab !== 'Videos' && tab !== 'Comments') {
        console.error(`Invalid tab: ${tab}`);
        return null;
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
                        <CommentList comments={comments} />
                    ) : (
                        <p>No comments available.</p>
                    )}
                </div>
            ) : null}
        </div>
    );
}

export default TabPanel;

