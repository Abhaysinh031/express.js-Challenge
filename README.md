# 📝 Express.js Notes App 

A secure Notes App built using **Express.js and additionally (MongoDB, Express.js, React.js, Node.js)** with **JWT authentication**, allowing users to register, log in, and manage personal notes.

---

## 🚀 Features

- 🔐 User authentication with JWT
- 🧾 CRUD operations for user-specific notes
- 🧠 Notes have `title`, `content`, and `tags`
- ✅ Protected routes using middleware
- 🧪 Basic validation for required fields
- ⚛️ Frontend built with React
- 📦 Backend API built with Express and MongoDB (Mongoose)

  
---


---

## ⚙️ Setup Instructions

### 1. Clone the Repo

```bash
git clone https://github.com/Abhaysinh031/express.js-Challenge.git
cd express.js-Challenge/notes-api

```

### 2. Start Backend Server

```bash
npm install
node server.js

```

### 3. Start Frontend

```bash
cd notes-frontend
npm install
npm start

```
#### React app will run on: http://localhost:3000

## API Endpoints (Backend)

#### Auth Routes

| Method | Endpoint              | Description       |
| ------ | --------------------- | ----------------- |
| POST   | `/api/users/register` | Register new user |
| POST   | `/api/users/login`    | Login and get JWT |



### 🛠 Tech Stack
- Frontend: React, React Router

- Backend: Express.js, Node.js

- Database: MongoDB with Mongoose

- Auth: JWT (JSON Web Tokens)
