import * as backlogClient from '../api/backlogClient';
import { Project } from '../models/types';
import { logError } from '../utils/logger';

export async function getProjectByName(projectName: string): Promise<Project | null> {
  try {
    return await backlogClient.getProject(projectName);
  } catch (error) {
    logError(`Error fetching project "${projectName}":`, error);
    return null;
  }
}
