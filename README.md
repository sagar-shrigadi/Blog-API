# 📝 Blog API

A RESTful API built for a blogging platform. This project handles user authentication, post creation, commenting systems, and author permissions. Built as part of **The Odin Project** Node.js curriculum.

## 🚀 Live Demo & Client Link

- **Live API:** `[Insert Render/Heroku/Fly.io Link Here]`
- **Front-End Client Repo:** `[Insert link to your frontend repo if applicable]`

---

## 🛠️ Tech Stack

- **Runtime Environment:** Node.js
- **Framework:** Express.js
- **Database:** PostgreSQL (via Prisma ORM)
- **Authentication:** JWT
- **Environment Variables:** dotenv

---

## ✨ Features

- **Secure Authentication:** User signup and login utilizing JSON Web Tokens (JWT) for stateless session management.
- **Author vs. User Roles:** Only designated authors can create, update, or delete blog posts.
- **Interactive Comments:** Any registered user can comment on published posts.
- **Draft/Publish System:** Authors can save posts as drafts before making them public.
- **Input Validation:** Strict data sanitization and validation using `express-validator`.

---

## 🛣️ API Endpoints

### Authentication

- `POST /api/signup` - Register a new user
- `POST /api/login` - Authenticate user and receive a JWT

### Posts

- `GET /api/posts` - Get all published posts
- `GET /api/posts/:id` - Get a specific post
- `POST /api/posts` - Create a new post _(Author only)_
- `PUT /api/posts/:id` - Update a post _(Author only)_
- `DELETE /api/posts/:id` - Delete a post _(Author only)_

### Comments

- `GET /api/posts/:id/comments` - Get all comments for a post
- `POST /api/posts/:id/comments` - Add a comment _(Registered users)_
- `DELETE /api/posts/:id/comments/:commentId` - Delete a comment _(Author/Admin only)_

---

## ⚙️ Installation & Setup

1. **Clone the repository:**

   ```bash
   git clone [Your-GitHub-Repository-URL]
   cd [Your-Repository-Folder-Name]
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Set up environment variables:**
   Create a `.env` file in the root directory and add the following:

   ```env
   PORT=5000
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_super_secret_jwt_key
   ```

4. **Run the server:**
   - Development mode (with nodemon):
     ```bash
     npm run dev
     ```
   - Production mode:
     ```bash
     npm start
     ```
