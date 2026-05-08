# PulseBoard — Content Broadcasting System

A role-based content broadcasting platform for educational institutions.  
Teachers upload content → Principals approve it → Students view it live on public screens.

---

## Live Demo

🔗 [https://content-broadcasting-pi.vercel.app](https://content-broadcasting-pi.vercel.app)

---

## Demo Credentials

| Role | Email | Password |
|---|---|---|
| 👨‍🏫 Teacher | teacher@school.edu | password123 |
| 👨‍💼 Principal | principal@school.edu | password123 |
| 🎓 Student | Visit `/live/Screen 1` | No login required |

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | Next.js 15, React, TypeScript, Tailwind CSS |
| State | TanStack Query (React Query) |
| HTTP | Axios with interceptors |
| Backend | Node.js, Express.js |
| Database | MongoDB + Mongoose |
| Auth | JWT |
| Storage | Cloudinary |
| Deployment | Vercel (frontend), Render (backend), MongoDB Atlas |

> **Note:** Assignment specified JavaScript — TypeScript was used intentionally for better type safety, scalability, and maintainability while preserving all required functionality.

---

## Getting Started

### Prerequisites
- Node.js 18+
- MongoDB Atlas account (or local MongoDB)
- Cloudinary account

---

### 1. Clone Repository

```bash
git clone https://github.com/yo-soy-dev/content-broadcasting.git
cd content-broadcasting
```

---

### 2. Setup Backend

```bash
cd backend
npm install
```

Create `.env` inside `/backend`:

```env
PORT=5000
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
CLIENT_URL=http://localhost:3000
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

Backend runs on: `http://localhost:5000`

---

### 3. Setup Frontend

```bash
cd ..
npm install
```

Create `.env.local` in project root:

```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

Start frontend:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

---

## User Flows

**Teacher**
1. Login → Teacher Dashboard
2. Upload content (title, subject, image, schedule, screen)
3. Track content status — Pending / Approved / Rejected

**Principal**
1. Login → Principal Dashboard
2. Review pending content with full image preview modal
3. Approve or Reject with mandatory reason
4. Filter and search all content

**Student / Public**
1. Visit `/live/Screen 1` (or any screen name) — no login required
2. View active approved broadcast content
3. Auto-refreshes every 30 seconds

---

## Folder Structure

```
src/
├── app/              # Next.js App Router pages
│   ├── auth/         # Login, Register
│   ├── teacher/      # Dashboard, Upload, My Content
│   ├── principal/    # Dashboard, Approvals, All Content
│   └── live/         # Public broadcast page /live/:screenId
├── components/
│   ├── auth/         # AuthGuard, LoginForm, RegisterForm
│   ├── teacher/      # TeacherStats, UploadForm, ContentTable, ContentFilters
│   ├── principal/    # PrincipalStats, ApprovalTable, RejectModal, ContentPreviewModal,ContentFilters
│   ├── shared/       # EmptyState, ErrorState, StatusBadge, FilePreview
│   ├── layout/       # Navbar, Sidebar
│   └── ui/           # Skeleton, Button, Badge, Toast
├── services/         # API service layer — auth, content, approval
├── hooks/            # useAuth, useContent, useApproval, useDebounce
├── context/          # AuthContext — global user + token state
├── types/            # TypeScript interfaces — Content, User
├── utils/            # dateHelpers, validators, statusHelpers, roleHelpers
├── constants/        # SCREEN_OPTIONS, SUBJECTS (static data)
└── lib/              # axios instance, React Query client
```

---

## Architecture Highlights

| Pattern | Implementation |
|---|---|
| Service Layer | All API calls in `services/` only — no direct axios in components |
| Custom Hooks | `useContent`, `useApproval`, `useAuth` wrap services + manage state |
| AuthContext | Global user state, token rehydration on mount via `getMe()` |
| AuthGuard | Protects role-based routes, redirects on role mismatch |
| React Query | Server state caching, background refetch, auto-sync after mutations |
| Axios Interceptors | Auto token attachment on every request + 401 auto-logout |

---

## API Overview

| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/auth/login` | Login |
| POST | `/api/auth/register` | Register |
| POST | `/api/content` | Upload content (Teacher) |
| GET | `/api/content` | Get my content (Teacher) |
| GET | `/api/content/stats` | Teacher stats |
| DELETE | `/api/content/:id` | Delete pending content |
| GET | `/api/approval/pending` | Pending content (Principal) |
| GET | `/api/approval/all` | All content (Principal) |
| PATCH | `/api/approval/:id/approve` | Approve content |
| PATCH | `/api/approval/:id/reject` | Reject with reason |
| GET | `/api/live/:screenId` | Public live content |

---

## Bonus Features Implemented

- ✅ TanStack Query — server state management + caching
- ✅ Drag-and-drop file upload with preview
- ✅ Auto-refresh polling on live page (every 30s)
- ✅ Skeleton loaders on all loading screens
- ✅ Protected routes via AuthGuard
- ✅ Toast notifications (react-hot-toast)
- ✅ Mobile responsive — card layout on mobile, table on desktop
- ✅ Dark mode support
- ✅ Pagination on All Content page
- ✅ Active filter indicators with individual clear buttons
- ✅ Full image preview modal on approval table
- ✅ Progress bar on live broadcast page
- ✅ Scheduled / Active / Expired schedule status indicators

---

## Deployment

| Service | Platform |
|---|---|
| Frontend | Vercel |
| Backend | Render |
| Database | MongoDB Atlas |
| Media | Cloudinary |

For production, set these environment variables:

**Render (backend):**
```
MONGO_URI, JWT_SECRET, CLIENT_URL, CLOUDINARY_*
```

**Vercel (frontend):**
```
NEXT_PUBLIC_API_URL=https://your-backend.onrender.com/api
```

---

## Author

**Devansh Tiwari** — Full Stack Developer (MERN + PERN + Next.js)
