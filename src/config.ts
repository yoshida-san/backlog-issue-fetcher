import dotenv from 'dotenv';
import { Config } from './models/types';
import { ConfigurationError } from './utils/errors';

dotenv.config();

export const CONFIG: Config = {
  API_KEY: process.env.API_KEY || '',
  SPACE_ID: process.env.SPACE_ID || '',
  PROJECT_NAME: process.env.PROJECT_NAME || '',
  ISSUE_TYPES: process.env.ISSUE_TYPES ? process.env.ISSUE_TYPES.split(',') : [],
  ISSUE_STATUSES: process.env.ISSUE_STATUSES ? process.env.ISSUE_STATUSES.split(',') : [],
  ISSUE_CATEGORIES: process.env.ISSUE_CATEGORIES ? process.env.ISSUE_CATEGORIES.split(',') : [],
  UPDATED_SINCE: process.env.UPDATED_SINCE || '',
  UPDATED_UNTIL: process.env.UPDATED_UNTIL || '',
};

const requiredParams = ['API_KEY', 'SPACE_ID', 'PROJECT_NAME', 'UPDATED_SINCE', 'UPDATED_UNTIL'];
const missingParams = requiredParams.filter((param) => !CONFIG[param as keyof Config]);

if (missingParams.length > 0) {
  throw new ConfigurationError(
    `Missing required environment variables: ${missingParams.join(', ')}`
  );
}
