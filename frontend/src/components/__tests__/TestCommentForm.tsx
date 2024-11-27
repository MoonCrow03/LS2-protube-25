import React from 'react';
import fetchMock from 'jest-fetch-mock';
import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { BrowserRouter } from 'react-router-dom';
import CommentForm from '../CommentForm';
fetchMock.enableMocks();

const renderWithRouter = (ui: React.ReactElement) => {
    return render(<BrowserRouter>{ui}</BrowserRouter>);
};

describe('CommentForm Component', () => {
    const mockOnCommentPosted = jest.fn();

    beforeEach(() => {
        fetchMock.resetMocks();
        localStorage.clear();
    })

    test('renders login message when user is not logged in', () => {
        renderWithRouter(<CommentForm videoId="0" onCommentPosted={mockOnCommentPosted} />);

        expect(screen.getByText(/You need to be logged in to comment./i)).toBeInTheDocument();
    });

    test('renders comment form when user is logged in', () => {
        localStorage.setItem('user', JSON.stringify({ username: 'TestUser' }));

        renderWithRouter(<CommentForm videoId="0" onCommentPosted={mockOnCommentPosted} />);

        expect(screen.getByPlaceholderText(/Add a comment.../i)).toBeInTheDocument();
        expect(screen.getByText(/Submit Comment/i)).toBeInTheDocument();
    });

    test('does not submit empty comments', () => {
        localStorage.setItem('user', JSON.stringify({ username: 'TestUser' }));

        render(
            <CommentForm videoId="0" onCommentPosted={mockOnCommentPosted} />
        );

        const submitButton = screen.getByText(/Submit Comment/i);

        fireEvent.click(submitButton);

        expect(fetchMock).not.toHaveBeenCalled();
        expect(mockOnCommentPosted).not.toHaveBeenCalled();
    });

    it('submits a comment and calls fetch', async () => {
        localStorage.setItem('user', JSON.stringify({ username: 'TestUser' }));
        const mockResponse = {
            id: 1,
            user: 'TestUser',
            content: 'Great video!',
            timestamp: '2024-11-27T12:00:00Z',
        };

        fetchMock.mockResponseOnce(JSON.stringify(mockResponse));

        render(
            <CommentForm videoId="123" onCommentPosted={mockOnCommentPosted} />
        );

        const textarea = screen.getByPlaceholderText(/Add a comment.../i);
        const submitButton = screen.getByText(/Submit Comment/i);

        fireEvent.change(textarea, { target: { value: 'Great video!' } });
        fireEvent.click(submitButton);

        // Wait for fetch to resolve
        await screen.findByText(/Submit Comment/i);

        expect(fetchMock).toHaveBeenCalledTimes(1);
        expect(fetchMock.mock.calls[0][0]).toBe(
            'http://localhost:8080/api/videos/123/comments'
        );
        expect(mockOnCommentPosted).toHaveBeenCalledWith(mockResponse);
    });
})

