# Freedom Number Workshop

A React + Vite landing page with a component-driven frontend, local
Express API routes, Vercel serverless functions, and Postgres-backed
registration submissions.

## Tech Stack

- React + Vite with JavaScript and JSX
- SCSS for component-level styles
- Node.js + Express for local API development
- Vercel serverless functions in `api/` for production
- Postgres through the `pg` package

## Setup

Copy the environment example and set a Postgres connection string:

```bash
cp .env.example .env
```

Required variables:

- `DATABASE_URL`: Postgres connection string, preferably from Neon
- `PORT`: local API port, defaults to `3001`

Install dependencies:

```bash
npm install
```

Run the Vite frontend and Express API together:

```bash
npm run dev
```

Other commands:

```bash
npm run dev:client
npm run dev:server
npm run build
npm run lint
npm run preview
```

## API Routes

Local Express routes and Vercel functions expose matching endpoints:

- `POST /api/registrations`: create a registration
- `GET /api/registrations`: list registrations
- `GET /api/registrations/view`: list registrations for the submissions page

The `registrations` table is created automatically if it does not exist.

## Deployment

Set `DATABASE_URL` in Vercel project environment variables before deploying.
The serverless files under `api/` handle production requests, while the Vite
app calls the same `/api` paths used during local development.
