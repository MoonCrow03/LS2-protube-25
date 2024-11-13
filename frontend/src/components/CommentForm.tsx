import React, { useState } from 'react';

interface CommentFormProps {
    videoId: string;
    onCommentPosted: (newComment: { id: number; user: string; content: string; timestamp: string }) => void;
}

const CommentForm: React.FC<CommentFormProps> = ({ videoId, onCommentPosted }) => {
    const [newComment, setNewComment] = useState<string>('');
    const username = 'protube-comment';

    const handleCommentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setNewComment(e.target.value);
    };
    
    const handleCommentSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (newComment.trim() && username.trim()) {
            const commentData = {
                username: username,
                content: newComment,
                videoId: videoId,
            };
            fetch(`http://localhost:8080/api/videos/${videoId}/comments`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(commentData),
            })
                .then(response => response.json())
                .then((comment) => {
                    onCommentPosted(comment);
                    setNewComment(comment.content);
                })
                .catch(error => console.error('Error posting comment:', error));
        }
    };

    return (
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
    );
};

export default CommentForm;
