import React, { useEffect, useState } from 'react';
import TabButtons from "./TabButtons.tsx";
import "./Tabs.css";

interface UserChannelProps {
    username: string;
    email: string;
    picture: string;
    auth0Id: string;
}

const UserChannel: React.FC<UserChannelProps> = ({ username, email, picture, auth0Id }) => {
    return (
        <div className="user-channel">
            <img src={picture} alt={username} />
            <h1>{username}</h1>
            <TabButtons username={username}/>
        </div>
    );
};

export default UserChannel;
