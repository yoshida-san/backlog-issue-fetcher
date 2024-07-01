import { CONFIG } from '../config';
import * as projectService from './projectService';
import * as issueService from './issueService';
import { getProjectMetadata } from './projectMetadataService';
import { logInfo, logError } from '../utils/logger';
import { Issue, Project } from '../types';

async function getProjectInfo(projectName: string): Promise<Project> {
  const project = await projectService.getProjectByName(projectName);
  if (!project) {
    throw new Error(`Project "${projectName}" not found`);
  }
  return project;
}

async function fetchProjectMetadata(projectId: number) {
  const { issueTypeIds, statusIds, categoryIds } = await getProjectMetadata(projectId);
  return { issueTypeIds, statusIds, categoryIds };
}

async function fetchProjectIssues(
  projectId: number,
  issueTypeIds: number[],
  statusIds: number[],
  categoryIds: number[]
): Promise<Issue[]> {
  return await issueService.getProjectIssues(
    projectId,
    issueTypeIds,
    statusIds,
    categoryIds,
    CONFIG.UPDATED_SINCE,
    CONFIG.UPDATED_UNTIL
  );
}

function logIssueDetails(issues: Issue[]) {
  issues.forEach((issue) => {
    logInfo(
      `Issue Key: ${issue.issueKey}, Summary: ${issue.summary}, Status: ${issue.status.name}, Categories: ${issue.category ? issue.category.map((c) => c.name).join(', ') : 'None'}`
    );
  });
}

function countIssuesByType(
  issues: Issue[],
  issueTypeIds: Map<string, number>
): Map<string, number> {
  const counts = new Map<string, number>();

  issueTypeIds.forEach((id, name) => {
    const count = issues.filter((issue) => issue.issueType.id === id).length;
    counts.set(name, count);
  });

  return counts;
}

function logIssueCounts(counts: Map<string, number>) {
  logInfo('Issue counts by type:');
  counts.forEach((count, typeName) => {
    logInfo(`${typeName}: ${count}`);
  });
}

async function analyzeProjectIssues(project: Project) {
  const { issueTypeIds, statusIds, categoryIds } = await fetchProjectMetadata(project.id);

  const issues = await fetchProjectIssues(
    project.id,
    Array.from(issueTypeIds.values()),
    Array.from(statusIds.values()),
    Array.from(categoryIds.values())
  );

  logIssueDetails(issues);

  const issueCounts = countIssuesByType(issues, issueTypeIds);
  logIssueCounts(issueCounts);
}

export async function analyzeIssues() {
  try {
    const project = await getProjectInfo(CONFIG.PROJECT_NAME);
    await analyzeProjectIssues(project);
  } catch (error) {
    logError('An error occurred:', error);
    throw error;
  }
}
