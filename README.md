# Chirp

Chirp is a small, friendly social media platform for sharing short posts, conversations, and connections. It includes a REST API and responsive single-page browser client.

## Features

- JWT registration/login, protected writes, profiles, avatars, bios, and counts
- Home and Explore feeds with pagination
- 280-character posts, comments, likes, follows, connection lists, and owner-only deletion
- SQLite foreign keys, cascading deletes, uniqueness constraints, indexes, parameterized queries, validation, escaped rendering, loading states, and toast errors

## Tech stack

Plain HTML/CSS/vanilla JavaScript with Fetch, Node.js and Express.js, SQLite through better-sqlite3, bcryptjs password hashes, and JWT bearer authentication.

## Run

Requires Node.js 18+.

```bash
npm install
npm run seed
npm start
```

Open http://localhost:3000. Demo users: `maya`, `leo`, `sana`, `noah`, `ivy`; password: `chirp123`. Use `npm run dev` for watch mode. Set `JWT_SECRET` in production.

The SQLite database is created automatically as `chirp.db` and is ignored by Git. Copy `.env.example` to `.env` when configuring `PORT` and `JWT_SECRET`.

## Demo credentials

The seed script creates `maya`, `leo`, `sana`, `noah`, and `ivy`; each uses password `chirp123`.

## API

Protected endpoints use `Authorization: Bearer <token>`.

| Method | Endpoint | Purpose |
|---|---|---|
| POST | `/api/auth/register` | Register |
| POST | `/api/auth/login` | Login |
| GET | `/api/auth/me` | Current user |
| GET/PUT | `/api/users/:username`, `/api/users/me` | Profiles |
| POST/DELETE | `/api/users/:username/follow` | Follow/unfollow |
| GET | `/api/users/:username/followers` or `/following` | Connections |
| GET | `/api/posts?limit=20&offset=0` | Explore feed |
| GET | `/api/feed?limit=20&offset=0` | Home feed |
| POST/DELETE | `/api/posts`, `/api/posts/:id` | Own posts |
| POST/DELETE | `/api/posts/:id/like` | Like/unlike |
| GET/POST | `/api/posts/:id/comments` | Comments |
| DELETE | `/api/comments/:id` | Own comment |

## ER diagram and structure

`users` owns `posts` and `comments`; `posts` owns comments and likes; users connect to themselves through follows. Foreign keys cascade deletes, composite keys make likes/follows unique, and indexes support feeds/lookups. `server.js` starts Express, `db.js` creates SQLite, `middleware/` holds JWT auth, `routes/` holds API handlers, `public/` holds the SPA, and `seed.js` creates demo data.
