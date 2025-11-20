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

### Notes on admin tooling

The original Firebase-backed admin tools have been replaced with demo-friendly, local data (see
`src/data/sampleClients.ts`). Update this file with your own success stories to customise the
client-management pages without needing any backend infrastructure.
