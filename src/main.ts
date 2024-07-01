import { analyzeIssues } from './services/issueAnalyzer';
import { logError } from './utils/logger';

async function main() {
  try {
    await analyzeIssues();
  } catch (error) {
    logError('An error occurred in main:', error);
    process.exit(1);
  }
}

main();
