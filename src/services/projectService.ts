import * as backlogClient from '../api/backlogClient';
import { Project } from '../models/types';
import { logError } from '../utils/logger';
import { BacklogError } from '../utils/errors';

export async function getProjectByName(projectName: string): Promise<Project | null> {
  try {
    return await backlogClient.getProject(projectName);
  } catch (error) {
    logError(
      new BacklogError(`Error fetching project "${projectName}"`, 'PROJECT_FETCH_ERROR', error)
    );
    return null;
  }
}
