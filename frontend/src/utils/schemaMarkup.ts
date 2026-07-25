export const getRestaurantSchema = () => {
  return {
    "@context": "http://schema.org",
    "@type": "Restaurant",
    "name": "Circuit House",
    "image": "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=1920&q=80",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "123 Main St",
      "addressLocality": "Anytown",
      "addressRegion": "CA",
      "postalCode": "90210",
      "addressCountry": "US"
    },
    "telephone": "+1-555-123-4567",
    "url": "http://www.circuithouse.com",
    "servesCuisine": "Modern American",
    "priceRange": "$$",
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday"
        ],
        "opens": "11:00",
        "closes": "22:00"
      },
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": [
          "Saturday",
          "Sunday"
        ],
        "opens": "10:00",
        "closes": "23:00"
      }
    ],
    "menu": "http://www.circuithouse.com/menu",
    "acceptsReservations": "True"
  };
};