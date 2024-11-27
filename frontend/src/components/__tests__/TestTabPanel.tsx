import React from 'react';
import {render, screen, waitFor} from '@testing-library/react';
import '@testing-library/jest-dom';
import { BrowserRouter } from 'react-router-dom';
import TabPanel from '../TabPanel';
import fetchMock from 'jest-fetch-mock';
fetchMock.enableMocks();

const renderWithRouter = (ui: React.ReactElement) => {
    return render(<BrowserRouter>{ui}</BrowserRouter>);
};

describe('TabPanel Component', () => {
    beforeEach(() => {
        fetchMock.resetMocks();
    });

    it('renders videos when the tab is "Videos"', async () => {
        // Mock the video data
        const mockVideos = [
            {
                id: 1,
                title: 'Test Video 1',
                user: 'User1',
                description: 'Description1',
                videoUrl: 'http://example.com/video1',
                thumbnailUrl: 'http://example.com/thumbnail1',
                duration: 120,
            },
            {
                id: 2,
                title: 'Test Video 2',
                user: 'User2',
                description: 'Description2',
                videoUrl: 'http://example.com/video2',
                thumbnailUrl: 'http://example.com/thumbnail2',
                duration: 150,
            },
        ];
        fetchMock.mockResponseOnce(JSON.stringify(mockVideos));

        renderWithRouter(<TabPanel username="testuser" tab="Videos" />);

        // Verify that fetch was called with the correct URL
        expect(fetchMock).toHaveBeenCalledWith('http://localhost:8080/api/users/testuser/videos');

        // Wait for the videos to render
        await waitFor(() => {
            expect(screen.getByText('Test Video 1')).toBeInTheDocument();
            expect(screen.getByText('Test Video 2')).toBeInTheDocument();
        });

        // Check that the video thumbnails are rendered
        const thumbnails = screen.getAllByRole('img');
        expect(thumbnails).toHaveLength(mockVideos.length);
        expect(thumbnails[0]).toHaveAttribute('src', 'http://example.com/thumbnail1');
    });

    it('renders comments when the tab is "Comments"', async () => {
        // Mock the comment data
        const mockComments = [
            { id: 1, user: 'User1', content: 'Comment1', timestamp: '2024-01-01T12:00:00Z' },
            { id: 2, user: 'User2', content: 'Comment2', timestamp: '2024-01-02T12:00:00Z' },
        ];
        fetchMock.mockResponseOnce(JSON.stringify(mockComments));

        renderWithRouter(<TabPanel username="testuser" tab="Comments" />);

        // Verify that fetch was called with the correct URL
        expect(fetchMock).toHaveBeenCalledWith('http://localhost:8080/api/users/testuser/comments');

        // Wait for the comments to render
        await waitFor(() => {
            expect(screen.getByText('Comment1')).toBeInTheDocument();
            expect(screen.getByText('Comment2')).toBeInTheDocument();
        });
    });

    it('shows "No videos available." when there are no videos', async () => {
        fetchMock.mockResponseOnce(JSON.stringify([]));

        renderWithRouter(<TabPanel username="testuser" tab="Videos" />);

        await waitFor(() => {
            expect(screen.getByText('No videos available.')).toBeInTheDocument();
        });
    });

    it('shows "No comments available." when there are no comments', async () => {
        fetchMock.mockResponseOnce(JSON.stringify([]));

        renderWithRouter(<TabPanel username="testuser" tab="Comments" />);

        await waitFor(() => {
            expect(screen.getByText('No comments available.')).toBeInTheDocument();
        });
    });

    it('logs an error for an invalid tab', () => {
        const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
        renderWithRouter(<TabPanel username="testuser" tab={'Invalid'} />);
        expect(consoleErrorSpy).toHaveBeenCalledWith('Invalid tab: Invalid');
        consoleErrorSpy.mockRestore();
    });
});

