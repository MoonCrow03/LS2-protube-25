import React, { useEffect, useState } from 'react';

interface Comment {
    id: number;
    user: {
        username: string;
    };
    content: string;
}

interface CommentsProps {
    videoId: number;
}

const Comments: React.FC<CommentsProps> = ({ videoId }) => {
    const [comments, setComments] = useState<Comment[]>([]);

    useEffect(() => {
        fetch(`http://localhost:8080/videos/comments/${videoId}`)
            .then(response => response.json())
            .then((data: Comment[]) => setComments(data))
            .catch(error => console.error('Error fetching comments:', error));
    }, [videoId]);

    return (
        <div>
            <h3>Comentarios</h3>
            <ul>
                {comments.map(comment => (
                    <li key={comment.id}>
                        <strong>{comment.user.username}:</strong> {comment.content}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Comments;

