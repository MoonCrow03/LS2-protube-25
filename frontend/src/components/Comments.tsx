import React, { useEffect, useState } from 'react';

interface Comment {
    id: number;
    user: string;
    content: string;
    timestamp: string;
}

interface CommentsProps {
    videoId: number;
}

const Comments: React.FC<CommentsProps> = ({ videoId }) => {
    const [comments, setComments] = useState<Comment[]>([]);

    useEffect(() => {
        fetch(`http://localhost:8080/videos/${videoId}/comments`)
            .then(response => response.json())
            .then((data: Comment[]) => setComments(data))
            .catch(error => console.error('Error fetching comments:', error));
    }, [videoId]);

    return (
        <div>
            <h3>Comments</h3>
            <ul>
                {comments.map(comment => (
                    <li key={comment.id}>
                        <strong>{comment.user}:</strong> {comment.content}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Comments;

