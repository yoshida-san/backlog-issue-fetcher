import { CONFIG } from '../config';
import * as issueTypeService from './issueTypeService';
import * as statusService from './statusService';
import * as categoryService from './categoryService';
import { logError } from '../utils/logger';
import { BacklogError } from '../utils/errors';

export async function getProjectMetadata(projectId: number) {
  try {
    const issueTypeIds = await issueTypeService.getIssueTypeIds(projectId, CONFIG.ISSUE_TYPES);
    if (issueTypeIds.size === 0) {
      throw new BacklogError('Failed to get issue type IDs', 'ISSUE_TYPE_FETCH_ERROR');
    }

    const statusIds = await statusService.getStatusIds(projectId, CONFIG.ISSUE_STATUSES);
    if (statusIds.size === 0) {
      throw new BacklogError('Failed to get status IDs', 'STATUS_FETCH_ERROR');
    }

    const categoryIds = await categoryService.getCategoryIds(projectId, CONFIG.ISSUE_CATEGORIES);
    if (categoryIds.size === 0) {
      throw new BacklogError('Failed to get category IDs', 'CATEGORY_FETCH_ERROR');
    }

    return { issueTypeIds, statusIds, categoryIds };
  } catch (error) {
    if (error instanceof Error) {
      logError(error);
    } else {
      logError(new BacklogError('An unknown error occurred', 'UNKNOWN_ERROR'));
    }
    throw error;
  }
}
