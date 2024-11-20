import React, { useEffect, useState } from 'react';
import TabButtons from "./TabButtons.tsx";
import "./Tabs.css";

interface UsernameProps {
    username: string;
}

interface User {
    username: string;
    email: string;
    picture: string;
    auth0Id: string;
}

type ChannelStateType =
    | { state: 'loading' }
    | { state: 'error', message: string }
    | { state: 'success', user: { username: string; email: string; picture: string; auth0Id: string } };

const UserChannel: React.FC<UsernameProps> = ({ username }) => {
    const [state, setState] = useState<ChannelStateType>({ state: 'loading' });

    useEffect(() => {
        setState({ state: 'loading' });
        fetch(`http://localhost:8080/api/users/${username}`)
            .then((response) => response.json())
            .then((data) => {
                const user: User = {
                    username: data.username,
                    email: data.email,
                    picture: data.picture,
                    auth0Id: data.auth0Id
                };
                localStorage.setItem('user', JSON.stringify(user));
                setState({
                        state: 'success',
                        user: {username: data.username, email: data.email, picture: data.picture, auth0Id: data.auth0Id}                    }
                );
            })
            .catch((error) => {
                console.error('Error fetching user data:', error);
                setState({ state: 'error', message: error.message });
            });
    }, [username]);

    switch (state.state){
        case 'loading':
            return <div className="loading">Loading...</div>;
        case 'error':
            return <div className="error">Error loading channel. Please try again later.</div>;
        default:
            return (
                <div className="user-channel">
                    <img src={state.user.picture} alt={state.user.username}/>
                    <h1>{state.user.username}</h1>
                    <TabButtons username={state.user.username}/>
                </div>
            );
    }
};

export default UserChannel;
