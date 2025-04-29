# Task Tracker Application

A modern responsive web application to track tasks and projects with proper user authentication, task management, and project tracking.

## Features

- **User Management**
  - Sign-up with email, password, name, and country
  - Login with JWT authentication
  - User profile management

- **Project Management**
  - Create up to 4 projects per user
  - View all user projects
  - Switch between projects

- **Task Management**
  - Create tasks with title and description
  - Update task details
  - Track task status (Not Started, In Progress, Completed)
  - Delete tasks
  - Search for tasks

- **Security**
  - JWT Authentication
  - Protected routes
  - Encrypted passwords with bcrypt
  - Authorization checks for all operations

## Technology Stack

### Backend
- **Node.js** with **Express.js** framework
- **MongoDB** database
- **Mongoose** ODM
- **JWT** for authentication
- **Bcrypt** for password hashing

### Frontend
- **React** for UI components
- **React Router** for routing
- **Axios** for API requests
- **Tailwind CSS** for styling

## Getting Started

### Prerequisites
- Node.js (v14+)
- MongoDB (local instance or MongoDB Atlas)

### Installation

#### Backend Setup
1. Navigate to the backend directory:
   ```
   cd task-tracker-backend
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Create a `.env` file with the following variables:
   ```
   PORT=5000
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_secret_key
   ```

4. Start the server:
   ```
   npm start
   ```

#### Frontend Setup
1. Navigate to the frontend directory:
   ```
   cd task-tracker-frontend
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Start the development server:
   ```
   npm run dev
   ```

## Project Structure

### Backend
```
task-tracker-backend/
├── config/
│   └── db.js
├── controllers/
│   ├── authController.js
│   ├── projectController.js
│   └── taskController.js
├── middlewares/
│   └── authMiddleware.js
├── models/
│   ├── Project.js
│   ├── Task.js
│   └── User.js
├── routes/
│   ├── authRoutes.js
│   ├── projectRoutes.js
│   └── taskRoutes.js
├── .env
└── server.js
```

### Frontend
```
task-tracker-frontend/
├── public/
├── src/
│   ├── components/
│   │   ├── Header.jsx
│   │   ├── Logo.jsx
│   │   ├── ProjectSidebar.jsx
│   │   └── TaskCard.jsx
│   ├── pages/
│   │   ├── Dashboard.jsx
│   │   ├── Login.jsx
│   │   └── Signup.jsx
│   ├── utils/
│   │   ├── api.js
│   │   └── countryList.js
│   ├── App.jsx
│   └── main.jsx
└── index.html
```

## API Endpoints

### Authentication
- `POST /api/auth/signup` - Register a new user
- `POST /api/auth/login` - Login
