import React from 'react';
import '@testing-library/jest-dom';
import { render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import UserChannel from '../UserChannel';
import fetchMock from 'jest-fetch-mock';

fetchMock.enableMocks();

const renderWithRouter = (ui: React.ReactElement) => {
    return render(<BrowserRouter>{ui}</BrowserRouter>);
};

describe('UserChannel Component', () => {
    beforeEach(() => {
        fetchMock.resetMocks();
    });

    test('renders loading state initially', () => {
        renderWithRouter(<UserChannel username="testuser" />);
        expect(screen.getByText(/loading.../i)).toBeInTheDocument();
    });

    test('renders user data when fetch is successful', async () => {
        fetchMock.mockResponseOnce(
            JSON.stringify({
                username: 'testuser',
                email: 'testuser@example.com',
                picture: 'http://example.com/picture.jpg',
                auth0Id: 'auth0|12345',
            }),
            { status: 302 }
        );

        renderWithRouter(<UserChannel username="testuser" />);

        // Wait for the data to be rendered
        await waitFor(() => expect(screen.getByText('testuser')).toBeInTheDocument());

        // Check if user details are displayed correctly
        expect(screen.getByText('testuser')).toBeInTheDocument();
        expect(screen.getByAltText('testuser')).toHaveAttribute('src', 'http://example.com/picture.jpg');
    });

    test('renders error message when fetch fails', async () => {
        fetchMock.mockRejectOnce(new Error('Failed to fetch'));

        renderWithRouter(<UserChannel username="testuser" />);

        // Wait for the error message to appear
        await waitFor(() =>
            expect(screen.getByText(/error loading channel/i)).toBeInTheDocument()
        );
    });

    test('renders error message for non-302 HTTP response', async () => {
        fetchMock.mockResponseOnce('Not Found', { status: 404 });

        renderWithRouter(<UserChannel username="testuser" />);

        // Wait for the error message to appear
        await waitFor(() =>
            expect(screen.getByText(/error loading channel/i)).toBeInTheDocument()
        );
    });
});
