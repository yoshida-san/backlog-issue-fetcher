import axios from 'axios';
import * as types from '../../src/models/types';
import MockAdapter from 'axios-mock-adapter';
import { CONFIG } from '../../src/config';
import * as backlogClient from '../../src/api/backlogClient';
import { BacklogError, NetworkError } from '../../src/utils/errors';

describe('BacklogClient', () => {
  const baseUrl = `https://${CONFIG.SPACE_ID}.backlog.jp/api/v2`;
  const mock = new MockAdapter(axios);

  beforeEach(() => {
    mock.reset();
  });

  describe('getProject', () => {
    const projectName = 'testProject';
    const mockProjectData: types.Project = {
      id: 1,
      projectKey: 'myProject',
      name: 'testProject',
      chartEnabled: true,
      subtaskingEnabled: true,
      projectLeaderCanEditProjectLeader: true,
      textFormattingRule: '',
      archived: false,
    };

    it('returns a project when a project is found', async () => {
      mock.onGet(`${baseUrl}/projects/${projectName}`).reply(200, mockProjectData);
      const project = await backlogClient.getProject(projectName);
      expect(project).toEqual(mockProjectData);
    });

    it('throws BacklogError when a project is not found', async () => {
      mock.onGet(`${baseUrl}/projects/${projectName}`).reply(404);
      await expect(backlogClient.getProject(projectName)).rejects.toThrow(BacklogError);
    });

    it('throws NetworkError on network issues', async () => {
      mock.onGet(`${baseUrl}/projects/${projectName}`).networkError();
      await expect(backlogClient.getProject(projectName)).rejects.toThrow(NetworkError);
    });
  });

  describe('getIssueTypes', () => {
    const projectId = 1;
    const mockIssueTypes: types.IssueType[] = [
      { id: 1, projectId: 1, name: 'Bug', color: '#ea2c00', displayOrder: 0 },
      { id: 2, projectId: 1, name: 'Feature', color: '#e87758', displayOrder: 0 },
    ];

    it('fetches issue types successfully', async () => {
      mock.onGet(`${baseUrl}/projects/${projectId}/issueTypes`).reply(200, mockIssueTypes);
      const issueTypes = await backlogClient.getIssueTypes(projectId);
      expect(issueTypes).toEqual(mockIssueTypes);
    });

    it('throws BacklogError when project is not found', async () => {
      mock.onGet(`${baseUrl}/projects/${projectId}/issueTypes`).reply(404);
      await expect(backlogClient.getIssueTypes(projectId)).rejects.toThrow(BacklogError);
    });

    it('throws NetworkError on network issues', async () => {
      mock.onGet(`${baseUrl}/projects/${projectId}/issueTypes`).networkError();
      await expect(backlogClient.getIssueTypes(projectId)).rejects.toThrow(NetworkError);
    });
  });

  describe('getStatuses', () => {
    const projectId = 1;
    const mockStatuses: types.Status[] = [
      {
        id: 1,
        projectId: 1,
        name: 'In Progress',
        color: '#e07b9a',
        displayOrder: 0,
      },
      {
        id: 2,
        projectId: 1,
        name: 'Done',
        color: '#868cb7',
        displayOrder: 1,
      },
    ];

    it('fetches statuses successfully', async () => {
      mock.onGet(`${baseUrl}/projects/${projectId}/statuses`).reply(200, mockStatuses);
      const statuses = await backlogClient.getStatuses(projectId);
      expect(statuses).toEqual(mockStatuses);
    });

    it('throws BacklogError when project is not found', async () => {
      mock.onGet(`${baseUrl}/projects/${projectId}/statuses`).reply(404);
      await expect(backlogClient.getStatuses(projectId)).rejects.toThrow(BacklogError);
    });

    it('throws NetworkError on network issues', async () => {
      mock.onGet(`${baseUrl}/projects/${projectId}/statuses`).networkError();
      await expect(backlogClient.getStatuses(projectId)).rejects.toThrow(NetworkError);
    });
  });

  describe('getCategories', () => {
    const projectId = 1;
    const mockCategories: types.Category[] = [
      {
        id: 1,
        name: 'Task',
        displayOrder: 0,
      },
      {
        id: 2,
        name: 'Bug',
        displayOrder: 1,
      },
    ];

    it('fetches categories successfully', async () => {
      mock.onGet(`${baseUrl}/projects/${projectId}/categories`).reply(200, mockCategories);
      const categories = await backlogClient.getCategories(projectId);
      expect(categories).toEqual(mockCategories);
    });

    it('throws BacklogError when project is not found', async () => {
      mock.onGet(`${baseUrl}/projects/${projectId}/categories`).reply(404);
      await expect(backlogClient.getCategories(projectId)).rejects.toThrow(BacklogError);
    });

    it('throws NetworkError on network issues', async () => {
      mock.onGet(`${baseUrl}/projects/${projectId}/categories`).networkError();
      await expect(backlogClient.getCategories(projectId)).rejects.toThrow(NetworkError);
    });
  });

  describe('getIssues', () => {
    const params: types.GetIssuesParams = {
      projectId: 1,
      issueTypeIds: [1, 2],
      statusIds: [1],
      categoryIds: [1],
      updatedSince: '2023-01-01',
      updatedUntil: '2024-12-31',
    };
    const mockIssues: types.Issue[] = [
      {
        id: 1,
        projectId: 1,
        issueKey: 'TST-1',
        keyId: 1,
        issueType: {
          id: 1,
          projectId: 1,
          name: 'In Progress',
          color: '#e07b9a',
          displayOrder: 0,
        },
        summary: 'issue summary',
        description: 'issue description',
        status: {
          id: 1,
          name: 'Task',
        },
        created: '2024-07-08T10:24:28Z',
        updated: '2024-08-09T11:25:29Z',
        assignee: null,
        category: [],
        startDate: null,
        dueDate: null,
        estimatedHours: null,
        actualHours: null,
        createdUser: {
          id: 1,
          name: 'John Smith',
        },
      },
    ];

    it('fetches issues successfully', async () => {
      mock.onGet(`${baseUrl}/issues`).reply(200, mockIssues);
      const issues = await backlogClient.getIssues(params);
      expect(issues).toEqual(mockIssues);
    });

    it('throws NetworkError on request failure', async () => {
      mock.onGet(`${baseUrl}/issues`).reply(500);
      await expect(backlogClient.getIssues(params)).rejects.toThrow(NetworkError);
    });

    it('throws NetworkError on network issues', async () => {
      mock.onGet(`${baseUrl}/issues`).networkError();
      await expect(backlogClient.getIssues(params)).rejects.toThrow(NetworkError);
    });
  });
});
