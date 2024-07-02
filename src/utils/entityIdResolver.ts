import { logError } from './logger';
import { BacklogError } from './errors';

export async function getIdsFromNames<T extends { id: number; name: string }>(
  fetchFunction: (projectId: number) => Promise<T[]>,
  projectId: number,
  names: string[]
): Promise<Map<string, number>> {
  try {
    const items = await fetchFunction(projectId);
    const itemMap = new Map<string, number>();

    names.forEach((name) => {
      const item = items.find((i) => i.name === name);
      if (item) {
        itemMap.set(name, item.id);
      } else {
        logError(new BacklogError(`Item "${name}" not found`, 'ITEM_NOT_FOUND'));
      }
    });

    return itemMap;
  } catch (error) {
    logError(new BacklogError('Error fetching items', 'FETCH_ERROR', error));
    return new Map<string, number>();
  }
}