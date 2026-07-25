import React from 'react';

const ContactInfo: React.FC = () => {
  return (
    <div className="bg-white p-8 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold text-[#2D3748] mb-6">Contact Information</h2>
      <div className="space-y-4">
        <div>
          <h3 className="text-lg font-medium text-[#2D3748]">Address</h3>
          <p className="text-[#2D3748]">Laxman Nagar, Baner, Pune, Maharashtra 411045</p>
        </div>
        <div>
          <h3 className="text-lg font-medium text-[#2D3748]">Phone</h3>
          <p className="text-[#2D3748]">070587 56269</p>
        </div>
        <div>
          <h3 className="text-lg font-medium text-[#2D3748]">Opening Hours</h3>
          <p className="text-[#2D3748]">Monday - Sunday: 11:00 AM - 11:00 PM</p>
        </div>
      </div>
    </div>
  );
};

export default ContactInfo;