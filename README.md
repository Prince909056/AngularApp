## AngularApp

Angular v20 app with standalone components, client-side routing, HTTP layer with interceptors, token refresh, Tailwind CSS, and a modular feature/core/shared structure.

### Tech stack
- **Angular**: ^20.3
- **SSR tooling**: `@angular/ssr` (serve script included)
- **Styling**: Tailwind CSS
- **HTTP**: `HttpClient` wrapped by `HttpService`
- **Auth**: Interceptors for bearer token + refresh token flow
- **Notifications**: `ng-angular-popup`

## Getting started

### Prerequisites
- Node 20+
- Angular CLI 20+: `npm i -g @angular/cli`

### Install
```bash
npm install
```

### Run (development)
```bash
npm start
# or
ng serve
```
App runs at `http://localhost:4200/` with live reload.

### Build
```bash
npm run build
```
Artifacts output to `dist/`.

### Build Tailwind CSS (optional standalone)
```bash
npm run build:css
```
Generates `public/styles/tailwind.css`.

### Serve SSR build (after build)
```bash
npm run build && npm run serve:ssr:AngularApp
```

## Scripts
```bash
npm run start                 # ng serve
npm run build                 # ng build
npm run watch                 # ng build --watch --configuration development
npm run test                  # ng test (Karma)
npm run build:css             # Tailwind build from src/styles.scss
npm run serve:ssr:AngularApp  # Node serve dist/AngularApp/server/server.mjs
```

## Environments
Files under `src/environments/`:
- `environment.ts` (default)
- `environment.dev.ts`
- `environment.qa.ts`
- `environment.prod.ts`

Keys used:
- `server.baseUrl` — API base URL
- `google.googleClientId` — Google OAuth client id
- `ai.voiceAiUrl`, `ai.askAiUrl`, `ai.elevenLabAgentId` — AI integrations (placeholders)
- `stripe.publicKey` — Stripe publishable key

Ensure sensitive values are configured per environment before production use.

## Project structure (high-level)
- `src/app/core` — cross-cutting concerns
  - `constants` (`api-endpoints.constant.ts`, `api-routes.constant.ts`, `messages.constant.ts`)
  - `directives`, `enums`, `guards`
  - `interceptors` (`auth.interceptor.ts`, `error.interceptor.ts`)
  - `models` (API contracts, login models, pagination, theme)
  - `services` (`auth.service.ts`, `auth-token.service.ts`, `http.service.ts`, `storage.service.ts`, `navigation.service.ts`, `role-management.service.ts`, `theme.service.ts`, `toast-notification.service.ts`)
  - `utils`, `types`
- `src/app/features`
  - `auth` (login, signup, password flows, social login)
  - `dashboard`
  - `layout` (header, footer, sidebar)
- `src/app/shared`
  - `components` (loader, pagination, theme modal)
  - `services` (`loader.service.ts`)
  - `validators`, `styles`

## Routing
Defined in `src/app/app.routes.ts` with standalone route definitions:
- `/` → `DashboardComponent`
- `/dashboard` → `DashboardComponent`
- `/login` → `LoginComponent`

Feature route shells exist:
- `features/layout/layout.routes.ts` → `LayoutComponent` with child routes placeholder
- `features/auth/auth.routes.ts` → `AuthComponent`

## HTTP layer and interceptors
- `core/services/http.service.ts` wraps `HttpClient` and centralizes:
  - `get`, `post`, `delete`, `patch`, `postBlob`
  - Loader integration via `LoaderService`
  - Error piping via `catchError`

- `core/interceptors/auth.interceptor.ts`:
  - Attaches `Authorization: Bearer <accessToken>` when present
  - Skips token for refresh calls (`RefreshTokenAsync` in URL)
  - On 401, attempts refresh via `AuthService.refreshToken`, saves new tokens via `AuthTokenService`, retries original request

- `core/interceptors/error.interceptor.ts`:
  - Handles non-500 errors; on 401, coordinates refresh flow with `AuthService.isRefreshing` gate
  - Skips auth handling on public routes (e.g., `/login`, `/signup`)
  - Calls `NavigationService.goToLogin()` on logout

## Authentication flow
- Tokens saved/read under `StorageKeysEnum.AuthData` via `StorageService`/`AuthTokenService`
- `AuthService.logout()` clears storage but preserves `rememberMeData` and redirects to login, shows toast
- Refresh token endpoint configured via `API_ENDPOINTS.V1.LOGIN.REFRESH_TOKEN`

## UI & theming
- Tailwind configured via `tailwind.config.cjs` and `postcss.config.cjs`
- Global styles: `src/styles.scss`; design tokens in `shared/styles/_variables.scss`
- Shared components:
  - Loader: `shared/components/loader/*` + `shared/services/loader.service.ts`
  - Pagination: `shared/components/pagination/*`
  - Theme modal: `shared/components/theme-modal/*` + `core/services/theme.service.ts`
- Notifications via `core/services/toast-notification.service.ts` (`ng-angular-popup`)

## Code scaffolding
```bash
ng generate component component-name
ng generate directive|pipe|service|guard|resolver|class|interface|enum|module
```
For all schematics:
```bash
ng generate --help
```

## Testing
```bash
npm test
```

## Tips
- Keep environment secrets out of source control
- Prefer `HttpService` over direct `HttpClient` for consistency
- Extend feature routes under `layoutRoutes` and `authRoutes` as needed

## References
- Angular CLI docs: https://angular.dev/tools/cli
