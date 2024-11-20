import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import "./VideoUpload.css";

const VideoUpload: React.FC = () => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [videoFile, setVideoFile] = useState<File | null>(null);
    const [thumbnailFile, setThumbnailFile] = useState<File | null>(null);
    const navigate = useNavigate();

    const handleVideoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setVideoFile(e.target.files[0]);
        }
    };

    const handleThumbnailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setThumbnailFile(e.target.files[0]);
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!title || !description || !videoFile || !thumbnailFile) {
            alert("Please fill in all fields and upload both files.");
            return;
        }
        const formData = new FormData();
        formData.append("title", title);
        formData.append("description", description);
        formData.append("video", videoFile);
        formData.append("thumbnail", thumbnailFile);

        // Simulate upload logic
        console.log("Form data submitted:");
        for (const [key, value] of formData.entries()) {
            console.log(key, value);
        }

        alert("Video uploaded successfully!");

        // Redirect to the base URL
        navigate("/");
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
