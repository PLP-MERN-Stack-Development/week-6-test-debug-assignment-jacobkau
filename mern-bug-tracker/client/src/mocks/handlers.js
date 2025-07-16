import { http } from 'msw';

export const handlers = [
  http.get('/api/user', () => {
    return new Response(JSON.stringify({
      name: 'Test User',
      email: 'test@example.com',
      joined: '2023-01-01'
    }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  })
];