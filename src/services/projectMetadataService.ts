import { CONFIG } from '../config';
import * as issueTypeService from './issueTypeService';
import * as statusService from './statusService';
import * as categoryService from './categoryService';
import { logInfo, logError } from '../utils/logger';

export async function getProjectMetadata(projectId: number) {
  try {
    const issueTypeIds = await issueTypeService.getIssueTypeIds(projectId, CONFIG.ISSUE_TYPES);
    if (issueTypeIds.size === 0) {
      throw new Error('Failed to get issue type IDs');
    }

    const statusIds = await statusService.getStatusIds(projectId, CONFIG.ISSUE_STATUSES);
    if (statusIds.size === 0) {
      throw new Error('Failed to get status IDs');
    }

    const categoryIds = await categoryService.getCategoryIds(projectId, CONFIG.ISSUE_CATEGORIES);
    if (categoryIds.size === 0) {
      throw new Error('Failed to get category IDs');
    }

    return { issueTypeIds, statusIds, categoryIds };
  } catch (error) {
    logError('Error in getProjectMetadata:', error);
    throw error;
  }
}
