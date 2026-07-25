import React from 'react';
import { Phone, MapPin, MessageCircle } from 'lucide-react';

const ContactInfo: React.FC = () => {
  return (
    <div className="space-y-6 text-lg">
      <div className="flex items-center space-x-4">
        <MapPin className="text-[#D69E2E] flex-shrink-0" size={24} />
        <p className="text-[#2D3748]">
          123 Main Street, Anytown, CA 90210
        </p>
      </div>
      <div className="flex items-center space-x-4">
        <Phone className="text-[#D69E2E] flex-shrink-0" size={24} />
        <p className="text-[#2D3748]">
          <a href="tel:+15551234567" className="hover:underline transition-all duration-200">
            +1 (555) 123-4567
          </a>
        </p>
      </div>
      <div className="flex items-center space-x-4">
        <MessageCircle className="text-[#D69E2E] flex-shrink-0" size={24} />
        <p className="text-[#2D3748]">
          <a
            href="https://wa.me/15551234567"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:underline transition-all duration-200"
          >
            WhatsApp Us
          </a>
        </p>
      </div>
    </div>
  );
};

export default ContactInfo;