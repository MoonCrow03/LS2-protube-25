import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import VideoPlayer from '../VideoPlayer';
import { BrowserRouter } from 'react-router-dom';
import fetchMock from 'jest-fetch-mock';

const renderWithRouter = (ui: React.ReactElement) => {
    return render(<BrowserRouter>{ui}</BrowserRouter>);
};

describe('VideoPlayer Component', () => {
    const mockVideoData = {
        title: 'Bruno Mars - 24K Magic (Official Music Video)',
        videoUrl: 'http://localhost:8080/api/videos/0',
    };

    beforeEach(() => {
        fetchMock.resetMocks();
    })

    it('displays loading state initially', () => {
        renderWithRouter(<VideoPlayer />);
        expect(screen.getByText(/Loading.../i)).toBeInTheDocument();
    });

    it('displays a video player and title when data is successfully fetched', async () => {
        fetchMock.mockResponseOnce(JSON.stringify(mockVideoData));

        renderWithRouter(<VideoPlayer />);

        await waitFor(() => {
            // Check if the video element is rendered with the correct src
            const videoElement = screen.getByTestId('video-player');
            expect(videoElement.querySelector('source')).toHaveAttribute('src', mockVideoData.videoUrl);

            // Check if the title element is rendered with the correct text
            expect(screen.getByText(mockVideoData.title)).toBeInTheDocument();
        });
    });


    it('displays an error message if the fetch fails', async () => {
        fetchMock.mockRejectedValue(new Error('Failed to fetch'));

        renderWithRouter(<VideoPlayer />);
        await waitFor(() => {
            expect(screen.getByText(/Error loading video. Please try again later./i)).toBeInTheDocument();
        });
    });
})