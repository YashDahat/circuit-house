# Smoke Flow Report

Probed live at `http://smoke-55ce8f6c:8080` — 5 of 7 journeys working.

These are runtime journeys, not compilation. Everything below compiled cleanly.

## Broken (2)

- **admin GET /api/v1/admin/reservations** — 403 — logged-in admin is denied; role authority mismatch or matcher gap
- **admin GET /api/v1/admin/orders** — 403 — logged-in admin is denied; role authority mismatch or matcher gap

## Working (5)

- public GET /api/v1/menu/items — 200
- public GET /api/v1/menu/categories — 200
- public GET /api/v1/events — 200
- public GET /api/v1/events/upcoming — 200
- admin login — 200 as user@example.com (seeded by DataSeeder.java)
