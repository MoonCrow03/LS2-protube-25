import React from 'react';
import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { BrowserRouter } from 'react-router-dom';
import VideoUpload from '../VideoUpload';
import fetchMock from 'jest-fetch-mock';

fetchMock.enableMocks();

// Mocking URL.createObjectURL
beforeAll(() => {
    global.URL.createObjectURL = jest.fn();
});

afterAll(() => {
    global.URL.createObjectURL = jest.fn();
});

const renderWithRouter = (ui: React.ReactElement) => {
    return render(<BrowserRouter>{ui}</BrowserRouter>);
};

describe('VideoUpload Component', () => {
    beforeEach(() => {
        fetchMock.resetMocks();
        localStorage.setItem('user', JSON.stringify({ username: 'testuser' }));
    });

    it('renders the form correctly', () => {
        renderWithRouter(<VideoUpload />);
        expect(screen.getByText('Upload Your Video')).toBeInTheDocument();
        expect(screen.getByLabelText(/Title/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Description/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Upload Video/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Upload Thumbnail/i)).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /Upload Video/i })).toBeInTheDocument();
    });

    it('updates state when video is uploaded', async () => {
        renderWithRouter(<VideoUpload />);
        const videoFile = new File(['(⌐□_□)'], 'testvideo.mp4', { type: 'video/mp4' });

        const videoInput = screen.getByLabelText(/Upload Video/i) as HTMLInputElement;
        fireEvent.change(videoInput, { target: { files: [videoFile] } });

        // Mock video duration extraction
        await waitFor(() => {
            expect(videoInput.files?.[0]).toBe(videoFile);
        });
    });

    it('updates state when thumbnail is uploaded', () => {
        renderWithRouter(<VideoUpload />);
        const thumbnailFile = new File(['image content'], 'thumbnail.png', { type: 'image/png' });

        const thumbnailInput = screen.getByLabelText(/Upload Thumbnail/i) as HTMLInputElement;
        fireEvent.change(thumbnailInput, { target: { files: [thumbnailFile] } });

        expect(thumbnailInput.files?.[0]).toBe(thumbnailFile);
    });
});


