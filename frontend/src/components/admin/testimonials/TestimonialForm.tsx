'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { TestimonialDto } from '@/types/testimonial';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';

interface TestimonialFormProps {
  initialData?: TestimonialDto;
  onSubmit: (data: TestimonialDto) => void;
  onCancel: () => void;
}

const formSchema = z.object({
  author: z.string().min(1, 'Author is required'),
  content: z.string().min(1, 'Content is required'),
  rating: z.coerce.number().min(1, 'Rating must be at least 1').max(5, 'Rating cannot exceed 5'),
  date: z.string().min(1, 'Date is required'),
  approved: z.boolean().default(false),
});

const TestimonialForm: React.FC<TestimonialFormProps> = ({
  initialData,
  onSubmit,
  onCancel,
}) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      author: initialData?.author ?? '',
      content: initialData?.content ?? '',
      rating: initialData?.rating ?? 1,
      date: initialData?.date ?? new Date().toISOString().split('T')[0],
      approved: initialData?.approved ?? false,
    },
  });

  const handleSubmit = (values: z.infer<typeof formSchema>) => {
    onSubmit({ ...initialData, ...values, id: initialData?.id ?? null });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="author"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="block text-sm font-medium text-gray-700">Author</FormLabel>
              <FormControl>
                <Input
                  placeholder="Author Name"
                  {...field}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#D69E2E] focus:ring-[#D69E2E] sm:text-sm"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="block text-sm font-medium text-gray-700">Content</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Testimonial content"
                  {...field}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#D69E2E] focus:ring-[#D69E2E] sm:text-sm"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="rating"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="block text-sm font-medium text-gray-700">Rating</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  placeholder="Rating (1-5)"
                  {...field}
                  onChange={(e) => field.onChange(e.target.valueAsNumber)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#D69E2E] focus:ring-[#D69E2E] sm:text-sm"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="date"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="block text-sm font-medium text-gray-700">Date</FormLabel>
              <FormControl>
                <Input
                  type="date"
                  {...field}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#D69E2E] focus:ring-[#D69E2E] sm:text-sm"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="approved"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 shadow-sm">
              <FormControl>
                <Checkbox checked={field.value} onCheckedChange={field.onChange} />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel className="text-sm font-medium text-gray-700">Approved</FormLabel>
                <FormDescription>
                  Check this box to approve the testimonial for public display.
                </FormDescription>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex justify-end space-x-2">
          <Button
            type="button"
            onClick={onCancel}
            className="bg-gray-200 hover:bg-gray-300 text-[#2D3748] font-semibold rounded-md px-4 py-2 transition-all duration-200"
          >
            Cancel
          </Button>
          <Button
            type="submit"
            className="bg-[#D69E2E] hover:bg-[#B78B27] text-white font-semibold rounded-md px-4 py-2 transition-all duration-200"
          >
            {initialData ? 'Save Changes' : 'Create Testimonial'}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default TestimonialForm;