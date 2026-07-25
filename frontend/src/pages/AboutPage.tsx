import Layout from '@/components/Layout';
import { Helmet } from 'react-helmet-async';
import { getRestaurantSchema } from '@/utils/schemaMarkup';

const AboutPage = () => {
  const restaurantSchema = getRestaurantSchema();

  return (
    <Layout>
      <Helmet>
        <title>About Us | Circuit House</title>
        <meta name="description" content="Learn about Circuit House restaurant's story, mission, and culinary philosophy." />
        {restaurantSchema && (
          <script type="application/ld+json">
            {JSON.stringify(restaurantSchema)}
          </script>
        )}
      </Helmet>

      <section className="relative h-[400px] md:h-[500px] bg-cover bg-center flex items-center justify-center" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1920&q=80)' }}>
        <div className="absolute inset-0 bg-black bg-opacity-50" />
        <div className="relative z-10 text-center text-white">
          <h1 className="text-4xl md:text-6xl font-bold">Our Story</h1>
        </div>
      </section>

      <section className="py-16 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-semibold text-[#2D3748] mb-8 text-center">
            The Circuit House Journey
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="text-[#2D3748] leading-relaxed">
              <p className="mb-6">
                Circuit House was founded with a passion for bringing exceptional culinary experiences to our community.
                Our journey began with a simple idea: to create a space where food lovers could gather,
                savor exquisite dishes, and make lasting memories. We believe that dining is more than just eating;
                it's an art form, a cultural expression, and a celebration of life's simple pleasures.
              </p>
              <p className="mb-6">
                From humble beginnings, we've grown into a beloved local establishment,
                thanks to our unwavering commitment to quality, innovation, and customer satisfaction.
                Every dish tells a story, crafted with the freshest ingredients and a touch of culinary magic by our talented chefs.
              </p>
            </div>
            <div>
              <img
                src="https://images.unsplash.com/photo-1578474846910-4758351a9677?w=800&q=80"
                alt="Restaurant interior"
                className="rounded-xl shadow-lg w-full h-auto object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 px-4 bg-[#F7FAFC]">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-semibold text-[#2D3748] mb-8 text-center">
            Our Mission & Philosophy
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <img
                src="https://images.unsplash.com/photo-1549877452-9c383d64f039?w=800&q=80"
                alt="Chef preparing food"
                className="rounded-xl shadow-lg w-full h-auto object-cover"
              />
            </div>
            <div className="text-[#2D3748] leading-relaxed">
              <p className="mb-6">
                Our mission at Circuit House is to delight every guest with an unforgettable dining experience.
                We strive to achieve this by sourcing the finest local and seasonal ingredients,
                employing skilled culinary artisans, and providing impeccable service in a warm and inviting atmosphere.
              </p>
              <p className="mb-6">
                We believe in culinary integrity, creativity, and sustainability. Our philosophy centers on
                respecting the ingredients, embracing diverse flavors, and continuously pushing the boundaries
                of gastronomic excellence. We are dedicated to creating a positive impact on our community
                and the environment through responsible practices.
              </p>
              <p>
                Join us at Circuit House and become a part of our ongoing story, where every meal is a journey
                and every guest is family.
              </p>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default AboutPage;