import React, {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom"; // Import useNavigate
import "./VideoUpload.css";

const VideoUpload: React.FC = () => {
    const loggedUser = localStorage.getItem('user');
    const user = loggedUser ? JSON.parse(loggedUser) : null;
    const { videoId } = useParams();
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [thumbnailFile, setThumbnailFile] = useState<File | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        // Fetch video details if editing
        if (videoId) {
            fetch(`http://localhost:8080/api/videos/${videoId}`)
                .then((response) => response.json())
                .then((data) => {
                    if (data.user === user?.username) {
                        setTitle(data.title);
                        setDescription(data.description);
                    } else {
                        alert("You are not authorized to edit this video.");
                        navigate("/"); // Redirect unauthorized users
                    }
                })
                .catch((error) =>
                    console.error("Error fetching video details:", error)
                );
        }
    }, [videoId]);

    const handleThumbnailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setThumbnailFile(e.target.files[0]);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("title", title);
        formData.append("description", description);
        formData.append("thumbnail", thumbnailFile);


        try {
            const response = await fetch(`http://localhost:8080/api/videos/${videoId}`, {
                method: "PATCH",
                body: formData,
            } as RequestInit);

            if (response.ok) {
                const message = await response.text();
                navigate(`/user-channel/${user.username}`);
            } else {
                const errorMessage = await response.text();
                alert(`Error: ${errorMessage}`);
            }
        } catch (error) {
            console.error("Error updating video:", error);
            alert("Failed to update video.");
        }
    };

    return (
        <div className="upload-container">
            <h1 className="upload-title">Upload Your Video</h1>
            <form onSubmit={handleSubmit} className="upload-form">
                <div className="form-group">
                    <label htmlFor="title" className="form-label">
                        Title
                    </label>
                    <input
                        type="text"
                        id="title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="form-input"
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="description" className="form-label">
                        Description
                    </label>
                    <textarea
                        id="description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="form-textarea"
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="thumbnail" className="form-label">
                        Upload Thumbnail
                    </label>
                    <input
                        type="file"
                        id="thumbnail"
                        accept="image/*"
                        onChange={handleThumbnailChange}
                        className="form-input"
                    />
                </div>
                <button type="submit" className="submit-button">
                    Update Video Properties
                </button>
            </form>
        </div>
    );
};

export default VideoUpload;