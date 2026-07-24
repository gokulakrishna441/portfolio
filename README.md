# Gokula Krishna A — MERN Portfolio

Production-ready portfolio website built with the MERN stack: **React (Vite)**, **Node.js/Express**, and **MongoDB**.

## Features

- Responsive, recruiter-focused UI with dark/light mode
- Smooth page transitions, scroll reveal, and loading animations
- Dynamic projects, skills, experience, education from MongoDB
- Project search & category filtering
- Working contact form with email integration (Nodemailer)
- JWT-protected admin panel (projects, skills, experience, resume, messages)
- Resume view/download
- SEO metadata, favicon, 404 page
- Security: Helmet, rate limiting, mongo sanitize, CORS, JWT

## Folder structure

```
portfolio/
├── client/                          # React frontend (Vite)
│   ├── public/
│   └── src/
│       ├── assets/
│       ├── components/              # Reusable UI (folder-per-component)
│       │   ├── animations/          # Reveal/, PageLoader/
│       │   ├── common/              # SEO/
│       │   ├── layout/              # Navbar/, Footer/, Layout/
│       │   └── ui/                  # Spinner/
│       ├── context/                 # ThemeContext/, AuthContext/
│       ├── hooks/                   # useScrollSpy/
│       ├── pages/                   # Route pages (folder-per-page)
│       │   ├── Home/, About/, Skills/, Experience/
│       │   ├── Projects/, ProjectDetail/, Education/
│       │   ├── Resume/, Contact/, NotFound/
│       │   └── admin/               # AdminLogin/, AdminDashboard/, ProtectedRoute/
│       ├── routes/                  # AppRoutes
│       ├── services/api/            # Axios API layer
│       ├── styles/                  # Global CSS
│       ├── App.jsx
│       └── main.jsx
├── server/                          # Express API
│   ├── src/
│   │   ├── config/
│   │   ├── controllers/
│   │   ├── middleware/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── seed/
│   │   └── utils/
│   └── uploads/resumes/
└── README.md
```

Each React component/page lives in its own folder with co-located CSS and an `index.js` barrel export:

```
components/layout/Navbar/
├── Navbar.jsx
├── Navbar.css
└── index.js
```

## Prerequisites

- Node.js 18+
- MongoDB running locally (or Atlas URI)

## Setup

### 1. Install dependencies

```bash
cd portfolio
npm run install:all
```

### 2. Configure environment

Server env is at `server/.env` (copy from `server/.env.example` if needed):

| Variable | Purpose |
|----------|---------|
| `MONGODB_URI` | Mongo connection string |
| `JWT_SECRET` | Admin auth secret |
| `ADMIN_EMAIL` / `ADMIN_PASSWORD` | Seeded admin credentials |
| `SMTP_*` | Optional Gmail/app password for contact emails |
| `CLIENT_URL` | Frontend origin for CORS |

Client env: `client/.env` → `VITE_API_URL=http://localhost:5000/api`

### 3. Seed resume data

```bash
npm run seed
```

Seeds profile, skills, experience, education, projects, and admin user from the resume.

### 4. Run development

Terminal 1 — API:

```bash
npm run dev:server
```

Terminal 2 — React:

```bash
npm run dev:client
```

- Site: http://localhost:5173  
- API: http://localhost:5000/api/health  
- Admin: http://localhost:5173/admin/login  

Default admin (from `.env`):

- Email: `admin@gokulakrishna.dev`
- Password: `Admin@123456`

## Deploy (free)

See **[DEPLOY.md](./DEPLOY.md)** for GitHub + Vercel + Render + MongoDB Atlas setup.

Quick map:
- Frontend → **Vercel** (free)
- Backend → **Render** (free)
- Database → **MongoDB Atlas M0** (free)
- Code → **GitHub** (free)

## Resume source

Content is sourced from `GK-21-07.pdf` (Gokula Krishna A). The PDF is available for download via `/api/resume/download`.

## Tech notes

- Frontend: React 19, React Router, Framer Motion, Axios, react-helmet-async
- Backend: Express, Mongoose, JWT, Multer, Nodemailer, Helmet, express-rate-limit
- Design: Warm parchment / ink palette with glass panels — Cormorant Garamond + Manrope
