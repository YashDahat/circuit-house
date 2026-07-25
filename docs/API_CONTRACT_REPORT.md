# API Contract Report

Effective client baseURL: `(empty)`

## Mismatches (0)
_None — every resolvable frontend call maps to a backend route._

## Backend routes (26)
- DELETE /api/v1/admin/events/*
- DELETE /api/v1/admin/menu/*
- DELETE /api/v1/admin/reservations/*
- GET /api/admin/orders
- GET /api/admin/orders/*
- GET /api/v1/admin/events
- GET /api/v1/admin/events/*
- GET /api/v1/admin/menu
- GET /api/v1/admin/menu/*
- GET /api/v1/admin/reservations
- GET /api/v1/admin/reservations/*
- GET /api/v1/events
- GET /api/v1/menu
- GET /api/v1/menu/*
- GET /api/v1/menu/category/*
- POST /api/orders
- POST /api/v1/admin/events
- POST /api/v1/admin/menu
- POST /api/v1/auth/login
- POST /api/v1/payments/initiate
- POST /api/v1/payments/webhook
- POST /api/v1/reservations
- PUT /api/admin/orders/*/status
- PUT /api/v1/admin/events/*
- PUT /api/v1/admin/menu/*
- PUT /api/v1/admin/reservations/*/status

## Frontend calls (26)
- POST /api/v1/payments/initiate
- POST /api/v1/payments/webhook
- POST /api/v1/auth/login
- GET /api/v1/events
- GET /api/v1/admin/events
- GET /api/v1/admin/events/${id}
- POST /api/v1/admin/events
- PUT /api/v1/admin/events/${id}
- DELETE /api/v1/admin/events/${id}
- GET /api/v1/menu
- GET /api/v1/menu/category/${category}
- GET /api/v1/menu/${id}
- POST /api/v1/admin/menu
- PUT /api/v1/admin/menu/${id}
- DELETE /api/v1/admin/menu/${id}
- GET /api/v1/admin/menu
- GET /api/v1/admin/menu/${id}
- POST /api/orders
- GET /api/admin/orders
- GET /api/admin/orders/${orderId}
- PUT /api/admin/orders/${orderId}/status
- POST /api/v1/reservations
- GET /api/v1/admin/reservations
- GET /api/v1/admin/reservations/${id}
- PUT /api/v1/admin/reservations/${id}/status
- DELETE /api/v1/admin/reservations/${id}
