import React from 'react';

const LocationMap: React.FC = () => {
  const restaurantAddress = "123 Main Street, Anytown, USA 12345";
  const restaurantPhone = "(123) 456-7890";
  const restaurantEmail = "info@circuithouse.com";
  const openingHours = [
    "Monday - Friday: 11:00 AM - 10:00 PM",
    "Saturday: 10:00 AM - 11:00 PM",
    "Sunday: 10:00 AM - 9:00 PM",
  ];

  const googleMapsEmbedUrl = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.298007789498!2d-122.4194158846816!3d37.7749292797598!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8085808c8e8e8e8e%3A0x8e8e8e8e8e8e8e8e!2sGolden%20Gate%20Bridge!5e0!3m2!1sen!2sus!4v1678901234567!5m2!1sen!2sus"; // Replace with actual restaurant location

  return (
    <section className="py-16 px-4 bg-white">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-2xl md:text-3xl font-semibold text-[#2D3748] mb-8">Find Us</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
          <div className="text-left">
            <h3 className="text-xl font-semibold text-[#2D3748] mb-4">Our Location</h3>
            <p className="text-[#2D3748] mb-2">{restaurantAddress}</p>
            <p className="text-[#2D3748] mb-2">Phone: {restaurantPhone}</p>
            <p className="text-[#2D3748] mb-4">Email: {restaurantEmail}</p>

            <h3 className="text-xl font-semibold text-[#2D3748] mb-4">Opening Hours</h3>
            <ul className="list-none p-0">
              {openingHours.map((hour, index) => (
                <li key={index} className="text-[#2D3748] mb-1">
                  {hour}
                </li>
              ))}
            </ul>
          </div>
          <div className="w-full h-[300px] md:h-[400px] bg-gray-200 rounded-xl overflow-hidden shadow-md">
            <iframe
              src={googleMapsEmbedUrl}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen={true}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Restaurant Location"
            ></iframe>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LocationMap;