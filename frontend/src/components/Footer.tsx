import type { JSX } from 'react';
import React from 'react';

export default function Footer(): JSX.Element {
  return (
    <footer className="bg-[#1A202C] text-white py-8">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Contact Info */}
        <div>
          <h3 className="text-xl font-semibold mb-4 text-[#D69E2E]">Contact Us</h3>
          <p className="mb-2">123 Main Street, Anytown, USA</p>
          <p className="mb-2">Phone: (123) 456-7890</p>
          <p className="mb-2">Email: info@circuithouse.com</p>
        </div>
    
        {/* Opening Hours */}
        <div>
          <h3 className="text-xl font-semibold mb-4 text-[#D69E2E]">Opening Hours</h3>
          <p className="mb-2">Monday - Friday: 11:00 AM - 10:00 PM</p>
          <p className="mb-2">Saturday - Sunday: 10:00 AM - 11:00 PM</p>
        </div>
    
        {/* Social Media */}
        <div>
          <h3 className="text-xl font-semibold mb-4 text-[#D69E2E]">Follow Us</h3>
          <div className="flex space-x-4">
            <a href="#" className="hover:text-[#D69E2E] transition-colors duration-200">
              Facebook
            </a>
            <a href="#" className="hover:text-[#D69E2E] transition-colors duration-200">
              Instagram
            </a>
            <a href="#" className="hover:text-[#D69E2E] transition-colors duration-200">
              Twitter
            </a>
          </div>
        </div>
      </div>
      <div className="mt-8 text-center text-gray-400">
        &copy; {new Date().getFullYear()} Circuit House. All rights reserved.
      </div>
    </footer>
  );
}
