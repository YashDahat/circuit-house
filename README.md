# Circuit House

Auto-generated website for Circuit House — Restaurant, Laxman Nagar, Baner, Pune, Maharashtra 411045.

## Tech Stack

- **backend**: Managed by an integrated restaurant platform (e.g., DineOpen, TouchBistro) to handle POS, orders, and reservations seamlessly.
- **hosting**: Included with the restaurant platform. If custom, Vercel for Next.js or a managed cloud provider like AWS/DigitalOcean.
- **database**: Managed by the chosen platform (e.g., PostgreSQL or MySQL).
- **frontend**: Platform-based (e.g., UpMenu, Square Online) for speed-to-market and integration. If custom, Next.js for performance and SEO.

## Features

- Integrated Online Reservation System
- Online Ordering with Payment Gateway (UPI, Cards)
- Mobile-First Responsive Design
- Digital Menu with High-Quality Photos, Descriptions, and Prices
- Google Maps Integration with Directions
- Click-to-Call and WhatsApp Contact Buttons
- Schema Markup for Restaurants (for SEO)

## Running Locally

```bash
docker-compose up --build
```

The app will be available at http://localhost:8080

## Development

**Backend:**
```bash
cd backend && mvn spring-boot:run
```

**Frontend:**
```bash
cd frontend && npm install && npm run dev
```
