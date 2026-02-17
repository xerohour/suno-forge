---
name: Next.js Development
description: Common Next.js App Router development tasks and troubleshooting
---

# Next.js Development Skill

This skill provides guidance for working with Next.js App Router projects, specifically for the suno-forge codebase.

## Development Server

### Starting the Dev Server
```bash
npm run dev
```
The app will be available at `http://localhost:3000`

### Common Dev Server Issues

**Port Already in Use:**
```bash
# Kill process on port 3000 (Windows)
Get-Process -Id (Get-NetTCPConnection -LocalPort 3000).OwningProcess | Stop-Process

# Or use a different port
npm run dev -- -p 3001
```

**Cache Issues:**
```bash
# Clear Next.js cache
Remove-Item -Recurse -Force .next
npm run dev
```

## Building and Type Checking

### Full Validation Flow
```bash
# Type check without emitting files
npx tsc --noEmit

# Run tests
npm test

# Build for production
npm run build
```

### Fixing Type Errors
- Check `tsconfig.json` for strict mode settings
- Ensure all API route handlers return `NextResponse`
- Verify types in `types/` directory match actual usage

## API Routes (App Router)

### Creating New API Routes
API routes in App Router use `route.ts` files:

```typescript
// app/api/example/route.ts
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    // Process request
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
```

### Testing API Routes
```bash
# Using curl (PowerShell)
Invoke-RestMethod -Uri "http://localhost:3000/api/generate" -Method POST -Body '{"style":"jazz"}' -ContentType "application/json"

# Or use the browser console
fetch('/api/generate', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ style: 'jazz' })
}).then(r => r.json()).then(console.log)
```

## Environment Variables

### Required Variables
Check `.env.local` for:
- `OPENAI_API_KEY` - For AI-powered features
- `NEXT_PUBLIC_SUPABASE_URL` - Supabase project URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` - Supabase anon key

### Adding New Variables
1. Add to `.env.local` (never commit this file)
2. Add to `.env.example` as a template
3. Access in code:
   - Client-side: `process.env.NEXT_PUBLIC_*`
   - Server-side: `process.env.*`

## Hot Reload Issues

If changes aren't reflecting:
1. Check terminal for compilation errors
2. Hard refresh browser (Ctrl+Shift+R)
3. Restart dev server
4. Clear `.next` directory

## Performance Optimization

### Analyzing Bundle Size
```bash
npm run build
# Check output for page sizes
```

### Common Optimizations
- Use dynamic imports for heavy components
- Implement proper loading states
- Use Next.js Image component for images
- Enable React Server Components where possible
