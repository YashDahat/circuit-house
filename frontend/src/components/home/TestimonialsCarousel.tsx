import { Card, CardContent } from '@/components/ui/card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { useTestimonials } from '@/hooks/useTestimonials';
import { Skeleton } from '@/components/ui/skeleton';

export const TestimonialsCarousel = () => {
  const { testimonials, isLoading, error } = useTestimonials();

  if (isLoading) {
    return (
      <section className="py-16 px-4 bg-[#F7FAFC]">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-semibold text-center mb-8 text-[#2D3748]">
            What Our Customers Say
          </h2>
          <div className="flex justify-center">
            <Skeleton className="w-full max-w-2xl h-64" />
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-16 px-4 bg-[#F7FAFC]">
        <div className="max-w-7xl mx-auto text-center text-red-500">
          Failed to load testimonials.
        </div>
      </section>
    );
  }

  if (!testimonials || testimonials.length === 0) {
    return (
      <section className="py-16 px-4 bg-[#F7FAFC]">
        <div className="max-w-7xl mx-auto text-center text-[#2D3748]">
          No testimonials available at the moment.
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 px-4 bg-[#F7FAFC]">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-semibold text-center mb-8 text-[#2D3748]">
          What Our Customers Say
        </h2>
        <Carousel
          opts={{
            align: 'start',
          }}
          className="w-full max-w-2xl mx-auto"
        >
          <CarouselContent>
            {testimonials.map((testimonial, index) => (
              <CarouselItem key={testimonial.id ?? index} className="md:basis-1/2 lg:basis-1/2">
                <div className="p-1">
                  <Card className="bg-white rounded-xl shadow-md border border-gray-100 p-6">
                    <CardContent className="flex flex-col items-center justify-center p-6 text-center">
                      <p className="text-lg italic mb-4 text-[#2D3748]">
                        &quot;{testimonial.content}&quot;
                      </p>
                      <p className="font-semibold text-[#D69E2E]">
                        - {testimonial.author}
                      </p>
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    </section>
  );
};