import * as backlogClient from '../api/backlogClient';
import { Issue } from '../models/types';

export async function getProjectIssues(
  projectId: number,
  issueTypeIds: number[],
  statusIds: number[],
  categoryIds: number[],
  updatedSince: string,
  updatedUntil: string
): Promise<Issue[]> {
  try {
    return await backlogClient.getIssues(
      projectId,
      issueTypeIds,
      statusIds,
      categoryIds,
      updatedSince,
      updatedUntil
    );
  } catch (error) {
    console.error('Error fetching issues:', error);
    return [];
  }
}
