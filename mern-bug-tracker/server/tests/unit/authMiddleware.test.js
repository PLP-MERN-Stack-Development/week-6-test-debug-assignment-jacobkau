const authenticate = require('../../src/middleware/auth');
const jwt = require('jsonwebtoken');
const User = require('../../src/models/user');

jest.mock('jsonwebtoken');
jest.mock('../../src/models/user');

describe('authenticate middleware', () => {
  let req, res, next;

  beforeEach(() => {
    req = {
      header: jest.fn()
    };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };
    next = jest.fn();
    process.env.JWT_SECRET = 'testsecret';
  });

  it('should call next() for valid token', async () => {
    req.header.mockReturnValue('Bearer valid.token');
    jwt.verify.mockReturnValue({ userId: '507f191e810c19729de860ea' });
    User.findById.mockResolvedValue({ _id: '507f191e810c19729de860ea' });

    await authenticate(req, res, next);

    expect(next).toHaveBeenCalled();
    expect(req.user).toBeDefined();
  });

  it('should return 401 for missing token', async () => {
    req.header.mockReturnValue(undefined);

    await authenticate(req, res, next);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({ error: 'Authentication required' });
  });
});