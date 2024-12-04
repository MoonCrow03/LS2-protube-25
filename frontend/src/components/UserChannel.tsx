import React, { useEffect, useState } from 'react';
import TabButtons from "./TabButtons";
import "./Tabs.css";
import defaultPic from "../assets/default_pic.png";

interface UsernameProps {
    username: string;
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
            .then((response) => {
                if (response.status != 302) {
                    // Lanza un error si la respuesta no es exitosa (por ejemplo, 404 o 500)
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.json();
            })
            .then((data) => {
                setState({
                    state: 'success',
                    user: { username: data.username, email: data.email, picture: data.picture, auth0Id: data.auth0Id }
                });
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
                    <object className="user-channel-object"
                        data={state.user.picture}>
                        <img className="user-channel-img"
                            src={defaultPic}
                             alt={state.user.username}
                        />
                    </object>


                    <h1>{state.user.username}</h1>
                    <h2 style={{fontSize: '18px', color: '#555'}}>{state.user.email}</h2>
                    <TabButtons username={state.user.username}/>
                </div>
            );
    }
};

export default UserChannel;
