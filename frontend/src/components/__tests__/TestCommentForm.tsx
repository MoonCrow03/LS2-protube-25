import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { BrowserRouter } from 'react-router-dom';
import CommentForm from '../CommentForm';
import fetchMock from 'jest-fetch-mock';
fetchMock.enableMocks();

const renderWithRouter = (ui: React.ReactElement) => {
    return render(<BrowserRouter>{ui}</BrowserRouter>);
};

describe('CommentForm Component', () => {
    const mockOnCommentPosted = jest.fn();
    const mockOnCancel = jest.fn();

    beforeEach(() => {
        fetchMock.resetMocks();
        localStorage.clear();
    });

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

        renderWithRouter(
            <CommentForm videoId="0" onCommentPosted={mockOnCommentPosted} />
        );

        const submitButton = screen.getByText(/Submit Comment/i);

        fireEvent.click(submitButton);

        expect(fetchMock).not.toHaveBeenCalled();
        expect(mockOnCommentPosted).not.toHaveBeenCalled();
    });

    test('submits a new comment with POST request', async () => {
        localStorage.setItem('user', JSON.stringify({ username: 'TestUser' }));
        const mockResponse = {
            id: 1,
            user: 'TestUser',
            content: 'Great video!',
            timestamp: '2024-11-27T12:00:00Z',
        };

        fetchMock.mockResponseOnce(JSON.stringify(mockResponse));

        renderWithRouter(
            <CommentForm videoId="123" onCommentPosted={mockOnCommentPosted} />
        );

        const textarea = screen.getByPlaceholderText(/Add a comment.../i);
        const submitButton = screen.getByText(/Submit Comment/i);

        fireEvent.change(textarea, { target: { value: 'Great video!' } });
        fireEvent.click(submitButton);

        await screen.findByText(/Submit Comment/i);

        expect(fetchMock).toHaveBeenCalledTimes(1);
        expect(fetchMock.mock.calls[0][0]).toBe(
            'http://localhost:8080/api/videos/123/comments'
        );
        expect(fetchMock.mock.calls[0][1]?.method).toBe('POST');
        expect(mockOnCommentPosted).toHaveBeenCalledWith(mockResponse);
    });

    test('renders edit mode and submits edited comment with PATCH request', async () => {
        localStorage.setItem('user', JSON.stringify({ username: 'TestUser' }));
        const mockResponse = {
            id: 1,
            user: 'TestUser',
            content: 'Updated comment!',
            timestamp: '2024-11-27T12:00:00Z',
        };

        fetchMock.mockResponseOnce(JSON.stringify(mockResponse));

        renderWithRouter(
            <CommentForm
                videoId="123"
                onCommentPosted={mockOnCommentPosted}
                initialContent="Original comment"
            />
        );

        const textarea = screen.getByPlaceholderText(/Add a comment.../i);
        expect(textarea).toHaveValue('Original comment');

        fireEvent.change(textarea, { target: { value: 'Updated comment!' } });
        const saveButton = screen.getByText(/Save/i);

        fireEvent.click(saveButton);

        await screen.findByText(/Save/i);

        expect(fetchMock).toHaveBeenCalledTimes(1);
        expect(fetchMock.mock.calls[0][0]).toBe(
            'http://localhost:8080/api/comments/123'
        );
        expect(fetchMock.mock.calls[0][1]?.method).toBe('PATCH');
        expect(mockOnCommentPosted).toHaveBeenCalledWith(mockResponse);
    });

    test('calls onCancel when Cancel button is clicked in edit mode', () => {
        localStorage.setItem('user', JSON.stringify({ username: 'TestUser' }));

        renderWithRouter(
            <CommentForm
                videoId="123"
                onCommentPosted={mockOnCommentPosted}
                initialContent="Editing comment"
                onCancel={mockOnCancel}
            />
        );

        const cancelButton = screen.getByText(/Cancel/i);

        fireEvent.click(cancelButton);

        expect(mockOnCancel).toHaveBeenCalledTimes(1);
    });
});


