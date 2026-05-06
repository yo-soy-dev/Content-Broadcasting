# EduBroadcast — Content Broadcasting System

A role-based content broadcasting platform for educational institutions.
Teachers upload content, principals approve it, and students view it live.

## Tech Stack

**Frontend:** Next.js 15, React, TypeScript, Tailwind CSS
**Backend:** Node.js, Express.js, MongoDB, Mongoose
**Storage:** Cloudinary (image upload)
**Auth:** JWT

## Getting Started

### Prerequisites
- Node.js 18+
- MongoDB running locally or Atlas URI
- Cloudinary account

### 1. Clone the repo
```bash
git clone https://github.com/your-username/content-broadcasting.git
cd content-broadcasting
```

### 2. Setup Backend
```bash
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

[Deployment Link Here]
