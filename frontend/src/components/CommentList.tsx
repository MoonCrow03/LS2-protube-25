import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import CommentForm from './CommentForm';

interface Comment {
    id: number;
    user: string;
    content: string;
    timestamp: string;
}

interface CommentListProps {
    comments: Comment[];
    setComments: React.Dispatch<React.SetStateAction<Comment[]>>
    updateComment: (updatedComment: Comment) => void;
    url: string;
}

const CommentList: React.FC<CommentListProps> = ({ comments, setComments, updateComment, url }) => {
    const [editingCommentId, setEditingCommentId] = useState<number | null>(null);

    const loggedUser = localStorage.getItem('user');
    const currentUser = loggedUser ? JSON.parse(loggedUser) : null;

    const handleCancelEdit = () => {
        setEditingCommentId(null);
    };

    const handleDeleteComment = (commentId: number) => {
        if (window.confirm('Are you sure you want to delete this comment?')) {
            fetch(`http://localhost:8080/api/comments/${commentId}`, {
                method: 'DELETE',
            })
                .then((response) => {
                    if (!response.ok) {
                        throw new Error('Failed to delete comment');
                    }
                    // Re-fetch the updated comments list
                    return fetch(url, { method: 'GET' });
                })
                .then((response) => {
                    if(!(response.status === 302 )){
                        throw new Error('Failed to fetch comments');
                    }
                    return response.json();
                })
                .then((updatedComments) => {
                    setComments(updatedComments); // Update the state with the new list
                })
                .catch((error) => console.error('Error handling delete:', error));
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
                        </div>
                        {editingCommentId === comment.id ? (
                            <CommentForm
                                videoId={comment.id.toString()} // Use the comment ID as videoId for simplicity
                                onCommentPosted={(updatedComment) => {
                                    updateComment(updatedComment); // Update the comment in the parent
                                    setEditingCommentId(null); // Exit editing mode
                                }}
                                initialContent={comment.content} // Pass the existing content
                                onCancel={handleCancelEdit} // Handle cancel action
                            />
                        ) : (
                            <p>{comment.content}</p>
                        )}
                        <span>{new Date(comment.timestamp).toLocaleString()}</span>
                        {currentUser?.username === comment.user && editingCommentId !== comment.id && (
                            <div>
                                <button
                                    className="submit-comment"
                                    onClick={() => setEditingCommentId(comment.id)}
                                >
                                    Edit
                                </button>
                                <button
                                    className="submit-comment"
                                    onClick={() => handleDeleteComment(comment.id)}
                                >
                                    Delete
                                </button>
                            </div>
                        )}
                    </div>
                ))
            ) : (
                <p>No comments yet. Be the first to comment!</p>
            )}
        </div>
    );
};

export default CommentList;


