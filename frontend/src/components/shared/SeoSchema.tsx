import React from 'react';

interface SeoSchemaProps {
  name?: string;
  address?: {
    streetAddress: string;
    addressLocality: string;
    addressRegion: string;
    postalCode: string;
    addressCountry: string;
  };
  telephone?: string;
  geo?: {
    latitude: string;
    longitude: string;
  };
  cuisine?: string;
  priceRange?: string;
  url?: string;
  image?: string;
}

const SeoSchema: React.FC<SeoSchemaProps> = ({
  name = 'Circuit House',
  address = {
    streetAddress: 'Laxman Nagar',
    addressLocality: 'Pune',
    addressRegion: 'Maharashtra',
    postalCode: '411045',
    addressCountry: 'IN',
  },
  telephone = '07058756269',
  geo = {
    latitude: '18.570737',
    longitude: '73.776395',
  },
  cuisine = 'Indian, Continental',
  priceRange = '$$',
  url = 'https://www.circuithouse.com',
  image = 'https://www.circuithouse.com/logo.png', // Placeholder image URL
}) => {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Restaurant",
    "name": name,
    "image": image,
    "url": url,
    "address": {
      "@type": "PostalAddress",
      "streetAddress": address.streetAddress,
      "addressLocality": address.addressLocality,
      "addressRegion": address.addressRegion,
      "postalCode": address.postalCode,
      "addressCountry": address.addressCountry
    },
    "telephone": telephone,
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": geo.latitude,
      "longitude": geo.longitude
    },
    "servesCuisine": cuisine,
    "priceRange": priceRange,
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
          "Sunday"
        ],
        "opens": "11:00",
        "closes": "23:00"
      }
    ],
    "acceptsReservations": "True"
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
};

export default SeoSchema;