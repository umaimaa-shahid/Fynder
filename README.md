# Fynder — FYP Partner Finder

A web platform for FAST-NU Lahore students to find and form Final Year Project teams based on skills, interests, and availability.

---

## Features

- 🔐 **Verified Auth** — University email only, JWT + bcrypt
- 👤 **Student Profiles** — Skills, interests, department, batch, availability
- 🧠 **Smart Matching** — Skill-based compatibility scoring
- 👥 **Group Management** — Requests, auto group formation (max 3)
- 💬 **Real-Time Chat** — Socket.IO direct messaging
- 🔍 **Search & Filter** — By skill, department, batch, availability
- 📊 **Dashboard** — Profile strength, top matches, pending requests

---

## Tech Stack

```
Frontend  →  React 19, Vite, Tailwind CSS, React Router, Axios, Socket.IO Client
Backend   →  Node.js, Express 5, Socket.IO, JWT, bcryptjs
Database  →  MongoDB Atlas, Mongoose
Email     →  Resend
Deploy    →  Vercel (frontend) · Render (backend) · MongoDB Atlas
```

---

## Getting Started

**Prerequisites:** Node.js ≥ 20 · MongoDB · [Resend](https://resend.com) API key

```bash
# Clone & install
git clone https://github.com/umaimaa-shahid/Fynder.git && cd fynder
cd backend && npm install
cd ../frontend && npm install
```

**`backend/.env`**

```env
PORT=5000
MONGO_URI=mongodb://your_atlas_uri/fynder
JWT_SECRET=your_secret
RESEND_API_KEY=re_xxxxxxxxxxxx
FRONTEND_URL=http://localhost:5173
BACKEND_URL=http://localhost:5000
```

**`frontend/.env`**

```env
VITE_API_URL=http://localhost:5000
```

```bash
cd backend && npm run dev    # port 5000
cd frontend && npm run dev   # port 5173
```

---

## Project Structure

```
fynder/
├── backend/
│   ├── controllers/    # Auth, Chat, Group, Profile, User
│   ├── models/         # User, Group, Message, Request
│   ├── routes/         # auth, user, profile, students, requests, group, chat, dashboard
│   ├── socket/         # Socket.IO handlers
│   └── server.js
└── frontend/src/
    ├── components/     # Button, Card, Input, Navbar, Sidebar, Layout
    ├── pages/
    │   ├── auth/       # SignUp, SignIn, EmailVerification, Step1–3
    │   ├── discovery/  # Dashboard, Search, Recommendations, Requests
    │   └── group/      # MyGroup, Chat, Profile, Settings
    └── utils/api.js    # Axios instance with JWT interceptor
```
