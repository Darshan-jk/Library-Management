# 📚 Library Management System

A full-stack Library Management System built using React + Spring Boot + PostgreSQL.

The application allows users to manage books, members, and book issue/return operations through a simple web interface.

## 🌐 Live Demo
Frontend

## 🔗 [Open Library Management System](https://library-management-sigma-umber.vercel.app/)

## Backend API

🔗 Spring Boot API

## 🚀 Features

## 📖 Book Management

* View all books

* Add books

* Update books

* Delete books

* Track book quantity

## 👥 Member Management

* View all members

* Add members

* Update members

* Delete members

## 🔄 Issue Management

* View issued books

* Issue a book to a member

* Return a book

* Track issue date

* Track return date

* Track issue status

## 📊 Dashboard

* Library overview

* Total books

* Total members

* Issue information

## 🛠️ Technologies Used
## Frontend

* React

* JavaScript

* React Router

* Axios

* CSS

* Vite

## Backend

* Java

* Spring Boot

* Spring Data JPA

* Hibernate

* REST API

* Maven

## Database

* PostgreSQL

## Deployment

 Vercel — Frontend

Render — Backend

Render PostgreSQL — Database
## 📁 Project Structure
    library-management/
    │
    ├── backend/
    │   ├── Dockerfile
    │   ├── pom.xml
    │   └── src/
    │       └── main/
    │           ├── java/
    │           │   └── com/project/library/
    │           │       ├── controller/
    │           │       ├── entity/
    │           │       ├── repository/
    │           │       └── service/
    │           │
    │           └── resources/
    │               └── application.properties
    │
    ├── frontend/
    │   ├── package.json
    │   ├── vite.config.js
    │   ├── index.html
    │   └── src/
    │       ├── App.jsx
    │       ├── main.jsx
    │       ├── index.css
    │       ├── pages/
    │       │   ├── Dashboard.jsx
    │       │   ├── Books.jsx
    │       │   ├── Members.jsx
    │       │   └── Issues.jsx
    │       └── services/
    │           └── api.js
    │
    ├── .gitignore
    └── README.md

## 🔗 REST API Endpoints
```bash
      Books:
      Method	          Endpoint	          Description
      GET	          /api/books	          Get all books
      GET          	/api/books/{id}	     Get book by ID
      POST          /api/books	          Add a book
      PUT          	/api/books/{id}	     Update a book
      DELETE        /api/books/{id}	     Delete a book
      
      Members:
      Method	          Endpoint	          Description
      GET	          /api/members	        Get all members
      GET	          /api/members/{id}	   Get member by ID
      POST	         /api/members        	Add a member
      PUT	          /api/members/{id}   	Update a member
      DELETE       	/api/members/{id}	   Delete a member
      
      Issues:
      Method	                    Endpoint	                             Description
      GET	          /api/issues          	                            Get all issues
      POST	         /api/issues/book/{bookId}/member/{memberId}	      Issue a book
      PUT	          /api/issues/return/{issueId}	                     Return a book
```

## ⚙️ Local Setup
Clone the repository
```bash
git clone https://github.com/Darshan-jk/Library-Management
```
```bash
cd library-management
```
## Backend Setup

Go to the backend:
```bash
cd backend
```

## Configure PostgreSQL environment variables:
```bash
DATABASE_URL=jdbc:postgresql://localhost:5432/librarydb
DB_USERNAME=postgres
DB_PASSWORD=your_password
```

Then run:
```bash
mvn spring-boot:run
```

Backend will run on:
```bash
http://localhost:8080
```
Frontend Setup

Open another terminal:
```bash
cd frontend
```

Install dependencies:
```bash
npm install
```

Create a .env file:
```bash
VITE_API_URL=http://localhost:8080/api
```

Start the frontend:
```bash
npm run dev
```

Frontend will run on:
```bash
http://localhost:5173
```
## ☁️ Deployment
## Backend

The Spring Boot backend is deployed on Render using Docker and Java 21.

The backend connects to a PostgreSQL database hosted on Render.

## Frontend

The React frontend is deployed on Vercel.

The frontend uses the following environment variable:

VITE_API_URL=https://YOUR_RENDER_BACKEND_URL/api

## 🗄️ Database

The project uses PostgreSQL with the following main entities:
```bash
Book
 ├── id
 ├── title
 ├── author
 ├── isbn
 └── quantity

Member
 ├── id
 ├── name
 ├── email
 └── phone

Issue
 ├── id
 ├── book
 ├── member
 ├── issueDate
 ├── returnDate
 └── status
```
## 🔐 Environment Variables

Do not commit database credentials to GitHub.

## Backend:
```bash
DATABASE_URL
DB_USERNAME
DB_PASSWORD
```

## Frontend:
```bash
VITE_API_URL
```
## 👨‍💻 Author

Darshan J K

GitHub: [Darshan JK](https://github.com/Darshan-jk)

⭐ Support

If you found this project useful, consider giving the repository a ⭐ on GitHub.
