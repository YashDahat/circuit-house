import React from 'react';

interface GoogleMapsEmbedProps {
  address: string;
}

const GoogleMapsEmbed: React.FC<GoogleMapsEmbedProps> = ({ address }) => {
  const encodedAddress = encodeURIComponent(address);
  const mapSrc = `https://www.google.com/maps/embed/v1/place?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&q=${encodedAddress}`;

  return (
    <div className="w-full h-[400px] rounded-lg overflow-hidden shadow-lg">
      <iframe
        width="100%"
        height="100%"
        style={{ border: 0 }}
        loading="lazy"
        allowFullScreen
        src={mapSrc}
        title="Google Maps Location"
      ></iframe>
    </div>
  );
};

export default GoogleMapsEmbed;