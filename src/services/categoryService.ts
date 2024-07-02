import * as backlogClient from '../api/backlogClient';
import { getIdsFromNames } from '../utils/entityIdResolver';
import { Category } from '../models/types';

export async function getCategoryIds(
  projectId: number,
  categoryNames?: string[]
): Promise<Map<string, number>> {
  if (!categoryNames || categoryNames.length === 0) {
    return new Map<string, number>();
  }

  const allCategories = await backlogClient.getCategories(projectId);
  return getIdsFromNames<Category>(() => Promise.resolve(allCategories), projectId, categoryNames);
}
