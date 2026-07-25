import Layout from '@/components/layout/Layout';
import { ContactForm } from '@/components/contact/ContactForm';
import ContactInfo from '@/components/contact/ContactInfo';
import LocationMap from '@/components/contact/LocationMap';

const ContactPage: React.FC = () => {
  return (
    <Layout>
      <section className="py-16 px-4 bg-[#F7FAFC]">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-center mb-12 text-[#2D3748]">Contact Us</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <ContactInfo />
            <ContactForm />
          </div>
        </div>
      </section>
      <LocationMap />
    </Layout>
  );
};

export default ContactPage;