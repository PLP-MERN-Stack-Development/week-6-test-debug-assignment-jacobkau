const User = require('../../src/models/user');
const { connectDB, disconnectDB } = require('../../config/db');

beforeAll(async () => await connectDB());
afterAll(async () => await disconnectDB());

describe('User Model', () => {
  it('should encrypt password on save', async () => {
    const user = new User({
      name: 'Test',
        username: 'testuser',
      email: 'test@example.com',
      password: 'plaintext'
    });
    await user.save();
    expect(user.password).not.toBe('plaintext');
  });
});