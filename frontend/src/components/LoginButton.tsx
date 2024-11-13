import React, { useState, useEffect } from 'react';
import {useNavigate} from "react-router-dom";

interface User {
    username: string;
    profilePicUrl: string;
}

const LoginButton: React.FC = () => {
    // State to track if the user is logged in and their details
    const [user, setUser] = useState<User | null>(null);
    const navigate = useNavigate();
    // Example of fetching user data (you could use an API or context)
    useEffect(() => {
        const loggedInUser = localStorage.getItem('user'); // Assuming user info is stored in localStorage
        if (loggedInUser) {
            //setUser(JSON.parse(loggedInUser));
        }
    }, []);

    const handleLogin = () => {
        // TODO: Implement actual login logic
        window.location.href = 'http://localhost:8080/oauth2/authorization/okta';
        // Simulate login (replace with actual login logic)

        const mockUser: User = {
            username: 'john_doe',
            profilePicUrl: 'https://example.com/profile.jpg',
        };

        localStorage.setItem('user', JSON.stringify(mockUser)); // Store user in localStorage
        setUser(mockUser); // Set the user state*/
    };

    return (
        <button className="login-button" onClick={!user ? handleLogin : undefined}>
            {!user ? (
                'Login'
            ) : (
                <div className="profile-info">
                    <img src={user.profilePicUrl} alt="Profile" className="profile-pic" />
                    <span>{user.username}</span>
                </div>
            )}
        </button>
    );
};

export default LoginButton;