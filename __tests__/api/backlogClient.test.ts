import axios from 'axios';
import * as types from '../../src/models/types';
import MockAdapter from 'axios-mock-adapter';
import { CONFIG } from '../../src/config';
import * as backlogClient from '../../src/api/backlogClient';

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

    it('throws an error when a project is not found', async () => {
      mock.onGet(`${baseUrl}/projects/${projectName}`).reply(404);
      await expect(backlogClient.getProject(projectName)).rejects.toThrow('Project not found');
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

    it('handles error when fetching issue types fails', async () => {
      mock.onGet(`${baseUrl}/projects/${projectId}/issueTypes`).reply(404);
      await expect(backlogClient.getIssueTypes(projectId)).rejects.toThrow('Project not found');
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

    it('handles error when fetching statuses fails', async () => {
      mock.onGet(`${baseUrl}/projects/${projectId}/statuses`).reply(404);
      await expect(backlogClient.getStatuses(projectId)).rejects.toThrow(
        'Request failed with status code 404'
      );
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
      const statuses = await backlogClient.getCategories(projectId);
      expect(statuses).toEqual(mockCategories);
    });

    it('handles error when fetching categories fails', async () => {
      mock.onGet(`${baseUrl}/projects/${projectId}/categories`).reply(404);
      await expect(backlogClient.getCategories(projectId)).rejects.toThrow(
        'Request failed with status code 404'
      );
    });
  });

  describe('getIssues', () => {
    const apiPrams = {};
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
      {
        id: 2,
        projectId: 1,
        issueKey: 'TST-2',
        keyId: 1,
        issueType: {
          id: 2,
          projectId: 1,
          name: 'Done',
          color: '#868cb7',
          displayOrder: 1,
        },
        summary: 'issue summary',
        description: 'issue description',
        status: {
          id: 1,
          name: 'Task',
        },
        created: '2023-07-08T10:24:28Z',
        updated: '2023-08-09T11:25:29Z',
        assignee: null,
        category: null,
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
      const statuses = await backlogClient.getIssues(
        1,
        [1, 2],
        [1],
        [1],
        '2023-01-01',
        '2024-12-31'
      );
      expect(statuses).toEqual(mockIssues);
    });

    it('handles error when fetching issues fails', async () => {
      mock.onGet(`${baseUrl}/issues`).reply(404);
      await expect(
        backlogClient.getIssues(1, [1, 2], [1], [1], '2023-01-01', '2024-12-31')
      ).rejects.toThrow('Request failed with status code 404');
    });
  });
});
