import { Issue } from '../models/types';
import fs from 'fs';

export function exportToCsv(issues: Issue[], filename: string): void {
  const header = 'Issue Key,Summary,Categories,Status,Issue Type,Last Updated\n';
  const rows = issues
    .map(
      (issue) =>
        `${issue.issueKey},"${issue.summary}","${issue.category ? issue.category.map((c) => c.name).join(', ') : 'None'}",${issue.status.name},${issue.issueType.name},${issue.updated}`
    )
    .join('\n');

  const csvContent = header + rows;
  fs.writeFileSync(filename, csvContent);
}
