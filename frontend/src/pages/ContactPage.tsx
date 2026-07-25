import React from 'react';
import Layout from '@/components/Layout';
import ContactInfo from '@/components/contact/ContactInfo';
import GoogleMapsEmbed from '@/components/contact/GoogleMapsEmbed';
import { ROUTES } from '@/routes';
import { Link } from 'react-router-dom';

const ContactPage: React.FC = () => {
  const restaurantAddress = "123 Main Street, Anytown, CA 90210";

  return (
    <Layout>
      <section className="relative h-[400px] md:h-[500px] bg-cover bg-center flex items-center justify-center" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=1920&q=80)' }}>
        <div className="absolute inset-0 bg-black bg-opacity-50" />
        <div className="relative z-10 text-center text-white">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">Contact Us</h1>
          <p className="text-lg md:text-xl">We'd love to hear from you!</p>
        </div>
      </section>

      <section className="py-16 px-4 bg-white">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
          <div>
            <h2 className="text-2xl md:text-3xl font-semibold text-[#2D3748] mb-6">Get in Touch</h2>
            <ContactInfo />
            <div className="mt-8">
              <h3 className="text-xl font-semibold text-[#2D3748] mb-4">Opening Hours</h3>
              <ul className="text-lg text-[#2D3748] space-y-2">
                <li>Monday - Friday: 11:00 AM - 10:00 PM</li>
                <li>Saturday - Sunday: 10:00 AM - 11:00 PM</li>
              </ul>
            </div>
          </div>
          <div>
            <h2 className="text-2xl md:text-3xl font-semibold text-[#2D3748] mb-6">Our Location</h2>
            <GoogleMapsEmbed address={restaurantAddress} />
            <p className="mt-4 text-center text-lg text-[#2D3748]">
              Visit us at <span className="font-semibold">{restaurantAddress}</span>
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 px-4 bg-[#F7FAFC] text-center">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-semibold text-[#2D3748] mb-6">Have a question or want to book a table?</h2>
          <p className="text-lg text-[#2D3748] mb-8">
            Reach out to us directly or use our online reservation system.
          </p>
          <Link
            to={ROUTES.RESERVATION}
            className="bg-[#D69E2E] hover:bg-[#c28b29] text-white font-semibold rounded-full px-8 py-3 transition-all duration-200 inline-block"
          >
            Book a Table
          </Link>
        </div>
      </section>
    </Layout>
  );
};

export default ContactPage;