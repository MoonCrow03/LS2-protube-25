import React, {useEffect, useState} from 'react';
import VideoList from './components/VideoList';
import VideoPlayer from './components/VideoPlayer';
import UserChannel from './components/UserChannel';
import LoginButton from "./components/LoginButton.tsx";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import './ProTubeApp.css';

interface UserChannelWrapperProps {
    username: string;
}

interface User {
    username: string;
    email: string;
    picture: string;
    auth0Id: string;
}

const ProTubeApp: React.FC = () => {
    return (
        <Router>
            <div className="App">
                <LoginButton />
                <h1 className="app-title">. . . . . ╰──╮ PRO ▷ TUBE ╭──╯ . . . . .</h1>
                <h1 className="app-title">────────────────────────────────────────</h1>
                <Routes>
                    <Route path="/" element={<VideoList />} />
                    <Route path="/video/:id" element={<VideoPlayerWrapper />} />
                    <Route path="/user-channel/:username" element={<UserChannelWrapper />} />
                    <Route path="/user-channel/:username" element={<OtherUserChannelWrapper />} />
                </Routes>
            </div>
        </Router>
    );
};

const VideoPlayerWrapper = () => <VideoPlayer />;

const UserChannelWrapper = () => {
    const loggedUser = localStorage.getItem('user');
    const user = loggedUser ? JSON.parse(loggedUser) : null;

    if(user)
        return <UserChannel {...user} />;

    const mockUser = {
        username: 'protube-admin',
        email: '12345@gmail.com',
        picture: 'https://via.placeholder.com/150',
        auth0Id: 'auth0|123456',
    };

    return <UserChannel {...mockUser} />;
};

const OtherUserChannelWrapper: React.FC<UserChannelWrapperProps> = ({ username }) => {
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        fetch(`http://localhost:8080/api/users/${username}`)
            .then((response) => response.json())
            .then((data) => {
                const user: User = {
                    username: data.username,  // Asegúrate de que el backend pasa el nombre de usuario
                    email: data.email,
                    picture: data.picture,
                    auth0Id: data.auth0Id
                };
                localStorage.setItem('user', JSON.stringify(user));  // Guarda la información en localStorage
                setUser(user);  // Actualiza el estado con los datos del usuario
            })
            .catch((error) => {
                console.error('Error fetching user data:', error);
            });
    }, [username]);

    if (user) {
        return <UserChannel {...user} />;
    }
};

export default ProTubeApp;
