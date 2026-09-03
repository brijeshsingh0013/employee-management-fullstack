# PeopleDesk — Employee Management Full Stack

A clean CRUD application built to demonstrate full-stack Java development. The Spring Boot REST API stores employee records in MySQL, while the React dashboard provides search, create, update and delete workflows.

## Tech stack

- Java 17 and Spring Boot 4
- Spring Web, Spring Data JPA and Bean Validation
- MySQL
- React 19 and Vite
- RESTful APIs and RFC 9457-style error responses

## Features

- Add, view, edit and delete employees
- Search by employee name or department
- Server-side validation and duplicate-email handling
- Environment-based database configuration
- Responsive dashboard with team statistics
- Layered backend architecture: controller, service and repository

## Project structure

```text
employee-management-fullstack/
├── backend/     Spring Boot REST API
└── frontend/    React + Vite dashboard
```

## Run locally

### 1. Database

Create a MySQL database (the default URL can also create it automatically):

```sql
CREATE DATABASE employee_manager;
```

Set your credentials if they differ from the defaults:

```bash
export DB_USERNAME=root
export DB_PASSWORD=your_password
```

### 2. Backend

```bash
cd backend
mvn spring-boot:run
```

The API will be available at `http://localhost:8080/api/employees`.

### 3. Frontend

```bash
cd frontend
npm install
npm run dev
```

Open `http://localhost:5173`.

## API endpoints

| Method | Endpoint | Purpose |
|---|---|---|
| GET | `/api/employees` | List employees |
| GET | `/api/employees?query=engineering` | Search employees |
| GET | `/api/employees/{id}` | Get one employee |
| POST | `/api/employees` | Create an employee |
| PUT | `/api/employees/{id}` | Update an employee |
| DELETE | `/api/employees/{id}` | Delete an employee |

## Author

**Brijesh Kumar Singh** — MCA Graduate and Java Developer

