# API Contract Report

Effective client baseURL: `(empty)`

## Mismatches (0)
_None — every resolvable frontend call maps to a backend route._

## Backend routes (37)
- DELETE /api/v1/admin/events/*
- DELETE /api/v1/admin/menus/categories/*
- DELETE /api/v1/admin/menus/items/*
- DELETE /api/v1/admin/reservations/*
- DELETE /api/v1/admin/testimonials/*
- GET /api/v1/admin/events
- GET /api/v1/admin/events/*
- GET /api/v1/admin/orders
- GET /api/v1/admin/orders/status/*
- GET /api/v1/admin/reservations
- GET /api/v1/admin/reservations/*
- GET /api/v1/admin/reservations/status/*
- GET /api/v1/admin/testimonials
- GET /api/v1/admin/testimonials/*
- GET /api/v1/events
- GET /api/v1/events/*
- GET /api/v1/menus/categories
- GET /api/v1/menus/items
- GET /api/v1/menus/items/category/*
- GET /api/v1/orders/*
- GET /api/v1/testimonials
- POST /api/v1/admin/events
- POST /api/v1/admin/menus/categories
- POST /api/v1/admin/menus/items
- POST /api/v1/admin/testimonials
- POST /api/v1/auth/login
- POST /api/v1/orders
- POST /api/v1/payments/create-order
- POST /api/v1/payments/verify
- POST /api/v1/payments/webhook
- POST /api/v1/reservations
- PUT /api/v1/admin/events/*
- PUT /api/v1/admin/menus/categories/*
- PUT /api/v1/admin/menus/items/*
- PUT /api/v1/admin/orders/*/status
- PUT /api/v1/admin/reservations/*/status
- PUT /api/v1/admin/testimonials/*

## Frontend calls (37)
- POST /api/v1/payments/verify
- POST /api/v1/payments/webhook
- POST /api/v1/auth/login
- GET /api/v1/events
- GET /api/v1/events/${id}
- GET /api/v1/admin/events
- GET /api/v1/admin/events/${id}
- POST /api/v1/admin/events
- PUT /api/v1/admin/events/${id}
- DELETE /api/v1/admin/events/${id}
- GET /api/v1/menus/items
- GET /api/v1/menus/items/category/${categoryId}
- GET /api/v1/menus/categories
- POST /api/v1/admin/menus/items
- PUT /api/v1/admin/menus/items/${id}
- DELETE /api/v1/admin/menus/items/${id}
- POST /api/v1/admin/menus/categories
- PUT /api/v1/admin/menus/categories/${id}
- DELETE /api/v1/admin/menus/categories/${id}
- GET /api/v1/testimonials
- GET /api/v1/admin/testimonials
- GET /api/v1/admin/testimonials/${id}
- POST /api/v1/admin/testimonials
- PUT /api/v1/admin/testimonials/${id}
- DELETE /api/v1/admin/testimonials/${id}
- POST /api/v1/payments/create-order
- POST /api/v1/orders
- GET /api/v1/orders/${orderId}
- GET /api/v1/admin/orders
- GET /api/v1/admin/orders/status/${status}
- PUT /api/v1/admin/orders/${id}/status
- POST /api/v1/reservations
- GET /api/v1/admin/reservations
- GET /api/v1/admin/reservations/${id}
- GET /api/v1/admin/reservations/status/${status}
- PUT /api/v1/admin/reservations/${id}/status
- DELETE /api/v1/admin/reservations/${id}
