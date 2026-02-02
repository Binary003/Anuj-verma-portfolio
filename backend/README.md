# Portfolio Backend API

A MERN stack backend for managing your portfolio website content.

## Features

- 🔐 **Admin Authentication** - JWT-based secure login
- 📁 **Projects Management** - CRUD operations for portfolio projects
- 🛠️ **Skills Management** - CRUD operations for skills
- 📧 **Contact Messages** - Receive and manage contact form submissions
- 📤 **Image Upload** - Upload project images with Multer

## Setup

### 1. Install Dependencies

```bash
cd backend
npm install
```

### 2. Configure Environment

Copy the example environment file and update with your values:

```bash
cp .env.example .env
```

Edit `.env` with your settings:

- `MONGODB_URI` - Your MongoDB connection string
- `JWT_SECRET` - A secure secret key for JWT tokens
- `PORT` - Server port (default: 5000)
- `FRONTEND_URL` - Your frontend URL for CORS

### 3. Run the Server

```bash
# Development (with hot reload)
npm run dev

# Production
npm start
```

## API Endpoints

### Authentication

| Method | Endpoint             | Description               | Access  |
| ------ | -------------------- | ------------------------- | ------- |
| POST   | `/api/auth/register` | Register admin (use once) | Public  |
| POST   | `/api/auth/login`    | Login admin               | Public  |
| GET    | `/api/auth/me`       | Get admin profile         | Private |

### Projects

| Method | Endpoint            | Description        | Access  |
| ------ | ------------------- | ------------------ | ------- |
| GET    | `/api/projects`     | Get all projects   | Public  |
| GET    | `/api/projects/:id` | Get single project | Public  |
| POST   | `/api/projects`     | Create project     | Private |
| PUT    | `/api/projects/:id` | Update project     | Private |
| DELETE | `/api/projects/:id` | Delete project     | Private |

### Skills

| Method | Endpoint                         | Description            | Access  |
| ------ | -------------------------------- | ---------------------- | ------- |
| GET    | `/api/skills`                    | Get all skills         | Public  |
| GET    | `/api/skills/category/:category` | Get skills by category | Public  |
| GET    | `/api/skills/:id`                | Get single skill       | Public  |
| POST   | `/api/skills`                    | Create skill           | Private |
| PUT    | `/api/skills/:id`                | Update skill           | Private |
| DELETE | `/api/skills/:id`                | Delete skill           | Private |

### Contact

| Method | Endpoint                | Description         | Access  |
| ------ | ----------------------- | ------------------- | ------- |
| POST   | `/api/contact`          | Submit contact form | Public  |
| GET    | `/api/contact`          | Get all messages    | Private |
| GET    | `/api/contact/:id`      | Get single message  | Private |
| PUT    | `/api/contact/:id/read` | Mark as read        | Private |
| DELETE | `/api/contact/:id`      | Delete message      | Private |

## Usage Examples

### Register Admin (do this first!)

```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"username": "admin", "email": "admin@example.com", "password": "yourpassword"}'
```

### Login

```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email": "admin@example.com", "password": "yourpassword"}'
```

### Create Project (with auth token)

```bash
curl -X POST http://localhost:5000/api/projects \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -F "title=My Project" \
  -F "description=Project description" \
  -F "technologies=React,Node.js,MongoDB" \
  -F "githubUrl=https://github.com/username/repo" \
  -F "liveUrl=https://myproject.com" \
  -F "image=@/path/to/image.jpg"
```

### Create Skill

```bash
curl -X POST http://localhost:5000/api/skills \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"name": "React", "category": "frontend", "proficiency": 90}'
```

## Skill Categories

- `frontend` - Frontend technologies
- `backend` - Backend technologies
- `database` - Databases
- `tools` - Development tools
- `other` - Other skills

## Folder Structure

```
backend/
├── controllers/      # Route controllers
├── middleware/       # Auth & upload middleware
├── models/          # Mongoose models
├── routes/          # API routes
├── uploads/         # Uploaded images
├── .env.example     # Environment template
├── package.json
├── README.md
└── server.js        # Entry point
```
