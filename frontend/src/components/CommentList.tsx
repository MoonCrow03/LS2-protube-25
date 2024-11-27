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
    setComments: (updatedComment: Comment) => void;
}

const CommentList: React.FC<CommentListProps> = ({ comments, setComments }) => {
    const [editingCommentId, setEditingCommentId] = useState<number | null>(null);

    const loggedUser = localStorage.getItem('user');
    const currentUser = loggedUser ? JSON.parse(loggedUser) : null;

    const handleCancelEdit = () => {
        setEditingCommentId(null);
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
                                    setComments(updatedComment); // Update the comment in the parent
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


