import { logError } from './logger';

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
        logError(`Item "${name}" not found`);
      }
    });

    return itemMap;
  } catch (error) {
    logError('Error fetching items:', error);
    return new Map<string, number>();
  }
}
