import { http } from 'msw';
import { render, screen, waitFor } from '@testing-library/react';
import UserProfile from '../../components/UserProfile';
import { server } from '../../mocks/server';

describe('UserProfile Component', () => {
  test('loads and displays user data', async () => {
    render(<UserProfile />);
    
    // Wait for the user profile to appear
    await waitFor(() => {
      expect(screen.getByTestId('user-profile')).toBeInTheDocument();
    });

    // Verify the content
    expect(screen.getByTestId('user-name')).toHaveTextContent('Name: Test User');
    expect(screen.getByTestId('user-email')).toHaveTextContent('Email: test@example.com');
  });

  test('handles server error', async () => {
    server.use(
      http.get('/api/user', () => {
        return new Response(null, { status: 500 });
      })
    );

    render(<UserProfile />);
    
    await waitFor(() => {
      expect(screen.getByTestId('error-message')).toBeInTheDocument();
    });
  });
});