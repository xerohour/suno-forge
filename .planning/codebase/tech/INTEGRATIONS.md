# External Integrations

**Analysis Date:** 2024-07-29

## APIs & External Services

**AI/ML:**
- OpenAI API - Used for AI model interactions (e.g., text generation, vision processing).
  - SDK/Client: `openai`
  - Auth: API Key (likely from environment variables)

**Backend as a Service (BaaS):**
- Supabase - Used for database, authentication, and potentially other backend services.
  - SDK/Client: `@supabase/supabase-js`
  - Auth: Project URL and Anon Key (likely from environment variables)

## Data Storage

**Databases:**
- Supabase PostgreSQL - Likely used as the primary data store.
  - Connection: `SUPABASE_URL`, `SUPABASE_ANON_KEY` (expected environment variables)
  - Client: `@supabase/supabase-js`

**File Storage:**
- Not explicitly detected, but Supabase provides Storage, which might be used. (Local filesystem only for temporary assets, if any).

**Caching:**
- None explicitly detected.

## Authentication & Identity

**Auth Provider:**
- Supabase Auth - Likely used for user authentication and management.
  - Implementation: Via `@supabase/supabase-js` client.

## Monitoring & Observability

**Error Tracking:**
- None explicitly detected.

**Logs:**
- Standard console logging (`console.log`, `console.error`) likely used, output handled by the hosting environment (e.g., Vercel logs).

## CI/CD & Deployment

**Hosting:**
- Next.js application, commonly deployed on Vercel or similar platforms.

**CI Pipeline:**
- None explicitly detected in `package.json` scripts or config files. Likely external CI/CD service configuration.

## Environment Configuration

**Required env vars:**
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `OPENAI_API_KEY`
- Other potential service-specific keys.

**Secrets location:**
- `.env.local`, `.env.development`, `.env.production` files (not read), managed by deployment platform.

## Webhooks & Callbacks

**Incoming:**
- `app/api/batch/route.ts`: API route for batch processing.
- `app/api/generate/route.ts`: API route for content generation.
- `app/api/mutate/route.ts`: API route for data mutation.
- `app/api/vision/route.ts`: API route for vision-related processing.

**Outgoing:**
- Not explicitly detected, but can be implemented via Supabase functions or custom API routes if needed.

---

*Integration audit: 2024-07-29*
