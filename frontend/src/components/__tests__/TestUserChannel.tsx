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

    test('shows loading state initially', () => {
        renderWithRouter(<UserChannel username="testuser" />);
        expect(screen.getByText(/loading.../i)).toBeInTheDocument();
    });

    test('displays user data on successful fetch (status 302)', async () => {
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

        // Wait for the success state to render
        await waitFor(() => {
            expect(screen.getByText('testuser')).toBeInTheDocument();
        });

        // Verify displayed user details
        expect(screen.getByText('testuser')).toBeInTheDocument();
        expect(screen.getByText('testuser@example.com')).toBeInTheDocument();
    });

    test('displays error message when fetch fails', async () => {
        fetchMock.mockRejectOnce(new Error('Failed to fetch'));

        renderWithRouter(<UserChannel username="testuser" />);

        // Wait for the error state
        await waitFor(() => {
            expect(screen.getByText(/error loading channel/i)).toBeInTheDocument();
        });
    });

    test('shows error message for non-302 HTTP responses', async () => {
        fetchMock.mockResponseOnce('Not Found', { status: 404 });

        renderWithRouter(<UserChannel username="testuser" />);

        // Wait for the error state
        await waitFor(() => {
            expect(screen.getByText(/error loading channel/i)).toBeInTheDocument();
        });
    });
});

