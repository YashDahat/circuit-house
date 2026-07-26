# Smoke Flow Report

Probed live at `http://smoke-1cc6859f:8080` — 4 of 5 journeys working.

These are runtime journeys, not compilation. Everything below compiled cleanly.

## Broken (1)

- **admin login** — every seeded credential rejected at /api/v1/auth/login: admin@example.com/admin123→401

## Working (4)

- public GET /api/v1/menus/items — 200
- public GET /api/v1/menus/categories — 200
- public GET /api/v1/events — 200
- public GET /api/v1/testimonials — 200
