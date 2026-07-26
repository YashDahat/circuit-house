export interface GeoCoordinates {
  latitude: number;
  longitude: number;
}

export interface OpeningHoursSpecification {
  dayOfWeek: string | string[];
  opens: string;
  closes: string;
}

export interface RestaurantSchema {
  "@context": "http://schema.org";
  "@type": "Restaurant";
  name: string;
  address: {
    "@type": "PostalAddress";
    streetAddress: string;
    addressLocality: string;
    addressRegion: string;
    postalCode: string;
    addressCountry: string;
  };
  geo: {
    "@type": "GeoCoordinates";
    latitude: number;
    longitude: number;
  };
  telephone: string;
  openingHoursSpecification: OpeningHoursSpecification[];
  menu: string;
  acceptsReservations: string;
  image?: string;
  url?: string;
}

export const generateRestaurantSchema = (
  name: string,
  streetAddress: string,
  addressLocality: string,
  addressRegion: string,
  postalCode: string,
  addressCountry: string,
  phone: string,
  coordinates: GeoCoordinates,
  openingHours: OpeningHoursSpecification[],
  menuUrl: string,
  reservationUrl: string,
  imageUrl?: string,
  url?: string
): RestaurantSchema => {
  return {
    "@context": "http://schema.org",
    "@type": "Restaurant",
    name,
    address: {
      "@type": "PostalAddress",
      streetAddress,
      addressLocality,
      addressRegion,
      postalCode,
      addressCountry,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: coordinates.latitude,
      longitude: coordinates.longitude,
    },
    telephone: phone,
    openingHoursSpecification: openingHours,
    menu: menuUrl,
    acceptsReservations: reservationUrl,
    ...(imageUrl && { image: imageUrl }),
    ...(url && { url: url }),
  };
};

export const embedSchema = (schema: object) => {
  const script = document.createElement("script");
  script.type = "application/ld+json";
  script.innerHTML = JSON.stringify(schema);
  document.head.appendChild(script);
};