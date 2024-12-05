import React from 'react';
import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { BrowserRouter } from 'react-router-dom';
import CommentList from '../CommentList';
import fetchMock from 'jest-fetch-mock';

fetchMock.enableMocks();

const renderWithRouter = (ui: React.ReactElement) => {
    return render(<BrowserRouter>{ui}</BrowserRouter>);
};

describe('CommentList Component', () => {
    beforeEach(() => {
        fetchMock.resetMocks();
    });

    const mockComments = [
        {
            id: 1,
            user: 'user1',
            content: 'This is a comment',
            timestamp: '2024-12-01T10:00:00Z',
        },
        {
            id: 2,
            user: 'user2',
            content: 'This is another comment',
            timestamp: '2024-12-02T11:00:00Z',
        },
    ];

    const mockSetComments = jest.fn();
    const mockUpdateComment = jest.fn();
    const mockUrl = 'http://localhost:8080/api/comments';

    it('renders comments correctly', () => {
        renderWithRouter(
            <CommentList
                comments={mockComments}
                setComments={mockSetComments}
                updateComment={mockUpdateComment}
                url={mockUrl}
            />
        );

        expect(screen.getByText('This is a comment')).toBeInTheDocument();
        expect(screen.getByText('This is another comment')).toBeInTheDocument();
        expect(screen.getByText('user1')).toBeInTheDocument();
        expect(screen.getByText('user2')).toBeInTheDocument();
    });

    it('shows "No comments yet" when there are no comments', () => {
        renderWithRouter(
            <CommentList
                comments={[]}
                setComments={mockSetComments}
                updateComment={mockUpdateComment}
                url={mockUrl}
            />
        );

        expect(screen.getByText('No comments yet. Be the first to comment!')).toBeInTheDocument();
    });

    it('allows a user to delete a comment', async () => {
        // Simulate logged-in user
        localStorage.setItem('user', JSON.stringify({ username: 'user1' }));

        window.confirm = jest.fn(() => true); // Mock confirm dialog to return true

        const mockComments = [
            { id: 1, user: 'user1', content: 'This is a comment', timestamp: '2024-12-01T11:00:00Z' },
            { id: 2, user: 'user2', content: 'This is another comment', timestamp: '2024-12-02T11:00:00Z' },
        ];

        const mockSetComments = jest.fn();

        fetchMock.mockResponseOnce('', { status: 200 }); // Mock DELETE response

        render(
            <BrowserRouter>
                <CommentList
                    comments={mockComments}
                    setComments={mockSetComments}
                    updateComment={jest.fn()}
                    url="http://localhost:8080/api/comments"
                />
            </BrowserRouter>
        );

        // Simulate clicking the Delete button for the first comment
        const deleteButton = screen.getAllByText('Delete')[0];
        fireEvent.click(deleteButton);

        // Wait for fetch call
        await waitFor(() => {
            // Verify fetchMock call
            expect(fetchMock).toHaveBeenCalledTimes(1);
            expect(fetchMock).toHaveBeenCalledWith('http://localhost:8080/api/comments/1', { method: 'DELETE' });
        });

        // Ensure setComments was not called to update the list
        expect(mockSetComments).not.toHaveBeenCalled();

        localStorage.removeItem('user'); // Cleanup after test
    });

    it('allows a user to edit a comment', async () => {
        localStorage.setItem('user', JSON.stringify({ username: 'user1' }));

        // Mocking a valid response from the backend after the comment is updated
        fetchMock.mockResponseOnce(
            JSON.stringify({ content: 'Updated comment', id: 1, timestamp: '2024-12-01T11:00:00Z', user: 'user1' }),
            { status: 200 }
        );

        renderWithRouter(
            <CommentList
                comments={mockComments}
                setComments={mockSetComments}
                updateComment={mockUpdateComment}
                url={mockUrl}
            />
        );

        const editButton = screen.getAllByText('Edit')[0];
        fireEvent.click(editButton);

        // Expect the CommentForm to render with the initial content of the comment
        expect(screen.getByDisplayValue('This is a comment')).toBeInTheDocument();

        const updatedContent = 'Updated comment';
        fireEvent.change(screen.getByDisplayValue('This is a comment'), {
            target: { value: updatedContent },
        });

        const saveButton = screen.getByText('Save');
        fireEvent.click(saveButton);

        // Wait for the update function to be called with the expected arguments
        await waitFor(() => {
            expect(mockUpdateComment).toHaveBeenCalledWith({
                id: 1,
                user: 'user1',
                content: updatedContent,
                timestamp: expect.any(String), // Expecting timestamp to be a string
            });
        });

        localStorage.removeItem('user');
    });
});