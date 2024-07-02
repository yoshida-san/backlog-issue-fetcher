import * as backlogClient from '../api/backlogClient';
import { GetIssuesParams, Issue } from '../models/types';
import { logInfo } from '../utils/logger';

export async function getProjectIssues(params: GetIssuesParams): Promise<Issue[]> {
  try {
    let allIssues: Issue[] = [];
    let offset = 0;
    const limit = 100;

    while (true) {
      const issues = await backlogClient.getIssues({
        ...params,
        count: limit,
        offset: offset,
      });

      allIssues = allIssues.concat(issues);

      if (issues.length < limit) {
        break;
      }

      offset += limit;
      logInfo(`Retrieved ${allIssues.length} issues so far...`);
    }

    return allIssues;
  } catch (error) {
    console.error('Error fetching issues:', error);
    return [];
  }
}
