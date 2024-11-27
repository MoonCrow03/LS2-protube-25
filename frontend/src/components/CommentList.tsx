import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { HttpStatusCode } from 'axios';

interface Comment {
    id: number;
    user: string;
    content: string;
    timestamp: string;
}

interface CommentListProps {
    comments: Comment[];
    setComments: (updatedComment: Comment) => void; // Function to update the comment in parent
}

const CommentList: React.FC<CommentListProps> = ({ comments, setComments }) => {
    const [editingCommentId, setEditingCommentId] = useState<number | null>(null);
    const [newContent, setNewContent] = useState<string>('');

    const loggedUser = localStorage.getItem('user');
    const currentUser = loggedUser ? JSON.parse(loggedUser) : null;

    const handleEditComment = (id: number, currentContent: string) => {
        setEditingCommentId(id);
        setNewContent(currentContent);
    };

    const handleCancelEdit = () => {
        setEditingCommentId(null);
        setNewContent('');
    };

    const handleSaveComment = async (id: number) => {
        try {
            const response = await fetch(`http://localhost:8080/api/comments/${id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ newContent: newContent }),
            });

            if (response.status !== HttpStatusCode.Ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const updatedComment = await response.json();

            // Update the comment in the parent component
            setComments(updatedComment);

            setEditingCommentId(null);
            setNewContent('');
        } catch (error) {
            console.error('Error updating comment:', error);
        }
    };

    return (
        <div className="comments-list">
            {comments.length > 0 ? (
                comments.map((comment) => (
                    <div key={comment.id} className="comment">
                        <div className="comment-header">
                            <Link
                                to={`/user-channel/${comment.user}`}
                                style={{ color: 'black', textDecoration: 'none' }}
                            >
                                <strong>{comment.user}</strong>
                            </Link>
                            {currentUser?.username === comment.user && (
                                <button onClick={() => handleEditComment(comment.id, comment.content)}>
                                    Edit
                                </button>
                            )}
                        </div>
                        {editingCommentId === comment.id ? (
                            <div>
                                <input
                                    type="text"
                                    value={newContent}
                                    onChange={(e) => setNewContent(e.target.value)}
                                />
                                <button onClick={() => handleSaveComment(comment.id)}>Done</button>
                                <button onClick={handleCancelEdit}>Cancel</button>
                            </div>
                        ) : (
                            <p>{comment.content}</p>
                        )}
                        <span>{new Date(comment.timestamp).toLocaleString()}</span>
                    </div>
                ))
            ) : (
                <p>No comments yet. Be the first to comment!</p>
            )}
        </div>
    );
};

export default CommentList;

