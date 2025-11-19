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

### Environment variables

Firebase is required for authentication and client management. Create a `.env` file (or configure the variables in your deployment platform such as Netlify) using the keys listed in `.env.example`:

```
VITE_FIREBASE_API_KEY=...
VITE_FIREBASE_AUTH_DOMAIN=...
VITE_FIREBASE_PROJECT_ID=...
VITE_FIREBASE_STORAGE_BUCKET=...
VITE_FIREBASE_MESSAGING_SENDER_ID=...
VITE_FIREBASE_APP_ID=...
```

If any of these values are missing at build time, the app now surfaces a descriptive error to help you spot misconfigured environments instead of failing with the generic `auth/invalid-api-key` message.
