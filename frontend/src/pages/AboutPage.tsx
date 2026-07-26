import Layout from '@/components/Layout';

const AboutPage = () => {
  return (
    <Layout>
      <section className="relative h-[400px] md:h-[500px] bg-cover bg-center flex items-center justify-center" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=1920&q=80')" }}>
        <div className="absolute inset-0 bg-black bg-opacity-50" />
        <div className="relative z-10 text-center text-white">
          <h1 className="text-4xl md:text-6xl font-bold">About Circuit House</h1>
          <p className="mt-4 text-lg md:text-xl">Our Story, Our Passion, Your Experience</p>
        </div>
      </section>

      <section className="py-16 px-4 bg-[#F7FAFC]">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-semibold text-center mb-8 text-[#2D3748]">Our Story</h2>
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <p className="text-[#2D3748] leading-relaxed mb-4">
                Circuit House began with a simple dream: to create a dining experience that transcends the ordinary.
                Born from a passion for exquisite flavors and a desire to bring people together, our journey started
                in the vibrant city of Pune. We envisioned a place where every meal tells a story, every ingredient
                is carefully selected, and every guest feels like family.
              </p>
              <p className="text-[#2D3748] leading-relaxed">
                From humble beginnings, we meticulously crafted a menu that blends traditional Indian tastes with
                contemporary culinary techniques. Our founders, a team of seasoned chefs and hospitality experts,
                poured their hearts into building Circuit House into the beloved establishment it is today.
              </p>
            </div>
            <div className="flex justify-center">
              <img
                src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80"
                alt="Restaurant interior"
                className="rounded-xl shadow-lg object-cover w-full h-64 md:h-80"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-semibold text-center mb-8 text-[#2D3748]">The Circuit House Experience</h2>
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="flex justify-center order-2 md:order-1">
              <img
                src="https://images.unsplash.com/photo-1504711432247-dd9687446347?w=800&q=80"
                alt="Chef preparing food"
                className="rounded-xl shadow-lg object-cover w-full h-64 md:h-80"
              />
            </div>
            <div className="order-1 md:order-2">
              <p className="text-[#2D3748] leading-relaxed mb-4">
                At Circuit House, we believe dining is an art form. Our ambiance is designed to transport you to a
                world of comfort and sophistication, whether you're enjoying a quiet dinner for two or celebrating
                a special occasion with loved ones. The warm lighting, elegant decor, and attentive service create
                an inviting atmosphere where memories are made.
              </p>
              <p className="text-[#2D3748] leading-relaxed">
                Every detail, from the curated music to the thoughtfully arranged seating, contributes to an
                unforgettable experience. We invite you to relax, savor each moment, and let us take care of the rest.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 px-4 bg-[#F7FAFC]">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-semibold text-center mb-8 text-[#2D3748]">Our Culinary Philosophy</h2>
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <p className="text-[#2D3748] leading-relaxed mb-4">
                Our culinary philosophy is rooted in freshness, quality, and innovation. We source the finest local
                ingredients, ensuring that every dish bursts with authentic flavors. Our chefs are masters of their
                craft, constantly experimenting with new techniques and combinations to surprise and delight your palate.
              </p>
              <p className="text-[#2D3748] leading-relaxed">
                We are committed to creating dishes that are not only delicious but also reflect our dedication to
                culinary excellence. From traditional Indian curries to modern fusion creations, each item on our
                menu is a testament to our passion for food. Come and discover the taste of Circuit House.
              </p>
            </div>
            <div className="flex justify-center">
              <img
                src="https://images.unsplash.com/photo-1514933651105-0646ef958e0e?w=800&q=80"
                alt="Delicious food spread"
                className="rounded-xl shadow-lg object-cover w-full h-64 md:h-80"
              />
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default AboutPage;