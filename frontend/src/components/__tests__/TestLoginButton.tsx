import React from 'react';
import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import {BrowserRouter, useNavigate} from 'react-router-dom';
import LoginButton from '../LoginButton';
import '@testing-library/jest-dom';
import fetchMock from 'jest-fetch-mock';
fetchMock.enableMocks();

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: jest.fn(),
}));

const renderWithRouter = (ui: React.ReactElement) => {
    return render(<BrowserRouter>{ui}</BrowserRouter>);
};

describe('LoginButton Component', () => {
    const originalLocation = window.location;
    const mockNavigate = jest.fn();

    beforeAll(() => {
        jest.clearAllMocks();
        (useNavigate as jest.Mock).mockReturnValue(mockNavigate);

        delete (window as any).location;
        window.location = { href: '' } as any;
    });

    beforeEach(() => {
        fetchMock.resetMocks();
        localStorage.clear();
    });

    afterAll(() => {
        window.location = originalLocation;
    });

    it('renders login button when user is not logged in', () => {
        renderWithRouter(<LoginButton />);
        expect(screen.getByText('Login')).toBeInTheDocument();
    });

    it('redirects to Okta login page when clicked', () => {
        renderWithRouter(<LoginButton />);
        const button = screen.getByRole('button', { name: /login/i });

        fireEvent.click(button);

        expect(window.location.href).toBe('http://localhost:8080/oauth2/authorization/okta');
    });

    it('renders profile and logout buttons when user is logged in', async () => {
        const mockUser = {
            username: 'testuser',
            email: 'testuser@example.com',
            picture: 'profile-pic.jpg',
            auth0Id: 'auth0|12345',
        };

        localStorage.setItem('user', JSON.stringify(mockUser));

        renderWithRouter(<LoginButton />);

        await waitFor(() => {
            expect(screen.getByText('testuser')).toBeInTheDocument();
            expect(screen.getByText('Logout')).toBeInTheDocument();
        });
    });

    it('logs out the user and redirects to logout URL when logout button is clicked', async () => {
        const mockUser = {
            username: 'testuser',
            email: 'testuser@example.com',
            picture: 'profile-pic.jpg',
            auth0Id: 'auth0|12345',
        };

        localStorage.setItem('user', JSON.stringify(mockUser));

        renderWithRouter(<LoginButton />);

        await waitFor(() => {
            const logoutButton = screen.getByText('Logout');
            fireEvent.click(logoutButton);
            expect(localStorage.getItem('user')).toBeNull();
            expect(window.location.href).toBe('http://localhost:8080/logout');
        });
    });

    it('fetches user data and logs in when a token is present in the URL', async () => {
        const mockUser = {
            username: 'testuser',
            email: 'testuser@example.com',
            picture: 'profile-pic.jpg',
            auth0Id: 'auth0|12345',
        };

        Object.defineProperty(window, 'location', {
            value: {
                search: '?token=mockToken&username=testuser',
            },
            writable: true,
        });

        fetchMock.mockResponseOnce(JSON.stringify(mockUser));

        renderWithRouter(<LoginButton />);

        await waitFor(() => {
            expect(fetchMock).toHaveBeenCalledWith('http://localhost:8080/api/users/testuser');
            expect(localStorage.getItem('user')).toEqual(JSON.stringify(mockUser));
            expect(screen.getByText('testuser')).toBeInTheDocument();
        });
    });

    it('navigates to the user channel when the profile button is clicked', async () => {
        const mockUser = {
            username: 'testuser',
            email: 'testuser@example.com',
            picture: 'profile-pic.jpg',
            auth0Id: 'auth0|12345',
        };

        localStorage.setItem('user', JSON.stringify(mockUser));

        renderWithRouter(<LoginButton />);

        const profileButton = await screen.findByText('testuser');
        fireEvent.click(profileButton);

        await waitFor(() => {
            expect(mockNavigate).toHaveBeenCalledWith('/user-channel/testuser');
        });
    });
});