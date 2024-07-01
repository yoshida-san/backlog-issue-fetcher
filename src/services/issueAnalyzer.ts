import { CONFIG } from '../config';
import * as projectService from './projectService';
import * as issueService from './issueService';
import * as issueTypeService from './issueTypeService';
import * as statusService from './statusService';
import * as categoryService from './categoryService';
import { logInfo, logError } from '../utils/logger';
import { Issue, Project, GetIssuesParams } from '../models/types';

async function getProjectInfo(projectName: string): Promise<Project> {
  const project = await projectService.getProjectByName(projectName);
  if (!project) {
    throw new Error(`Project "${projectName}" not found`);
  }
  return project;
}

async function fetchProjectMetadata(projectId: number) {
  const issueTypeIds = await issueTypeService.getIssueTypeIds(projectId, CONFIG.ISSUE_TYPES);
  const statusIds = await statusService.getStatusIds(projectId, CONFIG.ISSUE_STATUSES);
  const categoryIds = await categoryService.getCategoryIds(projectId, CONFIG.ISSUE_CATEGORIES);

  return { issueTypeIds, statusIds, categoryIds };
}

async function fetchProjectIssues(params: GetIssuesParams): Promise<Issue[]> {
  return await issueService.getProjectIssues(params);
}

function logIssueDetails(issues: Issue[]) {
  logInfo('\nIssue List:');
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

function countIssuesByStatus(
  issues: Issue[],
  statusIds: Map<string, number>
): Map<string, number> {
  const counts = new Map<string, number>();

  statusIds.forEach((id, name) => {
    const count = issues.filter((issue) => issue.status.id === id).length;
    counts.set(name, count);
  });

  return counts;
}

function logIssueCounts(counts: Map<string, number>) {
  logInfo('\nIssue counts by type:');
  counts.forEach((count, typeName) => {
    logInfo(`${typeName}: ${count}`);
  });
}

function logStatusCounts(counts: Map<string, number>) {
  logInfo('\nIssue counts by status:');
  counts.forEach((count, statusName) => {
    logInfo(`${statusName}: ${count}`);
  });
}

async function analyzeProjectIssues(project: Project) {
  const { issueTypeIds, statusIds, categoryIds } = await fetchProjectMetadata(project.id);

  const params: GetIssuesParams = {
    projectId: project.id,
    issueTypeIds: Array.from(issueTypeIds.values()),
    statusIds: Array.from(statusIds.values()),
    categoryIds: Array.from(categoryIds.values()),
    updatedSince: CONFIG.UPDATED_SINCE,
    updatedUntil: CONFIG.UPDATED_UNTIL,
  };

  const issues = await fetchProjectIssues(params);

  logIssueDetails(issues);

  const issueCounts = countIssuesByType(issues, issueTypeIds);
  logIssueCounts(issueCounts);

  const statusCounts = countIssuesByStatus(issues, statusIds);
  logStatusCounts(statusCounts);
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