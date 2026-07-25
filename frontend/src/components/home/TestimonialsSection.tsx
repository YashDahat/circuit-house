import React from 'react';
import { Quote } from 'lucide-react';

const testimonials = [
  {
    quote: "Circuit House offers an unparalleled dining experience. The ambiance is exquisite, and every dish is a masterpiece. Highly recommended for a special occasion!",
    author: "Jane Doe",
    title: "Food Critic"
  },
  {
    quote: "I've been to many restaurants, but Circuit House stands out. The service is impeccable, and the flavors are simply unforgettable. A true culinary gem.",
    author: "John Smith",
    title: "Regular Customer"
  },
  {
    quote: "From the moment we walked in, we felt welcomed. The staff went above and beyond, and the food was divine. We can't wait to come back!",
    author: "Emily White",
    title: "First-time Visitor"
  }
];

const TestimonialsSection: React.FC = () => {
  return (
    <section className="py-16 px-4 bg-[#F7FAFC]">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-2xl md:text-3xl font-semibold text-[#2D3748] mb-4">What Our Guests Say</h2>
        <p className="text-lg text-[#2D3748] mb-12">Hear from those who have experienced Circuit House.</p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-white rounded-xl shadow-md border border-gray-100 p-6 flex flex-col items-center text-center">
              <Quote className="text-[#D69E2E] w-10 h-10 mb-4" />
              <p className="text-[#2D3748] italic mb-4">"{testimonial.quote}"</p>
              <p className="font-semibold text-[#2D3748]">{testimonial.author}</p>
              <p className="text-sm text-gray-500">{testimonial.title}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;