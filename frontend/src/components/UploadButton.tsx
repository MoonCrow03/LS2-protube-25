import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const UploadButton: React.FC = () => {
    const location = useLocation(); // To determine the current path
    const navigate = useNavigate(); // To navigate programmatically

    // Hide the button if the current path is `/upload`
    if (location.pathname === "/upload") {
        return null;
    }

    return (
        <button className="upload-button" onClick={() => navigate("/upload")}>
            Upload Video
        </button>
    );
};

export default UploadButton;
