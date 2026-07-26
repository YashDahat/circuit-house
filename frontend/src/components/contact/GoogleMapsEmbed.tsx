import React from 'react';

const GoogleMapsEmbed: React.FC = () => {
  const latitude = 18.570737;
  const longitude = 73.776449;
  const mapUrl = `https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3781.936611593309!2d${longitude - 0.005}!3d${latitude}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2bf21c431221b%3A0x1a2e9b0b4b0e9b0b!2sCircuit%20House!5e0!3m2!1sen!2sin!4v1678888888888!5m2!1sen!2sin`;

  return (
    <div className="relative h-[400px] md:h-[500px] w-full overflow-hidden rounded-xl shadow-md border border-gray-100">
      <iframe
        src={mapUrl}
        width="100%"
        height="100%"
        style={{ border: 0 }}
        allowFullScreen={true}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        title="Circuit House Location"
        className="absolute inset-0"
      ></iframe>
    </div>
  );
};

export default GoogleMapsEmbed;