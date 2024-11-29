import React, { useState } from 'react';

interface CommentFormProps {
    videoId: string;
    onCommentPosted: (newComment: { id: number; user: string; content: string; timestamp: string }) => void;
    initialContent?: string; // Optional prop for editing existing comments
    onCancel?: () => void; // Optional prop for canceling edit mode
}

const CommentForm: React.FC<CommentFormProps> = ({ videoId, onCommentPosted, initialContent = '', onCancel }) => {
    const [newComment, setNewComment] = useState<string>(initialContent);

    const loggedUser = localStorage.getItem('user');
    const user = loggedUser ? JSON.parse(loggedUser) : null;

    const handleCommentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setNewComment(e.target.value);
    };

    const handleCommentSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!newComment.trim()) {
            console.warn('Empty comment cannot be submitted.');
            return;
        }

        const commentData = {
            username: user?.username,
            content: newComment,
            videoId,
        };

        const requestUrl = initialContent
            ? `http://localhost:8080/api/comments/${videoId}` // Edit endpoint
            : `http://localhost:8080/api/videos/${videoId}/comments`; // New comment endpoint

        const method = initialContent ? 'PATCH' : 'POST';

        fetch(requestUrl, {
            method,
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(commentData),
        })
            .then((response) => response.json())
            .then((comment) => {
                onCommentPosted(comment);
                setNewComment('');
            })
            .catch((error) => console.error('Error submitting comment:', error));
    };

    if (!user) {
        return (
            <div className="login-required">
                <p>You need to be logged in to comment.</p>
            </div>
        );
    }

    return (
        <form onSubmit={handleCommentSubmit} className="comment-form">
            <textarea
                value={newComment}
                onChange={handleCommentChange}
                placeholder="Add a comment..."
                className="comment-input"
            />
            <button type="submit" className="submit-comment">
                {initialContent ? 'Save' : 'Submit Comment'}
            </button>
            {initialContent && onCancel && (
                <button type="button" onClick={onCancel} className="submit-comment">
                    Cancel
                </button>
            )}
        </form>
    );
};

export default CommentForm;

