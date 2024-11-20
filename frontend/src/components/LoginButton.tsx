import React, { useState, useEffect } from 'react';

interface User {
    username: string;
    email: string;
    picture: string;
    auth0Id: string;
}

const LoginButton: React.FC = () => {
    // Estado para el usuario
    const [user, setUser] = useState<User | null>(null);

    // Recuperar la información del usuario desde localStorage o redirección
    useEffect(() => {
        const loggedInUser = localStorage.getItem('user');
        if (loggedInUser) {
            setUser(JSON.parse(loggedInUser));  // Recupera la información del usuario desde localStorage
        } else {
            // Verifica si se recibe un token después de la redirección desde Okta
            const urlParams = new URLSearchParams(window.location.search);
            const token = urlParams.get('token');
            const username = urlParams.get('username');

            if (token) {
                // Realiza una llamada para obtener los datos del usuario usando el token
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
            }
        }
    }, []);



    const handleLogin = () => {
        window.location.href = 'http://localhost:8080/oauth2/authorization/okta';  // Redirige al usuario para iniciar sesión en Okta

    };

    const handleLogout = () => {
        localStorage.removeItem('user');  // Elimina la información del usuario del localStorage
        setUser(null);  // Establece el estado de usuario como null (vuelve a mostrar el botón de login)
        window.location.href = 'http://localhost:8080/logout';
    };

    return (
        <button className="login-button" onClick={!user ? handleLogin : handleLogout}>
            {!user ? (
                'Login'
            ) : (
                <div className="profile-info">
                    <img src={user.picture} alt="Profile" className="profile-pic" />
                    <span>{user.username}</span>
                </div>
            )}
        </button>
    );
};

export default LoginButton;
