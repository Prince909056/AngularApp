# Copilot Instructions for AngularApp

## Project Overview
- This is an Angular 20+ application scaffolded with Angular CLI, using SCSS for styles and supporting SSR (Server-Side Rendering) via `@angular/ssr` and Express.
- The main entry points are `src/main.ts` (browser) and `src/main.server.ts` (server/SSR). The Express server is defined in `src/server.ts`.
- The root Angular component is `src/app/app.ts` with its template in `src/app/app.html` and styles in `src/app/app.scss`.

## Build, Run, and Test Workflows
- **Development server:** `npm start` or `ng serve` (browser at `http://localhost:4200/`).
- **SSR server:** Build and run with `ng build` then `npm run serve:ssr:AngularApp` (serves SSR via Express).
- **Unit tests:** `npm test` or `ng test` (Karma runner).
- **End-to-end tests:** `ng e2e` (no framework included by default).

## Key Architectural Patterns
- **Component structure:** All UI logic is in `src/app/` with a single root component (`App`).
- **Routing:** Client routes in `app.routes.ts` (currently empty), server routes in `app.routes.server.ts` (prerender all by default).
- **Configuration:** Shared config in `app.config.ts`, SSR-specific config in `app.config.server.ts` (merged for SSR).
- **Signals:** Uses Angular signals for state (see `App` class).
- **Styling:** SCSS is enforced for all components (see `angular.json` and schematics).
- **Static assets:** Served from `public/` and referenced in build config.

## Conventions & Patterns
- **Prettier config:** Enforced formatting for HTML via Prettier in `package.json`.
- **SSR integration:** Express server (`server.ts`) handles static files and delegates all other requests to Angular SSR engine.
- **Environment variables:** Server port is set via `PORT` env var or defaults to 4000.
- **Placeholder template:** The root template (`app.html`) is a placeholder and can be replaced.

## External Dependencies
- Major dependencies: `@angular/*`, `@angular/ssr`, `express`, `rxjs`.
- Dev dependencies: `@angular/cli`, `@angular/build`.

## Examples
- To add a new component: `ng generate component <name>` (SCSS enforced).
- To add a new route: Update `app.routes.ts` for client, `app.routes.server.ts` for SSR.
- To extend SSR: Add Express endpoints in `server.ts`.

## Key Files
- `src/main.ts`, `src/main.server.ts`, `src/server.ts`, `src/app/app.ts`, `src/app/app.html`, `src/app/app.config.ts`, `src/app/app.config.server.ts`, `angular.json`, `package.json`

---
If any conventions or workflows are unclear, please request clarification or examples from the user.
