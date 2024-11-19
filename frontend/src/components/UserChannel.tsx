import React, { useEffect, useState } from 'react';
import "./User-Channel.css";
import Tabs from "./ChannelTabs.tsx";

interface UserChannelProps {
    username: string;
    email: string;
    picture: string;
    auth0Id: string;
}

const UserChannel: React.FC<UserChannelProps> = ({ username, email, picture, auth0Id }) => {
    const [activeTab, setActiveTab] = useState('Videos');
    const [videos, setVideos] = useState<{ title: string; videoUrl: string; description: string }[]>([]);
    const [comments, setComments] = useState<string[]>([]);

    useEffect(() => {
        if (activeTab === 'Videos') {
            fetch(`http://localhost:8080/api/users/${username}/videos`)
                .then(response => response.json())
                .then(data => setVideos(data))
                .catch(error => console.error('Error fetching videos:', error));
        } else if (activeTab === 'Comments') {
            fetch(`http://localhost:8080/api/users/${username}/comments`)
                .then(response => response.json())
                .then(data => setComments(data))
                .catch(error => console.error('Error fetching comments:', error));
        }
    }, [activeTab, username]);

    return (
        <div className="user-channel">
            <img src={picture} alt={username} />
            <h1>{username}</h1>
            <Tabs onTabChange={setActiveTab} activeTab={activeTab} />
        </div>
    );
};

export default UserChannel;
