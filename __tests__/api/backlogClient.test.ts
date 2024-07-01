import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { CONFIG } from '../../src/config';
import { getProject } from '../../src/api/backlogClient';

describe('getProject', () => {
  const mock = new MockAdapter(axios);
  const projectName = 'testProject';
  const mockProjectData = { id: 1, name: 'testProject' };

  beforeEach(() => {
    mock.reset();
  });

  it('returns a project when a project is found', async () => {
    mock.onGet(`https://${CONFIG.SPACE_ID}.backlog.jp/api/v2/projects/${projectName}`).reply(200, mockProjectData);
    const project = await getProject(projectName);
    expect(project).toEqual(mockProjectData);
  });

  it('throws an error when a project is not found', async () => {
    mock.onGet(`https://${CONFIG.SPACE_ID}.backlog.jp/api/v2/projects/${projectName}`).reply(404);
    await expect(getProject(projectName)).rejects.toThrow('Project not found');
  });
});