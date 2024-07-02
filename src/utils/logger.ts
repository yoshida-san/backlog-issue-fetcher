export function logInfo(message: string) {
  console.log(`${message}`);
}

export function logError(error: Error) {
  console.error(`[ERROR] ${error.name}: ${error.message}`);
  if ('code' in error) console.error(`Error Code: ${error.code}`);
  if ('details' in error) console.error('Details:', error.details);
  if ('status' in error) console.error(`Status: ${error.status}`);
}

export function logWarning(message: string) {
  console.warn(`[WARNING] ${message}`);
}
