import dotenv from 'dotenv';
import { Config } from './models/types';

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

if (!CONFIG.API_KEY || !CONFIG.SPACE_ID || !CONFIG.PROJECT_NAME || !CONFIG.UPDATED_SINCE || !CONFIG.UPDATED_UNTIL) {
  throw new Error('必須の環境変数が設定されていません。API_KEY, SPACE_ID, PROJECT_NAME, UPDATED_SINCE, UPDATED_UNTILは必須です。');
}