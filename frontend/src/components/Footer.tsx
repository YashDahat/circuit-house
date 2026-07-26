import { Link } from 'react-router-dom';
import { Share2, Camera, Globe } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-[#1A202C] text-white py-12 px-4">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Contact Info */}
        <div className="md:col-span-1">
          <h3 className="text-xl font-semibold mb-4 text-[#D69E2E]">Circuit House</h3>
          <p className="text-gray-300 mb-2">Laxman Nagar, Baner,</p>
          <p className="text-gray-300 mb-2">Pune, Maharashtra 411045</p>
          <p className="text-gray-300 mb-2">Phone: 070587 56269</p>
          <p className="text-gray-300">Email: info@circuithouse.com</p>
        </div>

        {/* Opening Hours */}
        <div className="md:col-span-1">
          <h3 className="text-xl font-semibold mb-4 text-[#D69E2E]">Opening Hours</h3>
          <p className="text-gray-300 mb-2">Monday - Friday: 9 AM - 10 PM</p>
          <p className="text-gray-300 mb-2">Saturday: 10 AM - 11 PM</p>
          <p className="text-gray-300">Sunday: 10 AM - 9 PM</p>
        </div>

        {/* Quick Links */}
        <div className="md:col-span-1">
          <h3 className="text-xl font-semibold mb-4 text-[#D69E2E]">Quick Links</h3>
          <ul>
            <li className="mb-2">
              <Link to="/privacy-policy" className="text-gray-300 hover:text-[#D69E2E] transition-all duration-200">
                Privacy Policy
              </Link>
            </li>
            <li className="mb-2">
              <Link to="/terms-of-service" className="text-gray-300 hover:text-[#D69E2E] transition-all duration-200">
                Terms of Service
              </Link>
            </li>
            <li className="mb-2">
              <Link to="/faq" className="text-gray-300 hover:text-[#D69E2E] transition-all duration-200">
                FAQ
              </Link>
            </li>
            <li>
              <Link to="/careers" className="text-gray-300 hover:text-[#D69E2E] transition-all duration-200">
                Careers
              </Link>
            </li>
          </ul>
        </div>

        {/* Social Media */}
        <div className="md:col-span-1">
          <h3 className="text-xl font-semibold mb-4 text-[#D69E2E]">Follow Us</h3>
          <div className="flex space-x-4">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-[#D69E2E] transition-all duration-200">
              <Share2 size={24} />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-[#D69E2E] transition-all duration-200">
              <Camera size={24} />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-[#D69E2E] transition-all duration-200">
              <Globe size={24} />
            </a>
          </div>
        </div>
      </div>

      <div className="mt-10 pt-8 border-t border-gray-700 text-center text-gray-400">
        <p>&copy; {new Date().getFullYear()} Circuit House. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;