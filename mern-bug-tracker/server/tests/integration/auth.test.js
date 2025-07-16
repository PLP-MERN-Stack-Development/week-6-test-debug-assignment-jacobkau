const request = require('supertest');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const app = require('../../src/app');
const User = require('../../src/models/user');
const Post = require('../../src/models/post'); // ✅ Don't forget this
require('dotenv').config();
jest.setTimeout(60000); // Extend test timeout

let token;
let userId;

beforeAll(async () => {
  // Connect to real MongoDB (make sure process.env.MONGO_URI is set)
await mongoose.connect(process.env.MONGO_URI);

  // Create a user for testing
  const user = await User.create({
    username: 'testuser',
    email: 'test@example.com',
    password: 'password123',
  });

  userId = user._id;
  token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);
});

afterAll(async () => {
  // Cleanup
  await Post.deleteMany({});
  await User.deleteMany({});
  await mongoose.disconnect();
});

afterEach(async () => {
  // Delete posts created during test, but keep user
  await Post.deleteMany({});
});

describe('POST /posts', () => {
  it('should create a post with valid auth', async () => {
    const response = await request(app)
      .post('/api/posts')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'Test Post',
        content: 'Test content',
        category: new mongoose.Types.ObjectId(), // required field?
      });

    expect(response.status).toBe(201);
    expect(response.body.title).toBe('Test Post');
    expect(response.body.content).toBe('Test content');
    expect(response.body.author).toBe(userId.toString());
  });
});
