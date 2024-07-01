export function logInfo(message: string) {
  console.log(`[INFO] ${message}`);
}

export function logError(message: string, error?: unknown) {
  console.error(`[ERROR] ${message}`, error);
}
