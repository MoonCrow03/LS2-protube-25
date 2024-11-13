import React, { useEffect, useState } from 'react';
import CommentForm from './CommentForm';
import CommentList from './CommentList';

interface Comment {
    id: number;
    user: string;
    content: string;
    timestamp: string;
}

interface CommentsProps {
    videoId: string;
}

const Comments: React.FC<CommentsProps> = ({ videoId }) => {
    const [comments, setComments] = useState<Comment[]>([]);

    useEffect(() => {
        fetch(`http://localhost:8080/api/videos/${videoId}/comments`)
            .then(response => response.json())
            .then(data => setComments(data))
            .catch(error => console.error('Error fetching comments:', error));
    }, [videoId]);

    const handleNewComment = (newComment: Comment) => {
        setComments(prevComments => [newComment, ...prevComments]);
    };

    return (
        <div className="comments-container">
            <CommentForm videoId={videoId} onCommentPosted={handleNewComment} />
            <CommentList comments={comments} />
        </div>
    );
};

export default Comments;


