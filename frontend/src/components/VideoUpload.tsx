import React, { useState } from "react";
import {useNavigate} from "react-router-dom"; // Import useNavigate
import "./VideoUpload.css";

const VideoUpload: React.FC = () => {
    const loggedUser = localStorage.getItem('user');
    const user = loggedUser ? JSON.parse(loggedUser) : null;
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [duration, setDuration] = useState<number>(0);
    const [videoFile, setVideoFile] = useState<File | null>(null);
    const [thumbnailFile, setThumbnailFile] = useState<File | null>(null);
    const navigate = useNavigate();

    const handleVideoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            setVideoFile(file);
            getVideoDuration(file); // Extract duration immediately after selecting the file
        }
    };

    const handleThumbnailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setThumbnailFile(e.target.files[0]);
        }
    };

    const getVideoDuration = (file: File) => {
        const video = document.createElement("video");
        video.preload = "metadata"; // Preload metadata only
        video.src = URL.createObjectURL(file);
        video.onloadedmetadata = () => {
            URL.revokeObjectURL(video.src); // Free up memory
            setDuration(video.duration); // Update the duration state
        };
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!videoFile || !thumbnailFile) {
            alert("Please fill in all fields and upload the required files.");
            return;
        }

        const formData = new FormData();
        formData.append("title", title);
        formData.append("description", description);
        formData.append("video", videoFile);
        formData.append("thumbnail", thumbnailFile);
        formData.append("user", user.username);
        if (duration !== null) {
            formData.append("duration", Math.floor(duration).toString());
        }

        try {
            const response = await fetch("http://localhost:8080/api/videos/upload", {
                method: "POST",
                body: formData,
            } as RequestInit);

            if (response.ok) {
                const message = await response.text();
                alert(message);
                navigate(`/user-channel/${user.username}`);
            } else {
                const errorMessage = await response.text();
                alert(`Error: ${errorMessage}`);
            }
        } catch (error) {
            console.error("Error uploading video:", error);
            alert("Failed to upload video.");
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
                {duration && (
                    <p className="video-duration">Duration: {duration.toFixed(2)} seconds</p>
                )}
                <div className="form-group">
                    <label htmlFor="video" className="form-label">
                        Upload Video
                    </label>
                    <input
                        type="file"
                        id="video"
                        accept="video/*"
                        onChange={handleVideoChange}
                        className="form-input"
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
                        required
                    />
                </div>
                <button type="submit" className="submit-button">
                    Upload Video
                </button>
            </form>
        </div>
    );
};

export default VideoUpload;