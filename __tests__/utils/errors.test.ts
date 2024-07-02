import { BacklogError, NetworkError } from '../../src/utils/errors';

describe('Custom Errors', () => {
  describe('BacklogError', () => {
    it('creates a BacklogError with correct properties', () => {
      const error = new BacklogError('Test error', 'TEST_CODE', { detail: 'Some detail' });
      expect(error.message).toBe('Test error');
      expect(error.code).toBe('TEST_CODE');
      expect(error.details).toEqual({ detail: 'Some detail' });
      expect(error.name).toBe('BacklogError');
    });
  });

  describe('NetworkError', () => {
    it('creates a NetworkError with correct properties', () => {
      const error = new NetworkError('Network error', 500);
      expect(error.message).toBe('Network error');
      expect(error.status).toBe(500);
      expect(error.name).toBe('NetworkError');
    });
  });
});