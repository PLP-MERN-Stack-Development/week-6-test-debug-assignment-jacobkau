import { useState, useEffect } from 'react';

export default function UserProfile() {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('/api/user')
      .then(response => {
        if (!response.ok) throw new Error('Failed to load');
        return response.json();
      })
      .then(data => setUser(data))
      .catch(err => setError(err.message));
  }, []);

  if (error) return <div data-testid="error-message">Error loading user data: {error}</div>;
  if (!user) return <div data-testid="loading-message">Loading...</div>;

  return (
    <div data-testid="user-profile">
      <h2>User Profile</h2>
      <p data-testid="user-name">Name: {user.name}</p>
      <p data-testid="user-email">Email: {user.email}</p>
    </div>
  );
}