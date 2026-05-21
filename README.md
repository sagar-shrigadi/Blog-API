# Blog API

A RESTful API built with Express, Prisma, and PostgreSQL that serves as the backend engine for a dual-frontend blog system (Client and Admin-only CMS).
Implemented JWT authentication and supports full CRUD operations for posts, comments, and users.

## 🔗 Links

- Live site for Client App can be found [here](https://blog-api-client.pages.dev/).
- The source code for blog-api-client can be found [here](https://github.com/sagar-shrigadi/Blog-API-Client).
- The source code for blog-api-cms (admin site) can be found [here](https://github.com/sagar-shrigadi/Blog-API-CMS).

## 🚀 Features

- A simple and flexible API that makes it easy to interact with your blog's data.
- Support for CRUD (Create, Read, Update, Delete) operations for posts, comments, and other data.
- Authentication and authorization to ensure that only authorized users have access to your data.
- Robust error handling to ensure that your data is accurate and secure.

## ⚙️ Setup Instructions

### Prerequisite

Ensure you have Node.js and a PostgreSQL instance running.

### 1. Clone the repository

```bash
git@github.com:sagar-shrigadi/Blog-API.git
cd Blog-API
```

### 2. Install dependencies

```bash
npm install
```

### 3. Environment Variables

- Create a `.env` file in the root directory and add all variables from .env.example file.
- When using a local instance of postgres ensure both of the following are the same!
- When using a cloud based db, enter the connection strings as in .env.example file.

```env
DATABASE_URL
```

and

```env
DIRECT_URL
```

### 4. Database Migrations

Run Prisma migrations to create database tables and generate the client.

```bash
npx prisma migrate dev --name init
npx prisma generate
```

### 4. Start the Server

```bash
npm start
```

## 🌐 API Endpoints

### Public Routes

#### Authentication

- `POST /api/sign-up` - Create a new user account.
- `POST /api/login` - Authenticate user and return a JWT.

#### Blog Posts

- `GET /api/posts` - Fetch all posts.
- `GET /api/posts/:postId` - Fetch a single post.

#### Comments

- `GET /api/comments/:commentId` - Fetch a comment.

### Protected Routes

#### Authentication

- `POST /api/me/:userId` - authenticate jwt token and return a user object with helpful properties about user (Protected/Admin).

#### Blog Posts

- `POST /api/posts` - Create a new post (Protected/Admin).
- `PATCH /api/posts/:postId` - Toggle publish status of a post (Protected/Admin).
- `PUT /api/posts/:postId` - Update a post (Protected/Admin).
- `DELETE /api/posts/:postId` - Delete a post (Protected/Admin).

#### Comments

- `POST /api/posts/:postId/comments` - Add a comment on a post (Protected/logged-in-user).
- `PUT /api/comments/:commentId` - Edit a comment (Protected/Admin).
- `DELETE /api/comments/:commentId` - Delete a comment (Protected/Admin).
