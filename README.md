# Result Checking System - Frontend

[![React](https://img.shields.io/badge/React-18.2.0-blue)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0.2-blue)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.3.2-blue)](https://tailwindcss.com/)

A web-based result checking system with separate dashboards for administrators and students. Built with React, TypeScript, and Tailwind CSS.

## Features

### Admin Dashboard
- Manage student results (CRUD operations)
- Add/remove students and admins
- Bulk upload results via Excel sheets
- View all student records
- Generate system reports

### Student Dashboard
- View latest result
- Check result history
- Download result sheet as PDF
- Update account information (email & password)
- Responsive design for all devices

## Project Setup

### Prerequisites
- Node.js (v18+)
- npm (v9+)
- Backend server running (see [backend repository](https://github.com/your-username/backend-repo))

### Installation
1. Clone the repository:
```bash
git clone https://github.com/danukarangith/ResultXpress-Frontend.git
cd result-checking-system-frontend
```

2.Install dependencies:
```bash
npm install
```
3.Create environment file:
```bash
cp .env.example .env
```
4.Configure environment variables (in .env):
```bash
REACT_APP_API_BASE_URL=http://localhost:5000/api
REACT_APP_JWT_SECRET=your_jwt_secret_here
```
5.Start development server:
```bash
npm start
```
## Project Structure
```bash
/src
├── assets            # Static assets
├── components        # Reusable components
├── context           # Auth context
├── hooks             # Custom hooks
├── layouts           # Page layouts
├── pages
│   ├── Admin         # Admin dashboard pages
│   ├── Student       # Student dashboard pages
│   ├── Auth          # Authentication pages
│   └── Shared        # Shared pages
├── types             # TypeScript types
├── utils             # Utility functions
└── App.tsx           # Main application component
```

## Available Scripts
- npm start: Runs the app in development mode

- npm build: Builds for production

- npm test: Launches test runner

- npm lint: Runs ESLint

- npm preview: Preview production build

# Technologies Used
## Frontend:

- React 18

- TypeScript

- Tailwind CSS

- Axios (HTTP client)

- react-router-dom (Routing)

- react-toastify (Notifications)

- xlsx (Excel parsing)

  ## Libraries Used
- React
- Chart.js
- Lucide React
- Vite

## Backend:

- Node.js

- Express.js

- JWT Authentication

- MySql (Database)

- prisma (ORM)

## API Integration
 -  All API endpoints require JWT authentication. The frontend automatically:

 -  Attaches JWT to request headers

 -  Handles token refresh

 -  Manages authentication state


