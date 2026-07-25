import Layout from '@/components/layout/Layout';

const AboutPage: React.FC = () => {
  return (
    <Layout>
      <section className="py-16 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-center text-[#2D3748] mb-12">About Circuit House</h1>

          {/* Our Story Section */}
          <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
            <div className="md:order-2">
              <img
                src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80"
                alt="Restaurant interior"
                className="rounded-xl shadow-lg w-full h-auto object-cover"
              />
            </div>
            <div className="md:order-1">
              <h2 className="text-2xl md:text-3xl font-semibold text-[#2D3748] mb-4">Our Story</h2>
              <p className="text-[#2D3748] leading-relaxed mb-4">
                Circuit House began with a simple vision: to create a dining experience that transcends the ordinary.
                Founded by a group of passionate food enthusiasts, our journey started in a small, bustling kitchen
                with a commitment to fresh, locally sourced ingredients and innovative culinary techniques.
              </p>
              <p className="text-[#2D3748] leading-relaxed">
                Over the years, we've grown, but our core philosophy remains unchanged: to serve delicious food
                in a warm, inviting atmosphere where every guest feels like family. We believe that great food
                is about more than just taste; it's about the memories created around the table.
              </p>
            </div>
          </div>

          {/* Our Mission Section */}
          <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
            <div>
              <img
                src="https://images.unsplash.com/photo-1579684382098-936a77d71b3e?w=800&q=80"
                alt="Chef preparing food"
                className="rounded-xl shadow-lg w-full h-auto object-cover"
              />
            </div>
            <div>
              <h2 className="text-2xl md:text-3xl font-semibold text-[#2D3748] mb-4">Our Mission</h2>
              <p className="text-[#2D3748] leading-relaxed mb-4">
                Our mission at Circuit House is to consistently deliver exceptional culinary experiences.
                We are dedicated to crafting dishes that delight the senses, using only the finest ingredients
                and a blend of traditional and contemporary cooking methods.
              </p>
              <p className="text-[#2D3748] leading-relaxed">
                We strive to create a welcoming environment where every visit is a celebration of food,
                friendship, and community. Our commitment extends to sustainable practices and supporting
                local producers, ensuring a positive impact on both our guests and our planet.
              </p>
            </div>
          </div>

          {/* Our Team Section */}
          <div className="text-center mb-16">
            <h2 className="text-2xl md:text-3xl font-semibold text-[#2D3748] mb-8">Meet Our Team</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Team Member 1 */}
              <div className="bg-[#F7FAFC] rounded-xl shadow-md p-6 transition-all duration-200 hover:shadow-lg">
                <img
                  src="https://images.unsplash.com/photo-1567784196417-91689230541d?w=400&q=80"
                  alt="Head Chef"
                  className="w-32 h-32 rounded-full mx-auto mb-4 object-cover border-4 border-[#D69E2E]"
                />
                <h3 className="text-xl font-semibold text-[#2D3748] mb-2">Chef Anya Sharma</h3>
                <p className="text-[#2D3748] text-sm">Head Chef</p>
                <p className="text-[#2D3748] text-sm mt-2">
                  With over 15 years of experience, Chef Anya brings innovative flavors and a passion for perfection to every dish.
                </p>
              </div>

              {/* Team Member 2 */}
              <div className="bg-[#F7FAFC] rounded-xl shadow-md p-6 transition-all duration-200 hover:shadow-lg">
                <img
                  src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&q=80"
                  alt="Restaurant Founder"
                  className="w-32 h-32 rounded-full mx-auto mb-4 object-cover border-4 border-[#D69E2E]"
                />
                <h3 className="text-xl font-semibold text-[#2D3748] mb-2">Mr. Rohan Mehta</h3>
                <p className="text-[#2D3748] text-sm">Founder & CEO</p>
                <p className="text-[#2D3748] text-sm mt-2">
                  Rohan's vision and dedication shaped Circuit House into the beloved culinary destination it is today.
                </p>
              </div>

              {/* Team Member 3 */}
              <div className="bg-[#F7FAFC] rounded-xl shadow-md p-6 transition-all duration-200 hover:shadow-lg">
                <img
                  src="https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&q=80"
                  alt="Restaurant Manager"
                  className="w-32 h-32 rounded-full mx-auto mb-4 object-cover border-4 border-[#D69E2E]"
                />
                <h3 className="text-xl font-semibold text-[#2D3748] mb-2">Ms. Priya Singh</h3>
                <p className="text-[#2D3748] text-sm">Restaurant Manager</p>
                <p className="text-[#2D3748] text-sm mt-2">
                  Priya ensures every guest experience is seamless and memorable, overseeing daily operations with grace.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default AboutPage;