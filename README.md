# Life With You – Web (Next.js)

Shareable story view for partners. Deploy to **Vercel** so share links open at your Vercel URL and show the story with images (Railway API links are not used for the share page).

## Deploy to Vercel

1. **Push your repo** to GitHub/GitLab/Bitbucket.

2. **In Vercel:** [vercel.com/new](https://vercel.com/new) → Import your repo.

3. **Project settings:**
   - **Root Directory:** `apps/web` (required for monorepo).
   - **Framework Preset:** Next.js (auto-detected).
   - **Build Command:** `pnpm run build` (or leave default).
   - **Install Command:** `pnpm install` (Vercel will run from repo root when Root Directory is set; if install fails, try `cd ../.. && pnpm install`).

4. **Environment variable** (required):
   - **Name:** `NEXT_PUBLIC_API_URL`
   - **Value:** Your Railway API URL, e.g. `https://life-with-you-server-production.up.railway.app/api` (no trailing slash).

5. **Deploy.** Your app will be at `https://your-project.vercel.app`.

6. **On Railway (backend):** In your server project, add:
   - **Name:** `PUBLIC_WEB_APP_URL`
   - **Value:** Your Vercel URL, e.g. `https://your-project.vercel.app` (no trailing slash).

   Redeploy the server so share links use the Vercel URL. Partners will open `https://your-project.vercel.app/story/TOKEN` and see the story and images.

## Local dev

```bash
cp env.example .env.local
# Set NEXT_PUBLIC_API_URL=http://localhost:3000/api
pnpm dev
# or from repo root: pnpm dev:web
```

## Routes

- `/` – landing
- `/story/[shareToken]` – story view (loads from API, shows moments and images)
