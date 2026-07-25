# API Contract Report

Effective client baseURL: `(empty)`

## Mismatches (0)
_None — every resolvable frontend call maps to a backend route._

## Backend routes (30)
- DELETE /api/v1/admin/events/*
- DELETE /api/v1/admin/menu/categories/*
- DELETE /api/v1/admin/menu/items/*
- DELETE /api/v1/admin/reservations/*
- GET /api/v1/admin/orders
- GET /api/v1/admin/reservations
- GET /api/v1/admin/reservations/status/*
- GET /api/v1/events
- GET /api/v1/events/*
- GET /api/v1/events/upcoming
- GET /api/v1/menu/categories
- GET /api/v1/menu/items
- GET /api/v1/menu/items/*
- GET /api/v1/menu/items/category/*
- GET /api/v1/orders/*
- GET /api/v1/orders/customer/*
- GET /api/v1/reservations/*
- POST /api/v1/admin/events
- POST /api/v1/admin/menu/categories
- POST /api/v1/admin/menu/items
- POST /api/v1/auth/login
- POST /api/v1/orders
- POST /api/v1/payments/initiate
- POST /api/v1/payments/verify
- POST /api/v1/reservations
- PUT /api/v1/admin/events/*
- PUT /api/v1/admin/menu/categories/*
- PUT /api/v1/admin/menu/items/*
- PUT /api/v1/admin/orders/*/status
- PUT /api/v1/admin/reservations/*/status

## Frontend calls (30)
- POST /api/v1/payments/initiate
- POST /api/v1/payments/verify
- POST /api/v1/auth/login
- GET /api/v1/events
- GET /api/v1/events/upcoming
- GET /api/v1/events/${id}
- POST /api/v1/admin/events
- PUT /api/v1/admin/events/${id}
- DELETE /api/v1/admin/events/${id}
- GET /api/v1/menu/items
- GET /api/v1/menu/items/${id}
- GET /api/v1/menu/items/category/${categoryName}
- GET /api/v1/menu/categories
- POST /api/v1/admin/menu/items
- PUT /api/v1/admin/menu/items/${id}
- DELETE /api/v1/admin/menu/items/${id}
- POST /api/v1/admin/menu/categories
- PUT /api/v1/admin/menu/categories/${id}
- DELETE /api/v1/admin/menu/categories/${id}
- POST /api/v1/orders
- GET /api/v1/orders/${orderId}
- GET /api/v1/orders/customer/${customerEmail}
- GET /api/v1/admin/orders
- PUT /api/v1/admin/orders/${orderId}/status
- POST /api/v1/reservations
- GET /api/v1/reservations/${id}
- GET /api/v1/admin/reservations
- GET /api/v1/admin/reservations/status/${status}
- PUT /api/v1/admin/reservations/${id}/status
- DELETE /api/v1/admin/reservations/${id}
