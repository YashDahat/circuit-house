import React from 'react';

const LocationMap: React.FC = () => {
  const latitude = 18.570737;
  const longitude = 73.776369;
  const mapUrl = `https://www.google.com/maps/embed/v1/place?key=YOUR_GOOGLE_MAPS_API_KEY&q=${latitude},${longitude}`;

  return (
    <section className="py-16 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-semibold text-center mb-8 text-[#2D3748]">Find Us Here</h2>
        <div className="relative w-full h-[400px] md:h-[500px] rounded-lg overflow-hidden shadow-lg">
          <iframe
            title="Restaurant Location"
            width="100%"
            height="100%"
            loading="lazy"
            allowFullScreen={true}
            referrerPolicy="no-referrer-when-downgrade"
            src={mapUrl}
          ></iframe>
        </div>
        <p className="text-center text-sm text-gray-500 mt-4">
          (Note: Replace 'YOUR_GOOGLE_MAPS_API_KEY' with your actual Google Maps API key for the map to display correctly.)
        </p>
      </div>
    </section>
  );
};

export default LocationMap;