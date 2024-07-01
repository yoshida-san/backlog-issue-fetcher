export function logInfo(message: string) {
  console.log(`${message}`);
}

export function logError(message: string, error?: unknown) {
  console.error(`[ERROR] ${message}`, error);
}
