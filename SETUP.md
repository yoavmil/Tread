# Tread — Setup Guide

## Prerequisites

- Node.js 18+ and npm
- MongoDB running locally (or a MongoDB Atlas connection string)
- A Mapbox account (free tier works)
- A Google Cloud project with OAuth 2.0 credentials

---

## Step 1 — Get your API keys

### Mapbox Token
1. Sign up at https://mapbox.com
2. Go to Account → Tokens → Create a token (or use the default public token)
3. Copy the token

### Google OAuth
1. Go to https://console.cloud.google.com
2. Create a new project (or select existing)
3. APIs & Services → Credentials → Create Credentials → OAuth 2.0 Client ID
4. Application type: **Web application**
5. Authorized redirect URIs: `http://localhost:3000/auth/google/callback`
6. Copy Client ID and Client Secret

---

## Step 2 — Configure backend

Copy the example env file:
```
cp backend/.env.example backend/.env
```

Edit `backend/.env`:
```
PORT=3000
MONGO_URI=mongodb://localhost:27017/tread
GOOGLE_CLIENT_ID=<your Google client ID>
GOOGLE_CLIENT_SECRET=<your Google client secret>
JWT_SECRET=<any long random string, e.g. run: node -e "console.log(require('crypto').randomBytes(32).toString('hex'))">
FRONTEND_URL=http://localhost:4200
```

---

## Step 3 — Configure frontend

Edit `frontend/src/environments/environment.ts`:
```typescript
export const environment = {
  production: false,
  apiUrl: '',
  mapboxToken: '<your Mapbox token>'
};
```

---

## Step 4 — Install dependencies & seed data

```bash
# Install all dependencies
npm run install:all

# Seed the database with ~60 Israeli places
npm run seed
```

---

## Step 5 — Run the app

```bash
npm start
```

This starts both the backend (port 3000) and the Angular dev server (port 4200).

Open: http://localhost:4200

---

## What you get

- **Login page** — Sign in with Google
- **Map page** — Interactive map of Israel with 60+ places
  - Color-coded markers by category (nature, historical, trail, beach, city)
  - Click any marker to see details and mark as visited
  - Filter by category and region
  - Visited places show a green checkmark
- **Profile page** — Your exploration stats with progress bars by category

---

## Project structure

```
tread/
├── backend/
│   └── src/
│       ├── config/passport.js     # Google OAuth setup
│       ├── middleware/auth.js     # JWT verification
│       ├── models/Place.js        # Place schema
│       ├── models/User.js         # User schema
│       ├── routes/auth.js         # /auth/google routes
│       ├── routes/places.js       # /api/places routes
│       ├── routes/users.js        # /api/users/me routes
│       ├── seed/places.js         # 60+ Israeli places data
│       └── server.js
└── frontend/
    └── src/app/
        ├── core/
        │   ├── guards/auth.guard.ts
        │   ├── interceptors/auth.interceptor.ts
        │   └── services/           # auth, places, visits
        ├── features/
        │   ├── login/
        │   ├── auth-callback/
        │   ├── map/                # main map + place panel + filter bar
        │   └── profile/
        └── models/                 # TypeScript interfaces
```
