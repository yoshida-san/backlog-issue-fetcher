export interface Project {
  id: number;
  projectKey: string;
  name: string;
  chartEnabled: boolean;
  subtaskingEnabled: boolean;
  projectLeaderCanEditProjectLeader: boolean;
  textFormattingRule: string;
  archived: boolean;
}

export interface IssueType {
  id: number;
  projectId: number;
  name: string;
  color: string;
  displayOrder: number;
}

export interface Issue {
  id: number;
  projectId: number;
  issueKey: string;
  keyId: number;
  issueType: IssueType;
  summary: string;
  description: string;
  status: {
    id: number;
    name: string;
  };
  assignee: {
    id: number;
    name: string;
  } | null;
  category: Category[] | null;
  startDate: string | null;
  dueDate: string | null;
  estimatedHours: number | null;
  actualHours: number | null;
  createdUser: {
    id: number;
    name: string;
  };
  created: string;
  updated: string;
}

export interface Status {
  id: number;
  projectId: number;
  name: string;
  color: string;
  displayOrder: number;
}

export interface Category {
  id: number;
  name: string;
  displayOrder: number;
}

export interface Config {
  API_KEY: string;
  SPACE_ID: string;
  PROJECT_NAME: string;
  ISSUE_TYPES?: string[];
  ISSUE_STATUSES?: string[];
  ISSUE_CATEGORIES?: string[];
  UPDATED_SINCE: string;
  UPDATED_UNTIL: string;
}

export interface GetIssuesParams {
  projectId: number;
  issueTypeIds: number[];
  statusIds: number[];
  categoryIds: number[];
  updatedSince: string;
  updatedUntil: string;
}
