# Node Projects

This repository contains the core functionality for a Node.js project, including user management, file uploads, and authentication. The aim is to provide a reusable foundation for future projects.

## Table of Contents

- [Getting Started](#getting-started)
- [Dependencies](#dependencies)
- [Middleware](#middleware)
- [Logging](#logging)
- [Error Handling](#error-handling)

## Getting Started

To get a local copy up and running, follow these steps.

### Prerequisites

- Node.js (>= 12.x)
- npm (>= 6.x)
- MySQL

### Installation

1. Clone the repository:

```
git clone https://github.com/your-username/node_projects.git
cd project_name
```

2. Install dependencies:

```
npm install
```

3. Configure the environment variables (see Environment Variables).

4. Run the database migrations:

```
npx sequelize-cli db:migrate
```

5. Creating the seeds

```
npx sequelize-cli db:seed:all
```

6. Start the server:

```
npm start
```

## Dependencies

- express
- sequelize
- mysql2
- multer
- sharp
- dotenv
- jsonwebtoken
- winston (for logging)
- nodemon

## Middleware

- uploadFile.js: Handles file uploads using multer and compresses image files using sharp.
- verifyToken.js: Verifies JWT tokens for protected routes.

## Logging

Logging is implemented using winston. Configuration can be found in core-configurations/logger-config/logger.js.

## Error Handling

All errors are caught and logged, and appropriate HTTP status codes and messages are returned to the client.
