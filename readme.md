📘 README.md — Expense Tracker (MERN Stack)
# 💰 Expense Tracker (MERN Stack)

A full-stack Expense Tracker web app built with the **MERN stack** —  
MongoDB, Express.js, React.js, and Node.js — featuring authentication, CRUD operations, and category-wise expense summaries.

> 🚀 Live Demo  
> **Frontend:** [https://expense-tracker-rxgx.vercel.app](https://expense-tracker-rxgx.vercel.app)  
> **Backend:** [https://expense-tracker-3ts8.onrender.com](https://expense-tracker-3ts8.onrender.com)

---

## 🧩 Features

### 🔐 Authentication
- JWT-based login and signup  
- Secure cookie storage (`HttpOnly`, `SameSite=None`, `Secure`)  
- Logout with cookie clearing

### 💵 Expense Management
- Add, edit, delete, and view expenses  
- Filter by category and date  
- Paginated expense list (5 per page)  
- Category-wise expense summary  
- Responsive design with **TailwindCSS**

### 🛠️ Tech Stack
| Layer | Technology |
|-------|-------------|
| Frontend | React.js (Vite) + TailwindCSS |
| Backend | Node.js + Express.js |
| Database | MongoDB Atlas |
| Auth | JWT (stored in HttpOnly cookie) |
| Deployment | Vercel (frontend) + Render (backend) |

---

## ⚙️ Local Development Setup

### 1️⃣ Clone the repository

git clone https://github.com/your-username/expense-tracker.git
cd expense-tracker

2️⃣ Setup the backend

```bash

cd backend
npm install

```

Create a .env file in backend/:

MONGO_URI=your_mongodb_connection_uri

JWT_SECRET=your_secret_key

CLIENT_ORIGIN=http://localhost:5173

NODE_ENV=development

PORT=5000

Run the backend

```bash

npm run dev

```


Backend runs at: http://localhost:5000

3️⃣ Setup the frontend
```bash
cd ../client
npm install
```

---------------------------------------------------------------------------------

Create a .env file in client/:
VITE_API_BASE=http://localhost:5000/api

Run the frontend

npm run dev


Frontend runs at: http://localhost:5173

☁️ Deployment
🚀 Frontend (Vercel)

Push the repo to GitHub.

Import your client/ folder in Vercel
.

Add environment variable:

VITE_API_BASE=https://expense-tracker-3ts8.onrender.com/api


Deploy.

⚙️ Backend (Render)

Go to Render
.

Create a new Web Service → link to backend/ folder.

Add environment variables:

MONGO_URI=your_mongodb_connection_uri

JWT_SECRET=your_secret_key

CLIENT_ORIGIN=https://expense-tracker-rxgx.vercel.app

NODE_ENV=production

PORT=5000



Build Command:
```bash
npm install
```


Start Command:

```bash

node index.js 

```

----------------------------------------------------------

✨ Credits

Developed by Shivam Yadav
💻 Backend: Express + MongoDB
🎨 Frontend: React + TailwindCSS
☁️ Deployment: Vercel + Render
