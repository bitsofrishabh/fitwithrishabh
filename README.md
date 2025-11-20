The Balance Diet
================

This project is a fitness coaching platform built with React, TypeScript and Vite. It uses the **shadcn/ui** component library for a modern dark UI with blue accents.

### Notes

- `@radix-ui/react-badge` has been removed since the package is unavailable from npm. A local `Badge` component is implemented in `src/components/ui/badge.tsx` and used throughout the app.

### Development

Install dependencies and run the development server:

```bash
npm install
npm run dev
```

Lint the project with:

```bash
npm run lint
```

### Current scope

The app now intentionally ships with **only two pages**:

- `/` (and `/workout-section`) – the workout library
- `/products` – curated product recommendations

For Netlify deployments, `public/_redirects` is included so all routes fall back to `index.html` (fixes mobile reload/404 issues on direct links).

All previous admin/auth flows were removed to keep the experience lean and content-focused.
