import { Issue } from '../models/types';
import fs from 'fs';

export function exportToCsv(issues: Issue[], filename: string): void {
  const header = 'Issue Key,Summary,Status,Categories,Last Updated,Issue Type\n';
  const rows = issues
    .map(
      (issue) =>
        `${issue.issueKey},"${issue.summary}",${issue.status.name},"${issue.category ? issue.category.map((c) => c.name).join(', ') : 'None'}",${issue.updated},${issue.issueType.name}`
    )
    .join('\n');

  const csvContent = header + rows;
  fs.writeFileSync(filename, csvContent);
}
