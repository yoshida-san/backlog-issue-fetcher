import { logInfo, logError, logWarning } from '../../src/utils/logger';

describe('Logger', () => {
  let consoleLogSpy: jest.SpyInstance;
  let consoleErrorSpy: jest.SpyInstance;
  let consoleWarnSpy: jest.SpyInstance;

  beforeEach(() => {
    consoleLogSpy = jest.spyOn(console, 'log').mockImplementation();
    consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation();
    consoleWarnSpy = jest.spyOn(console, 'warn').mockImplementation();
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  test('logInfo should call console.log with the correct message', () => {
    const message = 'This is an info message';
    logInfo(message);
    expect(consoleLogSpy).toHaveBeenCalledWith(message);
  });

  test('logError should call console.error with the correct format', () => {
    const error = new Error('This is an error');
    logError(error);
    expect(consoleErrorSpy).toHaveBeenCalledWith(`[ERROR] Error: ${error.message}`);
  });

  test('logWarning should call console.warn with the correct format', () => {
    const message = 'This is a warning';
    logWarning(message);
    expect(consoleWarnSpy).toHaveBeenCalledWith(`[WARNING] ${message}`);
  });
});
