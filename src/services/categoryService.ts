import * as backlogClient from '../api/backlogClient';
import { getIdsFromNames } from '../utils/entityIdResolver';
import { Category } from '../models/types';

export async function getCategoryIds(
  projectId: number,
  categoryNames: string[]
): Promise<Map<string, number>> {
  return getIdsFromNames<Category>(backlogClient.getCategories, projectId, categoryNames);
}
