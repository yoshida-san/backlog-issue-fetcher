// src/services/issueTypeService.ts
import * as backlogClient from '../api/backlogClient';
import { getIdsFromNames } from '../utils/entityIdResolver';
import { IssueType } from '../models/types';

export async function getIssueTypeIds(
  projectId: number,
  issueTypeNames: string[]
): Promise<Map<string, number>> {
  return getIdsFromNames<IssueType>(backlogClient.getIssueTypes, projectId, issueTypeNames);
}
