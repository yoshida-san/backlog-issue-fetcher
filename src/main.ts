import { analyzeIssues } from './services/issueAnalyzer';
import { logError } from './utils/logger';
import { BacklogError, ConfigurationError, NetworkError } from './utils/errors';
import fs from 'fs';
import path from 'path';

async function main() {
  const csvDir = path.join(process.cwd(), 'csv');
  if (!fs.existsSync(csvDir)) {
    fs.mkdirSync(csvDir, { recursive: true });
  }
  try {
    await analyzeIssues();
  } catch (error) {
    if (error instanceof BacklogError) {
      logError(error);
      process.exit(1);
    } else if (error instanceof ConfigurationError) {
      logError(error);
      process.exit(2);
    } else if (error instanceof NetworkError) {
      logError(error);
      process.exit(3);
    } else {
      logError(new BacklogError('An unexpected error occurred', 'UNEXPECTED_ERROR', error));
      process.exit(4);
    }
  }
}

main();
