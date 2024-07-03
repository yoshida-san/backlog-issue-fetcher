import { Issue } from '../models/types';
import fs from 'fs';
import path from 'path';

export function exportToCsv(issues: Issue[]): void {
  const header = 'Issue Key,Summary,Categories,Status,Issue Type,Last Updated\n';
  const rows = issues
    .map(
      (issue) =>
        `${issue.issueKey},"${issue.summary}","${issue.category ? issue.category.map((c) => c.name).join(', ') : 'None'}",${issue.status.name},${issue.issueType.name},${issue.updated}`
    )
    .join('\n');

  const csvContent = header + rows;

  const now = new Date();
  const timestamp =
    now.getFullYear() +
    ('0' + (now.getMonth() + 1)).slice(-2) +
    ('0' + now.getDate()).slice(-2) +
    ('0' + now.getHours()).slice(-2) +
    ('0' + now.getMinutes()).slice(-2) +
    ('0' + now.getSeconds()).slice(-2);

  const csvDir = path.join(process.cwd(), 'csv');
  if (!fs.existsSync(csvDir)) {
    fs.mkdirSync(csvDir, { recursive: true });
  }

  const filename = path.join(csvDir, `issues_list_${timestamp}.csv`);

  fs.writeFileSync(filename, csvContent);

  console.log(`\nIssues list has been exported to ${filename}`);
}
