import * as backlogClient from '../api/backlogClient';
import { GetIssuesParams, Issue } from '../models/types';

export async function getProjectIssues(params: GetIssuesParams): Promise<Issue[]> {
  try {
    return await backlogClient.getIssues(params);
  } catch (error) {
    console.error('Error fetching issues:', error);
    return [];
  }
}
