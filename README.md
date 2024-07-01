# Backlog Issue Fetcher

## Overview
This project is a tool designed to fetch and analyze issues from a specific project in Backlog. It allows filtering of issues by type, status, and category, and retrieves issues updated within a specified time period.

## Features
- Fetch issues from a specified Backlog project
- Filter issues by type, status, and category (optional)
- Retrieve issues updated within a specified date range
- Aggregate issues by type
- Aggregate issues by status

## Prerequisites
- Node.js (version 12 or higher recommended)
- npm (comes with Node.js)

## Installation
1. Clone this repository:
```
git clone https://github.com/yourusername/backlog-issue-fetcher.git
```

2. Navigate to the project directory:
```
cd backlog-issue-fetcher
```

3. Install the required packages:
```
npm install
```

## Configuration
1. Rename the `.env.example` file to `.env`.
2. Open the `.env` file and fill in the required information:
- `API_KEY`: Your Backlog API key
- `SPACE_ID`: Your Backlog space ID
- `PROJECT_NAME`: The name of the project to analyze
- `UPDATED_SINCE`: Start date for analysis (YYYY-MM-DD format)
- `UPDATED_UNTIL`: End date for analysis (YYYY-MM-DD format)
- `ISSUE_TYPES`: Issue types to analyze (comma-separated, optional)
- `ISSUE_STATUSES`: Statuses to analyze (comma-separated, optional)
- `ISSUE_CATEGORIES`: Categories to analyze (comma-separated, optional)

## Usage
After configuration, run the following command to execute the program:
```
npm start
```

## Testing
To run the tests, use the following command:
```
npm test
```

## License
[MIT](https://choosealicense.com/licenses/mit/)
