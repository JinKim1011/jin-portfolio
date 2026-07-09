## About

Personal portfolio and blog — design engineering work, projects, design systems, and case studies. Posts are managed in Notion; images are served from Supabase Storage.

## Stack

- Next.js 15 (App Router) + TypeScript
- Tailwind CSS · Radix icons
- Notion API (content) · Supabase Storage (images)
- Deployed on Vercel

## Getting started

```bash
npm install
nano .env.local               # add your personal keys
npm run dev                  # http://localhost:3000
```

Required env vars:

- `NOTION_TOKEN`
- `NOTION_DATABASE_ID`
- `NOTION_WEBHOOK_SECRET`
