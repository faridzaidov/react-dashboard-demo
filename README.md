# React Dashboard Demo

A portfolio demo app built with **React + Vite** that showcases three core frontend skills:
client-side routing, live API integration with proper state handling, and accessible form
validation — all without any UI library.

## What this app demonstrates

### 1. React Router (client-side routing)
Three routes wired up with `react-router-dom` v6:

| Route | Description |
|---|---|
| `/` | User list — fetched from a public API |
| `/users/:id` | User detail — fetched by dynamic URL param |
| `/contact` | Contact form with real validation |

### 2. API integration with loading / error states
The Users page manages three explicit states:

- **Loading** — animated spinner while the request is in flight
- **Success** — responsive card grid populated with live data
- **Error** — clear error message with a **Retry** button that re-triggers the fetch

Data is fetched from [JSONPlaceholder](https://jsonplaceholder.typicode.com/users), a free
public REST API. All fetch calls live in `src/api/api.js` — pages just call functions, not
raw `fetch`.

### 3. Form validation (Contact page)
- Inline error messages appear per-field **after** the user has touched that field.
- Submitting an incomplete form marks every field as touched and shows all errors at once.
- Validation rules: name ≥ 2 chars · email format check · message ≥ 10 chars.
- On valid submit a 1.2 s simulated delay plays, then a success screen replaces the form.
- The form uses `aria-invalid` and `aria-describedby` for screen-reader accessibility.

## Folder structure

```
src/
├── api/
│   └── api.js            # All fetch calls in one place
├── components/
│   ├── Navbar.jsx        # Sticky top nav with active-link highlight
│   ├── Spinner.jsx       # Reusable loading spinner
│   └── UserCard.jsx      # Card used in the list grid
├── pages/
│   ├── UsersPage.jsx           # "/" — list with loading/error/success states
│   ├── UserDetailPage.jsx      # "/users/:id" — single user profile
│   ├── ContactPage.jsx         # "/contact" — validated contact form
│   └── NotFoundPage.jsx        # Catch-all 404
├── App.jsx               # BrowserRouter + Routes
├── main.jsx              # React entry point
└── index.css             # Global resets and base styles
```

## Running locally

```bash
# 1. Install dependencies
npm install

# 2. Start the dev server (hot-reload enabled)
npm run dev

# 3. Open http://localhost:5173 in your browser

# Build for production
npm run build
```

**Requirements:** Node.js 18+ and npm 9+.

## Tech choices

| What | Why |
|---|---|
| Vite | Instant HMR, fast production builds, no config needed |
| React Router v6 | Industry standard, declarative `<Routes>` API |
| CSS Modules | Zero-dependency scoped styles; no class-name collisions |
| JSONPlaceholder | Free, reliable, CORS-friendly public REST API |
