import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './VideoList.css';

interface Video {
    id: number;
    title: string;
    user: string;
    description: string;
    videoUrl: string;
    thumbnailUrl: string;
    duration: number;
}

const VideoList: React.FC = () => {
    const [videos, setVideos] = useState<Video[]>([]);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        fetch('http://localhost:8080/api/videos/list')
            .then(response => response.json())
            .then((data: Video[]) => setVideos(data))
            .catch(error => console.error('Error fetching videos:', error));
    }, []);

    return (
        <div>
            {/* buscador */}
            <input
                type="text"
                className="search-bar"
                placeholder="Search videos..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
            <div className="video-list"> {/* Aplica la clase CSS para el contenedor de la cuadrícula */}
                {videos.map(video => (
                    <div className="video-item" key={video.id}> {/* Aplica la clase CSS para cada video */}
                        <Link to={`/video/${video.id}`} style={{ color: 'black', textDecoration: 'none' }}>
                            <img
                                className="video-thumbnail" // Aplica la clase CSS a la imagen
                                src={video.thumbnailUrl}
                                alt={video.title}
                            />
                            <h3 className="video-title">{video.title}</h3> {/* Aplica la clase CSS al título */}
                            <h4 className="video-user">{video.user}</h4> {/* Aplica la clase CSS al título */}
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default VideoList;
