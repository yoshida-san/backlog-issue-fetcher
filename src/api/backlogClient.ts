import axios from 'axios';
import { CONFIG } from '../config';
import { Project, IssueType, Issue, Status, Category, GetIssuesParams } from '../models/types';
import { BacklogError, NetworkError } from '../utils/errors';

const baseUrl = `https://${CONFIG.SPACE_ID}.backlog.jp/api/v2`;

export async function getProject(projectName: string): Promise<Project> {
  try {
    const response = await axios.get(`${baseUrl}/projects/${projectName}`, {
      params: { apiKey: CONFIG.API_KEY },
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 404) {
        throw new BacklogError(`Project "${projectName}" not found`, 'PROJECT_NOT_FOUND');
      }
      throw new NetworkError(`Failed to fetch project: ${error.message}`, error.response?.status);
    }
    throw new BacklogError('Unknown error occurred while fetching project', 'UNKNOWN_ERROR', error);
  }
}

export async function getIssueTypes(projectId: number): Promise<IssueType[]> {
  try {
    const response = await axios.get(`${baseUrl}/projects/${projectId}/issueTypes`, {
      params: { apiKey: CONFIG.API_KEY },
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 404) {
        throw new BacklogError(`Project with ID ${projectId} not found`, 'PROJECT_NOT_FOUND');
      }
      throw new NetworkError(
        `Failed to fetch issue types: ${error.message}`,
        error.response?.status
      );
    }
    throw new BacklogError(
      'Unknown error occurred while fetching issue types',
      'UNKNOWN_ERROR',
      error
    );
  }
}

export async function getIssues(
  params: GetIssuesParams & { count?: number; offset?: number }
): Promise<Issue[]> {
  try {
    const response = await axios.get(`${baseUrl}/issues`, {
      params: {
        apiKey: CONFIG.API_KEY,
        projectId: [params.projectId],
        issueTypeId: params.issueTypeIds,
        statusId: params.statusIds,
        categoryId: params.categoryIds,
        updatedSince: params.updatedSince,
        updatedUntil: params.updatedUntil,
        count: params.count || 100,
        offset: params.offset || 0,
      },
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new NetworkError(`Failed to fetch issues: ${error.message}`, error.response?.status);
    }
    throw new BacklogError('Unknown error occurred while fetching issues', 'UNKNOWN_ERROR', error);
  }
}

export async function getStatuses(projectId: number): Promise<Status[]> {
  try {
    const response = await axios.get(`${baseUrl}/projects/${projectId}/statuses`, {
      params: { apiKey: CONFIG.API_KEY },
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 404) {
        throw new BacklogError(`Project with ID ${projectId} not found`, 'PROJECT_NOT_FOUND');
      }
      throw new NetworkError(`Failed to fetch statuses: ${error.message}`, error.response?.status);
    }
    throw new BacklogError(
      'Unknown error occurred while fetching statuses',
      'UNKNOWN_ERROR',
      error
    );
  }
}

export async function getCategories(projectId: number): Promise<Category[]> {
  try {
    const response = await axios.get(`${baseUrl}/projects/${projectId}/categories`, {
      params: { apiKey: CONFIG.API_KEY },
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 404) {
        throw new BacklogError(`Project with ID ${projectId} not found`, 'PROJECT_NOT_FOUND');
      }
      throw new NetworkError(
        `Failed to fetch categories: ${error.message}`,
        error.response?.status
      );
    }
    throw new BacklogError(
      'Unknown error occurred while fetching categories',
      'UNKNOWN_ERROR',
      error
    );
  }
}
