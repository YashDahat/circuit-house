import { useQuery } from '@tanstack/react-query';
import { getAllApprovedTestimonials } from '@/services/testimonialService';
import type { TestimonialDto } from '@/types/testimonial';

export const useTestimonials = () => {
  const {
    data: testimonials,
    isLoading,
    error,
  } = useQuery<TestimonialDto[], Error>({
    queryKey: ['testimonials'],
    queryFn: getAllApprovedTestimonials,
  });

  return {
    testimonials,
    isLoading,
    error,
  };
};