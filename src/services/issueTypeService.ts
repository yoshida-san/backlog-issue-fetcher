import * as backlogClient from '../api/backlogClient';
import { getIdsFromNames } from '../utils/entityIdResolver';
import { IssueType } from '../models/types';

export async function getIssueTypeIds(
  projectId: number,
  issueTypeNames?: string[]
): Promise<Map<string, number>> {
  const allIssueTypes = await backlogClient.getIssueTypes(projectId);
  
  if (!issueTypeNames || issueTypeNames.length === 0) {
    return new Map(allIssueTypes.map(type => [type.name, type.id]));
  }
  
  return getIdsFromNames<IssueType>(() => Promise.resolve(allIssueTypes), projectId, issueTypeNames);
}