import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

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

const formSchema = z.object({
  customerName: z.string().min(2, {
    message: 'Name must be at least 2 characters.',
  }),
  customerEmail: z.string().email({
    message: 'Please enter a valid email address.',
  }),
  customerPhone: z.string().min(10, {
    message: 'Phone number must be at least 10 characters.',
  }),
  deliveryAddress: z.string().min(5, {
    message: 'Address must be at least 5 characters.',
  }),
});

export type DeliveryAddressFormData = z.infer<typeof formSchema>;

interface DeliveryAddressFormProps {
  onSubmit: (data: DeliveryAddressFormData) => void;
  initialData?: DeliveryAddressFormData;
}

export function DeliveryAddressForm({ onSubmit, initialData }: DeliveryAddressFormProps) {
  const form = useForm<DeliveryAddressFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || {
      customerName: '',
      customerEmail: '',
      customerPhone: '',
      deliveryAddress: '',
    },
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="customerName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="John Doe" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="customerEmail"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input type="email" placeholder="john.doe@example.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="customerPhone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Phone Number</FormLabel>
              <FormControl>
                <Input type="tel" placeholder="123-456-7890" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="deliveryAddress"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Delivery Address</FormLabel>
              <FormControl>
                <Textarea placeholder="123 Main St, Anytown, USA" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full bg-[#D69E2E] hover:bg-[#B7872A] text-white font-semibold rounded-full px-8 py-3 transition-all duration-200">
          Continue to Payment
        </Button>
      </form>
    </Form>
  );
}