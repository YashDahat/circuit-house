import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@radix-ui/react-label';
import { Textarea } from '@/components/ui/textarea';

const checkoutFormSchema = z.object({
  customerName: z.string().min(1, 'Customer name is required'),
  customerEmail: z.string().email('Invalid email address'),
  customerPhone: z.string().min(10, 'Phone number must be at least 10 digits').max(15, 'Phone number cannot exceed 15 digits'),
  deliveryAddress: z.string().min(1, 'Delivery address is required'),
});

type CheckoutFormValues = z.infer<typeof checkoutFormSchema>;

interface CheckoutFormProps {
  onSubmit: (data: CheckoutFormValues) => void;
  initialData?: CheckoutFormValues;
}

const CheckoutForm: React.FC<CheckoutFormProps> = ({ onSubmit, initialData }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CheckoutFormValues>({
    resolver: zodResolver(checkoutFormSchema),
    defaultValues: initialData,
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 p-6 bg-white rounded-xl shadow-md border border-gray-100">
      <div>
        <Label htmlFor="customerName" className="block text-sm font-medium text-gray-700">Customer Name</Label>
        <Input
          id="customerName"
          {...register('customerName')}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#D69E2E] focus:ring focus:ring-[#D69E2E] focus:ring-opacity-50"
        />
        {errors.customerName && <p className="mt-1 text-sm text-red-600">{errors.customerName.message}</p>}
      </div>

      <div>
        <Label htmlFor="customerEmail" className="block text-sm font-medium text-gray-700">Customer Email</Label>
        <Input
          id="customerEmail"
          type="email"
          {...register('customerEmail')}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#D69E2E] focus:ring focus:ring-[#D69E2E] focus:ring-opacity-50"
        />
        {errors.customerEmail && <p className="mt-1 text-sm text-red-600">{errors.customerEmail.message}</p>}
      </div>

      <div>
        <Label htmlFor="customerPhone" className="block text-sm font-medium text-gray-700">Customer Phone</Label>
        <Input
          id="customerPhone"
          type="tel"
          {...register('customerPhone')}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#D69E2E] focus:ring focus:ring-[#D69E2E] focus:ring-opacity-50"
        />
        {errors.customerPhone && <p className="mt-1 text-sm text-red-600">{errors.customerPhone.message}</p>}
      </div>

      <div>
        <Label htmlFor="deliveryAddress" className="block text-sm font-medium text-gray-700">Delivery Address</Label>
        <Textarea
          id="deliveryAddress"
          {...register('deliveryAddress')}
          rows={3}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#D69E2E] focus:ring focus:ring-[#D69E2E] focus:ring-opacity-50"
        />
        {errors.deliveryAddress && <p className="mt-1 text-sm text-red-600">{errors.deliveryAddress.message}</p>}
      </div>

      <Button
        type="submit"
        className="w-full bg-[#D69E2E] hover:bg-[#c28b29] text-white font-semibold rounded-full px-8 py-3 transition-all duration-200"
      >
        Proceed to Payment
      </Button>
    </form>
  );
};

export default CheckoutForm;