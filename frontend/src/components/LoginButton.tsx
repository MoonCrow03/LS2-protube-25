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
                            auth0Id: data.auth0Id  // Asegúrate de que el backend pasa la URL de la imagen
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
        setUser(null);
        fetch('http://localhost:8080/api/logout', { //TODO: falta hacer el logout en el oauth Y verificar los tokens
            //TODO: falta acabar el endpoint para cerrar la sesion en el backend
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                // Puedes incluir aquí el token si es necesario para el logout en el servidor
            },
        })
            .then(() => {
                // Después de la llamada al backend, redirige a la página principal
                window.location.href = 'http://localhost:5173';  // Redirige a la página principal
            })
            .catch((error) => {
                console.error('Error during logout', error);
                // En caso de error, también puedes redirigir al usuario a la página principal
                window.location.href = 'http://localhost:5173';
            });
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
