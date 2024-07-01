import axios from 'axios';
import { CONFIG } from '../config';
import { Project, IssueType, Issue, Status, Category } from '../models/types';

const baseUrl = `https://${CONFIG.SPACE_ID}.backlog.jp/api/v2`;

export async function getProject(projectName: string): Promise<Project> {
  try {
    const response = await axios.get(`${baseUrl}/projects/${projectName}`, {
      params: { apiKey: CONFIG.API_KEY },
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response?.status === 404) {
      throw new Error('Project not found');
    }
    throw error;
  }
}

export async function getIssueTypes(projectId: number): Promise<IssueType[]> {
  try {
    const response = await axios.get(`${baseUrl}/projects/${projectId}/issueTypes`, {
      params: { apiKey: CONFIG.API_KEY },
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response?.status === 404) {
      throw new Error('Project not found');
    }
    throw error;
  }
}

export async function getIssues(
  projectId: number,
  issueTypeIds: number[],
  statusIds: number[],
  categoryIds: number[],
  updatedSince: string,
  updatedUntil: string
): Promise<Issue[]> {
  try {
    const response = await axios.get(`${baseUrl}/issues`, {
      params: {
        apiKey: CONFIG.API_KEY,
        projectId: [projectId],
        issueTypeId: issueTypeIds,
        statusId: statusIds,
        categoryId: categoryIds,
        updatedSince: updatedSince,
        updatedUntil: updatedUntil,
        count: 100,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching issues:', error);
    throw error;
  }
}

export async function getStatuses(projectId: number): Promise<Status[]> {
  const response = await axios.get(`${baseUrl}/projects/${projectId}/statuses`, {
    params: { apiKey: CONFIG.API_KEY },
  });
  return response.data;
}

export async function getCategories(projectId: number): Promise<Category[]> {
  try {
    const response = await axios.get(`${baseUrl}/projects/${projectId}/categories`, {
      params: { apiKey: CONFIG.API_KEY },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching categories:', error);
    throw error;
  }
}
