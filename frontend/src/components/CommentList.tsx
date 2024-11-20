import React from 'react';
import {Link} from "react-router-dom";

interface Comment {
    id: number;
    user: string;
    content: string;
    timestamp: string;
}

interface CommentListProps {
    comments: Comment[];
}

const CommentList: React.FC<CommentListProps> = ({ comments }) => {
    return (
        <div className="comments-list">
            {comments.length > 0 ? (
                comments.map((comment) => (
                    <div key={comment.id} className="comment">
                        <Link to={`/user-channel/${comment.user}`} style={{color: 'black', textDecoration: 'none'}}>
                            <strong>{comment.user}</strong>
                        </Link>
                        <p>{comment.content}</p>
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
