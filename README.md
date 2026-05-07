# EduBroadcast — Content Broadcasting System

A role-based content broadcasting platform for educational institutions where teachers upload content, principals review and approve it, and students can view approved content live on public broadcast screens in real time.

---

## Live Demo

🔗 https://content-broadcasting-pi.vercel.app

---

## Features

### Teacher
- Secure login authentication
- Upload educational content
- Drag-and-drop image upload with preview
- Assign content to screens
- Schedule content publishing
- Track approval status
- View uploaded content history

### Principal
- Review pending content submissions
- Approve or reject submissions
- Mandatory rejection reason
- Search and filter content
- View complete content history
- Preview uploaded images in modal

### Student / Public
- Public live broadcast page
- No authentication required
- Real-time approved content display
- Auto-refresh every 30 seconds
- Progress bar for active broadcasts

---

# Tech Stack

## Frontend
- Next.js 15
- React
- TypeScript
- Tailwind CSS
- TanStack Query
- Axios

## Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication

## Storage & Services
- Cloudinary
- MongoDB Atlas

---

# Why TypeScript?

> Assignment specified JavaScript, but TypeScript was intentionally used for better scalability, maintainability, type safety, and cleaner developer experience while preserving all required functionality.

---

# System Architecture

```text
Teacher Dashboard
       │
       ▼
Next.js Frontend
       │
       ▼
Express.js API Layer
       │
 ┌─────┴─────┐
 ▼           ▼
MongoDB   Cloudinary
       │
       ▼
Principal Approval
       │
       ▼
Live Public Broadcast
```

---

# Folder Structure

```bash
src/
├── app/
│   ├── (auth)/
│   ├── (teacher)/
│   ├── (principal)/
│   └── live/
│
├── components/
│   ├── auth/
│   ├── teacher/
│   ├── principal/
│   ├── shared/
│   ├── layout/
│   └── ui/
│
├── services/
├── hooks/
├── context/
├── types/
├── utils/
├── constants/
└── lib/
```

---

# Architecture Highlights

## Service Layer
All API communication is abstracted inside `services/`.

- Cleaner components
- Reusable API methods
- Better maintainability

---

## Custom Hooks

Reusable hooks manage:
- loading states
- server data
- mutations
- caching
- error handling

Hooks used:
- `useAuth`
- `useContent`
- `useApproval`

---

## React Query

Used for:
- server state management
- background refetching
- caching
- optimistic updates
- auto synchronization

---

## AuthGuard

Protects role-based routes:

- Teacher routes
- Principal routes
- Unauthorized redirects

---

## Axios Interceptors

Implemented for:
- automatic JWT attachment
- centralized error handling
- auto logout on 401 responses

---

# Security Features

- JWT authentication
- Protected API routes
- Role-based authorization
- Middleware validation
- Secure password hashing
- Token persistence handling
- Auto logout on invalid token

---

# UI/UX Features

- Fully responsive design
- Mobile card layout
- Desktop table layout
- Skeleton loaders
- Toast notifications
- Empty states
- Error states
- Dark mode support
- Active filter indicators
- Image preview modal
- Pagination support

---

# Bonus Features Implemented

- ✅ TanStack Query integration
- ✅ Protected routes
- ✅ Drag-and-drop uploads
- ✅ Image preview
- ✅ Auto-refresh polling
- ✅ Scheduled broadcasting
- ✅ Responsive UI
- ✅ Dark mode
- ✅ Toast notifications
- ✅ Skeleton loading states
- ✅ Content filtering
- ✅ Search functionality
- ✅ Pagination
- ✅ Progress bar for live screens

---

# User Flows

## Teacher Flow

1. Login to dashboard
2. Upload educational content
3. Add metadata and schedule
4. Submit for approval
5. Track approval status

---

## Principal Flow

1. Login to dashboard
2. Review pending content
3. Preview uploaded media
4. Approve or reject content
5. Provide rejection reason if rejected

---

## Student/Public Flow

1. Visit public live screen URL
2. View approved active content
3. Content auto-refreshes every 30 seconds

---

# Screenshots

## Login Page
_Add screenshot here_

## Teacher Dashboard
_Add screenshot here_

## Principal Approval Panel
_Add screenshot here_

## Live Broadcast Screen
_Add screenshot here_

---

# API Overview

## Authentication
- `POST /api/auth/login`

## Content
- `POST /api/content`
- `GET /api/content`
- `GET /api/content/live/:screen`

## Approval
- `PATCH /api/content/:id/approve`
- `PATCH /api/content/:id/reject`

---

# Getting Started

## Prerequisites

- Node.js 18+
- MongoDB Atlas or Local MongoDB
- Cloudinary account

---

# Installation

## 1. Clone Repository

```bash
git clone https://github.com/YOUR_USERNAME/content-broadcasting.git

cd content-broadcasting
```

---

# Backend Setup

```bash
cd backend

npm install
```

---

## Create `.env`

```env
PORT=5000

MONGO_URI=your_mongodb_uri

JWT_SECRET=your_jwt_secret

CLOUDINARY_CLOUD_NAME=your_cloud_name

CLOUDINARY_API_KEY=your_api_key

CLOUDINARY_API_SECRET=your_api_secret
```

---

## Seed Demo Users

```bash
node seed.js
```

---

## Start Backend

```bash
node server.js
```

Backend runs on:

```bash
http://localhost:5000
```

---

# Frontend Setup

```bash
cd ..

npm install
```

---

## Create `.env.local`

```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

---

## Start Frontend

```bash
npm run dev
```

Frontend runs on:

```bash
http://localhost:3000
```

---

# Demo Credentials

| Role | Email | Password |
|------|------|------|
| Teacher | teacher@demo.com | password123 |
| Principal | principal@demo.com | password123 |
| Student/Public | `/live/Screen 1` | No Login Required |

---

# Deployment

| Service | Platform |
|---|---|
| Frontend | Vercel |
| Backend | Render / Railway |
| Database | MongoDB Atlas |
| Media Storage | Cloudinary |

---

# Challenges Faced

- Managing role-based route protection using App Router
- Synchronizing live broadcast updates efficiently
- Designing scalable folder architecture
- Preventing unnecessary re-renders during polling
- Maintaining reusable API abstraction
- Handling optimistic UI updates cleanly

---

# Future Improvements

- WebSocket real-time broadcasting
- Multiple school support
- Notifications system
- Analytics dashboard
- Role management panel
- Content expiration automation
- Video broadcasting support

---

# License

Built for educational assignment purposes.

---

# Author

Devansh Tiwari

- Full Stack Developer
- MERN Stack Enthusiast
- Next.js Developer
```

Create `.env` file inside `/backend`:

```env
PORT=5000
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

Seed demo users:

```bash
node seed.js
```

Start backend server:

```bash
node server.js
```

Backend runs on: `http://localhost:5000`

---

### 3. Setup Frontend

```bash
cd ..
npm install
```

Create `.env.local` in root:

```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

Start frontend:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

---

## Demo Credentials

| Role | Email | Password |
|---|---|---|
| 👨‍🏫 Teacher | teacher@demo.com | password123 |
| 👨‍💼 Principal | principal@demo.com | password123 |
| 🎓 Student | Visit `/live/Screen 1` | No login required |

---

## User Flows

**Teacher**
1. Login → Teacher Dashboard
2. Upload content (title, subject, image, schedule, screen)
3. Track content status (Pending / Approved / Rejected)

**Principal**
1. Login → Principal Dashboard
2. Review pending content with full image preview
3. Approve or Reject with mandatory reason
4. Filter & search all content

**Student / Public**
1. Visit `/live/Screen 1` (or any screen name)
2. View active broadcast content — no login required
3. Auto-refreshes every 30 seconds

---

## Folder Structure

```
src/
├── app/              # Next.js App Router pages
│   ├── (auth)/       # Login page
│   ├── (teacher)/    # Teacher dashboard, upload, my-content
│   ├── (principal)/  # Principal dashboard, approvals, all-content
│   └── live/         # Public live broadcast page
├── components/
│   ├── auth/         # AuthGuard, LoginForm
│   ├── teacher/      # TeacherStats, UploadForm, ContentTable
│   ├── principal/    # PrincipalStats, ApprovalTable, RejectModal
│   ├── shared/       # EmptyState, ErrorState, StatusBadge
│   ├── layout/       # Navbar, Sidebar, PageContainer
│   └── ui/           # Skeleton, Toast
├── services/         # API service layer (auth, content, approval)
├── hooks/            # Custom hooks (useAuth, useContent, useApproval)
├── context/          # AuthContext
├── types/            # TypeScript interfaces
├── utils/            # Helpers (date, role, status, validators)
├── constants/        # Static options (screens, subjects)
└── lib/              # axios instance, react-query client
```

---

## Architecture Highlights

- **Service Layer** — All API calls go through `services/` only. No direct API calls in components.
- **Custom Hooks** — `useContent`, `useApproval`, `useAuth` wrap services and manage loading/error/data state.
- **AuthContext** — Global user state with token rehydration on mount.
- **AuthGuard** — Protects role-based routes, redirects on mismatch.
- **React Query** — Server state caching, background refetch, optimistic updates.
- **Axios Interceptors** — Auto token attachment + 401 auto-logout.

---

## Bonus Features Implemented

- ✅ React Query (TanStack Query) — server state management
- ✅ Drag-and-drop file upload with preview
- ✅ Auto-refresh polling on live page (every 30s)
- ✅ Skeleton loaders
- ✅ Protected routes with AuthGuard
- ✅ Toast notifications (react-hot-toast)
- ✅ Mobile responsive — card layout on mobile, table on desktop
- ✅ Dark mode support
- ✅ Pagination on All Content page
- ✅ Active filter indicators with clear options
- ✅ Full image preview modal on approval table
- ✅ Progress bar on live broadcast page
- ✅ Scheduled / Active / Expired status indicators

---

## Live Demo

🔗 [https://content-broadcasting-pi.vercel.app](https://content-broadcasting-pi.vercel.app)

---

## License

Built for educational assignment purposes.```bash
cd backend
npm install
```

Create `.env` in `/backend`:
```env
PORT=5000
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

Seed demo users:
```bash
node seed.js
```

Start backend:
```bash
node server.js
```

### 3. Setup Frontend
```bash
cd ..
npm install
```

Create `.env.local` in root:
```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

Start frontend:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Demo Credentials

| Role | Email | Password |
|---|---|---|
| Teacher | teacher@demo.com | password123 |
| Principal | principal@demo.com | password123 |

## User Flows

**Teacher** → Login → Upload content (image + schedule) → View status

**Principal** → Login → Review pending → Approve / Reject with reason

**Student** → Visit `/live/Screen 1` → View active broadcast (no login)

## Folder Structure

src/
├── app/          # Next.js pages (auth, teacher, principal, live)
├── components/   # UI components (auth, teacher, principal, shared, layout)
├── services/     # API service layer (auth, content, approval)
├── hooks/        # Custom hooks (useAuth, useContent, useApproval)
├── context/      # AuthContext
├── types/        # TypeScript interfaces
├── utils/        # Helpers (date, role, status, validators)
├── constants/    # Static options (screens, subjects)
└── lib/          # axios instance, react-query client

## Live Demo

https://content-broadcasting-pi.vercel.app
