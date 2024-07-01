import * as backlogClient from '../api/backlogClient';
import { getIdsFromNames } from '../utils/entityIdResolver';
import { Status } from '../types';

export async function getStatusIds(
  projectId: number,
  statusNames: string[]
): Promise<Map<string, number>> {
  return getIdsFromNames<Status>(backlogClient.getStatuses, projectId, statusNames);
}
