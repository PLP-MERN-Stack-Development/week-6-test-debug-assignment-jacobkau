const { validateEmail, validatePassword } = require('./validation');

describe('Validation Utilities', () => {
  describe('validateEmail', () => {
    it('should return true for a valid email', () => {
      expect(validateEmail('test@example.com')).toBe(true);
    });

    it('should return false for an invalid email', () => {
      expect(validateEmail('invalid-email')).toBe(false);
    });
  });

  describe('validatePassword', () => {
    it('should return true for a valid password', () => {
      expect(validatePassword('StrongPass1')).toBe(true);
    });

    it('should return false for a password without numbers', () => {
      expect(validatePassword('NoNumbers')).toBe(false);
    });

    it('should return false for a password that’s too short', () => {
      expect(validatePassword('S1a')).toBe(false);
    });
  });
});
