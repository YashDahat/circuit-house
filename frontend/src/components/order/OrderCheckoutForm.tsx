import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useCart } from '@/context/CartContext';
import { useCreateOrder } from '@/hooks/useOrders';
import { usePayment } from '@/hooks/usePayment';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@radix-ui/react-label';
import { Card } from '@/components/ui/card';
import { ROUTES } from '@/routes';

const formSchema = z.object({
  customerName: z.string().min(1, 'Name is required'),
  customerEmail: z.string().email('Invalid email address'),
  customerPhone: z.string().min(10, 'Phone number is required'),
});

type CheckoutFormValues = z.infer<typeof formSchema>;

const OrderCheckoutForm = () => {
  const { cartItems, getCartTotal, clearCart } = useCart();
  const navigate = useNavigate();
  const { mutateAsync: createOrder, isPending: isCreatingOrder } = useCreateOrder();
  const { initiatePayment, isLoading: isInitiatingPayment, error: paymentError } = usePayment();
  const [orderPlacementError, setOrderPlacementError] = useState<string | null>(null);

  const form = useForm<CheckoutFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      customerName: '',
      customerEmail: '',
      customerPhone: '',
    },
  });

  const onSubmit = async (values: CheckoutFormValues) => {
    setOrderPlacementError(null);

    if (cartItems.length === 0) {
      setOrderPlacementError('Your cart is empty. Please add items before checking out.');
      return;
    }

    const orderItems = cartItems.map((item) => ({
      menuItemId: item.id,
      quantity: item.quantity,
    }));

    try {
      const orderRequest = {
        customerName: values.customerName,
        customerEmail: values.customerEmail,
        customerPhone: values.customerPhone,
        orderItems: orderItems,
      };

      const newOrder = await createOrder(orderRequest);

      if (newOrder?.orderId && newOrder?.totalAmount !== null) {
        await initiatePayment({
          orderId: newOrder.orderId,
          amount: newOrder.totalAmount,
        });
        clearCart();
        // The initiatePayment hook handles the redirect, so no explicit navigate here.
        // If initiatePayment didn't redirect, we would navigate to confirmation page.
        // navigate(`${ROUTES.ORDER_CONFIRMATION}?orderId=${newOrder.orderId}`);
      } else {
        setOrderPlacementError('Failed to get order ID or total amount after order creation.');
      }
    } catch (error) {
      setOrderPlacementError(
        error instanceof Error ? error.message : 'Failed to place order. Please try again.'
      );
    }
  };

  const totalAmount = getCartTotal();
  const isSubmitting = isCreatingOrder || isInitiatingPayment;

  return (
    <Card className="p-6">
      <h2 className="text-2xl font-semibold mb-6">Checkout</h2>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <Label htmlFor="customerName" className="block text-sm font-medium text-gray-700">
            Name
          </Label>
          <Input
            id="customerName"
            type="text"
            {...form.register('customerName')}
            className="mt-1 block w-full"
          />
          {form.formState.errors.customerName && (
            <p className="text-red-500 text-sm mt-1">
              {form.formState.errors.customerName.message}
            </p>
          )}
        </div>
        <div>
          <Label htmlFor="customerEmail" className="block text-sm font-medium text-gray-700">
            Email
          </Label>
          <Input
            id="customerEmail"
            type="email"
            {...form.register('customerEmail')}
            className="mt-1 block w-full"
          />
          {form.formState.errors.customerEmail && (
            <p className="text-red-500 text-sm mt-1">
              {form.formState.errors.customerEmail.message}
            </p>
          )}
        </div>
        <div>
          <Label htmlFor="customerPhone" className="block text-sm font-medium text-gray-700">
            Phone
          </Label>
          <Input
            id="customerPhone"
            type="tel"
            {...form.register('customerPhone')}
            className="mt-1 block w-full"
          />
          {form.formState.errors.customerPhone && (
            <p className="text-red-500 text-sm mt-1">
              {form.formState.errors.customerPhone.message}
            </p>
          )}
        </div>

        <div className="pt-4 border-t border-gray-200">
          <p className="text-lg font-semibold">Total: ${totalAmount.toFixed(2)}</p>
        </div>

        {orderPlacementError && (
          <p className="text-red-500 text-sm mt-2">{orderPlacementError}</p>
        )}
        {paymentError && (
          <p className="text-red-500 text-sm mt-2">{paymentError}</p>
        )}

        <Button
          type="submit"
          className="w-full bg-[#D69E2E] hover:bg-[#B7872A] text-white font-semibold py-3 rounded-full transition-all duration-200"
          disabled={isSubmitting || cartItems.length === 0}
        >
          {isSubmitting ? 'Processing...' : 'Place Order & Pay'}
        </Button>
      </form>
    </Card>
  );
};

export default OrderCheckoutForm;