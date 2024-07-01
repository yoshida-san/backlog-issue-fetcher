import * as backlogClient from '../api/backlogClient';
import { getIdsFromNames } from '../utils/entityIdResolver';
import { Status } from '../models/types';

export async function getStatusIds(
  projectId: number,
  statusNames?: string[]
): Promise<Map<string, number>> {
  const allStatuses = await backlogClient.getStatuses(projectId);
  
  if (!statusNames || statusNames.length === 0) {
    return new Map(allStatuses.map(status => [status.name, status.id]));
  }
  
  return getIdsFromNames<Status>(() => Promise.resolve(allStatuses), projectId, statusNames);
}