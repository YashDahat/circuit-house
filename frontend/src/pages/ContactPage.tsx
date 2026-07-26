import React from 'react';
import Layout from '@/components/Layout';
import { ContactInfoCard } from '@/components/contact/ContactInfoCard';
import GoogleMapsEmbed from '@/components/contact/GoogleMapsEmbed';

const ContactPage: React.FC = () => {
  const address = "Laxman Nagar, Baner, Pune, Maharashtra 411045";
  const phone = "070587 56269";
  const whatsappNumber = "917058756269"; // Assuming Indian number, without '+'

  return (
    <Layout>
      <section className="relative h-[300px] md:h-[400px] bg-cover bg-center flex items-center justify-center" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=1920&q=80)' }}>
        <div className="absolute inset-0 bg-black bg-opacity-50" />
        <div className="relative z-10 text-center text-white">
          <h1 className="text-4xl md:text-6xl font-bold">Contact Us</h1>
          <p className="mt-4 text-lg md:text-xl">We'd love to hear from you!</p>
        </div>
      </section>

      <section className="py-16 px-4 bg-white">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
          <div className="space-y-8">
            <h2 className="text-2xl md:text-3xl font-semibold text-[#2D3748]">Reach Out to Circuit House</h2>
            <p className="text-[#2D3748] leading-relaxed">
              Whether you have a question about our menu, want to make a reservation, or simply want to say hello,
              we're here to help. Feel free to contact us through any of the methods below.
            </p>
            <ContactInfoCard address={address} phone={phone} whatsappNumber={whatsappNumber} />
          </div>
          <div className="w-full">
            <GoogleMapsEmbed />
          </div>
        </div>
      </section>

      <section className="py-16 px-4 bg-[#F7FAFC]">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-semibold text-[#2D3748]">Our Hours</h2>
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 text-[#2D3748]">
            <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
              <h3 className="font-medium text-lg text-[#2D3748]">Monday - Friday</h3>
              <p className="mt-2">11:00 AM - 10:00 PM</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
              <h3 className="font-medium text-lg text-[#2D3748]">Saturday</h3>
              <p className="mt-2">10:00 AM - 11:00 PM</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
              <h3 className="font-medium text-lg text-[#2D3748]">Sunday</h3>
              <p className="mt-2">10:00 AM - 09:00 PM</p>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default ContactPage;