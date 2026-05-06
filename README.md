# CodeMentorAI

> An AI-powered developer assistant built with React, Firebase, and Groq — featuring real-time chat, secure authentication, and a cinematic animated UI.

[![React](https://img.shields.io/badge/React-19-61DAFB?logo=react)](https://react.dev)
[![Firebase](https://img.shields.io/badge/Firebase-12-FFCA28?logo=firebase)](https://firebase.google.com)
[![Vite](https://img.shields.io/badge/Vite-7-646CFF?logo=vite)](https://vitejs.dev)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3-38BDF8?logo=tailwindcss)](https://tailwindcss.com)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

---

## Table of Contents

- [Overview](#overview)
- [Live Demo](#live-demo)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Architecture & Data Flow](#architecture--data-flow)
- [Components](#components)
- [Routing](#routing)
- [AI Integration](#ai-integration)
- [Authentication](#authentication)
- [Firestore Database](#firestore-database)
- [Environment Variables](#environment-variables)
- [Getting Started](#getting-started)
- [Available Scripts](#available-scripts)
- [Dependencies](#dependencies)
- [Known Limitations](#known-limitations)
- [Contributing](#contributing)

---

## Overview

**CodeMentorAI** is a full-stack web application that lets developers chat with an AI programming assistant powered by Google Gemini. Every conversation is persisted in Firestore and scoped to the authenticated user. The UI features a cinematic animated video background, smooth Framer Motion transitions, and full Markdown + syntax-highlighted code rendering in AI responses.

---

## Live Demo

🔗 [https://github.com/TejaNaik15/CodeMentorAI](https://github.com/TejaNaik15/CodeMentorAI)

---

## Features

| Feature | Details |
|---|---|
| **Email/Password Auth** | Register & login via Firebase Authentication |
| **Google OAuth** | One-click sign-in with Google popup |
| **Session Persistence** | Auth state persisted via `browserLocalPersistence` |
| **Protected Routes** | Unauthenticated users are redirected to `/auth` |
| **Groq API Key Prompt** | Users supply their own Groq API key, stored in `localStorage` |
| **AI Model Fallback** | Tries `llama-3.3-70b-versatile` → `llama3-70b-8192` on rate limit errors |
| **Real-time Chat** | Messages stored in Firestore, streamed live via `onSnapshot` |
| **Per-user Chat History** | All messages are scoped to `userId`, fully private |
| **Welcome Message** | Auto-injected on first login if no messages exist |
| **Markdown Rendering** | AI responses rendered with `react-markdown` |
| **Syntax Highlighting** | Code blocks highlighted with `react-syntax-highlighter` (VSCode Dark+ theme) |
| **Animated Video Background** | Seamlessly looping background video with CSS fade-in, fully supported on iOS Safari |
| **Responsive Navigation** | Desktop nav + mobile hamburger menu with user avatar dropdown |
| **Form Validation** | Login/register forms validated with Formik + Yup |
| **Framer Motion Animations** | Staggered entrance animations on landing page |

---

## Tech Stack

### Frontend
- **React 19** — UI library
- **React Router DOM 7** — Client-side routing
- **Tailwind CSS 3** — Utility-first styling
- **Framer Motion 12** — Animations and transitions
- **React Icons 5** — Icon library
- **Lucide React** — Additional icon set

### Backend / Cloud
- **Firebase Auth 12** — Email/password + Google OAuth
- **Firestore** — NoSQL real-time database for chat messages
- **Firebase Messaging** — Initialized (ready for push notifications)

### AI
- **Groq SDK (`groq-sdk`)** — Groq API client
- Models used (in fallback order):
  1. `llama-3.3-70b-versatile` — primary, best for code
  2. `llama3-70b-8192` — fallback on rate limit

### Forms
- **Formik 2** — Form state management
- **Yup** — Schema-based validation

### Build
- **Vite 7** — Dev server and bundler
- **ESLint 9** — Linting

---

## Project Structure

```
CodeMentorAI/
├── public/
│   └── cmai.png                  # App logo/favicon asset
├── src/
│   ├── assets/
│   ├── components/
│   │   ├── ApiKeyPrompt.jsx      # Groq API key entry modal
│   │   ├── Chat.jsx              # Main chat interface
│   │   ├── Home.jsx              # Landing page
│   │   ├── Login.jsx             # Auth page (login + register)
│   │   ├── Navigation.jsx        # Top navbar (desktop + mobile)
│   │   ├── PrivateRoute.jsx      # Auth guard wrapper
│   │   └── VideoBackground.jsx   # Animated video background wrapper
│   ├── config/
│   │   ├── firebase.js           # Firebase app init (Auth, Firestore, Messaging)
│   │   └── gemini.js             # Groq model init + fallback logic
│   ├── utils/
│   │   ├── auth.js               # Auth helper functions
│   │   └── index.css             # Global styles
│   ├── App.jsx                   # Root component + route definitions
│   └── main.jsx                  # React DOM entry point
├── .env                          # Environment variables (not committed)
├── index.html
├── package.json
├── tailwind.config.js
├── vite.config.js
└── postcss.config.js
```

---

## Architecture & Data Flow

```
User
 │
 ├─► /  (Landing)         → Home.jsx + VideoBackground
 ├─► /auth                → Login.jsx (Formik + Firebase Auth)
 ├─► /api-key             → ApiKeyPrompt.jsx (saves key to localStorage)
 └─► /chat (protected)    → Chat.jsx
          │
          ├─► Firestore (onSnapshot) ──► real-time messages
          └─► Groq API ──────────────► AI response (with model fallback)
```

**Message flow in Chat:**
1. User submits a message → saved to Firestore (`role: "user"`)
2. Message text sent to Groq via `generateWithFallback()`
3. AI response saved to Firestore (`role: "ai"`, `replyTo: userMessageId`)
4. `onSnapshot` listener updates the UI in real time

---

## Components

### `Home.jsx` — Landing Page
- Animated hero section with `Framer Motion` stagger
- Feature cards: AI-Powered Intelligence, Smart Solutions, Secure & Private
- Stats row: 100+ Languages, 24/7 Availability, 1M+ Developers, 5⭐ Rating
- CTA buttons: "Start Coding Now" → `/auth`, "View on GitHub"
- Wrapped in `VideoBackground`

### `Chat.jsx` — Chat Interface
- Real-time Firestore listener scoped to `user.uid`
- Auto-injects a welcome message on first login
- Renders AI responses with full Markdown + syntax highlighting
- Loading dots animation while awaiting AI response
- Rate limit error handling with friendly user-facing messages
- Seamlessly looping video background with CSS fade-in on load

### `Login.jsx` — Authentication
- Toggles between Sign In and Create Account modes
- Formik form with Yup validation (email format, min 6-char password)
- Google sign-in via popup
- Error display with animated shake

### `Navigation.jsx` — Navbar
- Sticky top bar with `CodeMentorAI` logo
- Desktop: Home, Chat links + user avatar dropdown with logout
- Mobile: hamburger menu with same options
- Shows user email + avatar (Google photo or `ui-avatars.com` fallback)

### `ApiKeyPrompt.jsx` — API Key Entry
- Shown after login if no Groq API key is in `localStorage`
- Saves key to `localStorage` under `groq_api_key`
- Links to [https://console.groq.com/keys](https://console.groq.com/keys) to get a key

### `VideoBackground.jsx` — Background Wrapper
- Loads a hosted `.mp4` via CloudFront CDN
- CSS fade-in on `canplaythrough`, seamless native `loop` — no white flash
- `webkit-playsinline` + `playsInline` for full iOS Safari support
- Gradient overlay for readability
- Reusable wrapper — used on Home, Login, ApiKeyPrompt pages

### `PrivateRoute.jsx` — Auth Guard
- Wraps protected routes (`/chat`, `/api-key`)
- Redirects unauthenticated users to `/auth`
- Shows loading state while Firebase resolves auth

---

## Routing

| Path | Component | Protected |
|---|---|---|
| `/` | `Home` + `Navigation` | No |
| `/auth` | `Login` in `VideoBackground` | Redirects to `/api-key` if logged in |
| `/api-key` | `ApiKeyPrompt` in `VideoBackground` | Yes — redirects to `/chat` if key exists |
| `/chat` | `Chat` | Yes — redirects to `/api-key` if no key |

---

## AI Integration

Located in `src/config/gemini.js`:

```js
// API key is read from localStorage at call time
const getApiKey = () => localStorage.getItem("groq_api_key");

// Model fallback order
const MODELS = [
  "llama-3.3-70b-versatile",
  "llama3-70b-8192",
];
```

`generateWithFallback(prompt)` iterates through models and falls back on `429` / rate limit errors. If all models are exhausted, it throws a user-friendly error with a link to get a new API key at [https://console.groq.com/keys](https://console.groq.com/keys).

The prompt sent to Groq is:
```
You are a programming assistant. User question: <user input>
```

---

## Authentication

Located in `src/utils/auth.js`:

| Function | Description |
|---|---|
| `loginUser(email, password)` | Signs in with email/password |
| `registerUser(email, password)` | Creates a new account |
| `logoutUser()` | Signs out the current user |
| `signInWithGoogle()` | Opens Google OAuth popup |
| `subscribeToAuthChanges(cb)` | Subscribes to auth state changes |

Firebase is configured with `browserLocalPersistence` so sessions survive page refreshes.

---

## Firestore Database

Collection: `messages`

| Field | Type | Description |
|---|---|---|
| `text` | string | Message content |
| `role` | `"user"` \| `"ai"` | Sender type |
| `userId` | string | Firebase UID of the owner |
| `timestamp` | Timestamp | Server-side timestamp |
| `replyTo` | string (optional) | ID of the user message this AI reply answers |
| `isWelcomeMessage` | boolean (optional) | Marks the auto-injected welcome message |

Messages are queried with `where("userId", "==", user.uid)` and ordered by `timestamp asc`.

> **Note:** Firestore requires a composite index on `(userId, timestamp)` for the ordered query. The app handles the index-building delay gracefully with an `indexReady` state.

---

## Environment Variables

Create a `.env` file in the project root:

```env
VITE_FIREBASE_API_KEY=<your-firebase-api-key>
VITE_FIREBASE_AUTH_DOMAIN=<your-project>.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=<your-project-id>
VITE_FIREBASE_STORAGE_BUCKET=<your-project>.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=<your-sender-id>
VITE_FIREBASE_APP_ID=<your-app-id>
VITE_FIREBASE_MEASUREMENT_ID=G-XXXXXXXXXX
```

The Gemini API key is **not** stored in `.env` — it is entered by the user at runtime and stored in `localStorage`.

---

## Getting Started

### Prerequisites

- Node.js >= 16
- npm or yarn
- A [Firebase project](https://console.firebase.google.com) with Auth (Email/Password + Google) and Firestore enabled
- A [Groq Console](https://console.groq.com/keys) account for a Groq API key

### Installation

```bash
git clone https://github.com/TejaNaik15/CodeMentorAI.git
cd CodeMentorAI
npm install
```

### Configure Firebase

1. Go to [Firebase Console](https://console.firebase.google.com) → your project → Project Settings → Web App
2. Copy the config values into your `.env` file (see [Environment Variables](#environment-variables))
3. Enable **Authentication** → Sign-in methods: Email/Password + Google
4. Enable **Firestore Database** in production or test mode
5. Add the composite index: `messages` collection → fields: `userId (ASC)`, `timestamp (ASC)`

### Run Locally

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173)

### Build for Production

```bash
npm run build
npm run preview
```

---

## Available Scripts

| Script | Description |
|---|---|
| `npm run dev` | Start Vite dev server |
| `npm run build` | Production build to `dist/` |
| `npm run preview` | Preview production build locally |
| `npm run lint` | Run ESLint |

---

## Dependencies

### Runtime

| Package | Version | Purpose |
|---|---|---|
| `react` | ^19.1.1 | UI library |
| `react-dom` | ^19.1.1 | DOM renderer |
| `react-router-dom` | ^7.8.1 | Client-side routing |
| `firebase` | ^12.1.0 | Auth + Firestore + Messaging |
| `groq-sdk` | ^0.9.1 | Groq API client |
| `react-firebase-hooks` | ^5.1.1 | `useAuthState` hook |
| `react-markdown` | ^10.1.0 | Markdown rendering |
| `react-syntax-highlighter` | ^15.6.1 | Code block highlighting |
| `framer-motion` | ^12.23.12 | Animations |
| `formik` | ^2.4.6 | Form management |
| `yup` | ^1.7.0 | Form validation schemas |
| `react-icons` | ^5.5.0 | Icon components |
| `lucide-react` | ^1.14.0 | Additional icons |

### Dev

| Package | Purpose |
|---|---|
| `vite` + `@vitejs/plugin-react` | Build tool |
| `tailwindcss` + `postcss` + `autoprefixer` | CSS framework |
| `eslint` + plugins | Linting |

---

## Known Limitations

- **Groq API key in localStorage** — The key is stored client-side. For production, consider a backend proxy to keep the key server-side.
- **No message deletion** — There is currently no UI to clear chat history.
- **Firestore index** — The composite index must be manually created in the Firebase Console for the ordered query to work.
- **No streaming responses** — AI responses are returned in full after generation completes, not streamed token-by-token.

---

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature`
3. Commit your changes: `git commit -m "feat: add your feature"`
4. Push and open a Pull Request

---

<p align="center">Built by <a href="https://github.com/TejaNaik15">Teja Naik</a></p>
