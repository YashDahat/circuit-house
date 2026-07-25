import { Button } from '@/components/ui/button';
import { useCreateOrder } from '@/hooks/useOrders';
import type { CreateOrderRequest } from '@/types/order';
import { toast } from 'sonner';

interface PaymentComponentProps {
  orderData: CreateOrderRequest;
  totalAmount: number;
  onPaymentSuccess: () => void;
}

const PaymentComponent = ({ orderData, totalAmount, onPaymentSuccess }: PaymentComponentProps) => {
  const { mutate: createOrder, isPending } = useCreateOrder();

  const handlePayment = async () => {
    try {
      // Simulate payment gateway interaction
      toast.info('Initiating payment...');
      await new Promise(resolve => setTimeout(resolve, 2000)); // Simulate network delay
      const paymentSuccess = Math.random() > 0.1; // 90% success rate

      if (!paymentSuccess) {
        throw new Error('Payment failed. Please try again.');
      }

      // If payment is successful, proceed to create the order in the backend
      createOrder(orderData, {
        onSuccess: () => {
          toast.success('Payment successful and order placed!');
          onPaymentSuccess();
        },
        onError: (error) => {
          toast.error(`Order creation failed after payment: ${error.message}`);
        },
      });

    } catch (error: any) {
      toast.error(`Payment initiation failed: ${error.message}`);
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold text-[#2D3748]">Payment Information</h2>
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
        <p className="text-lg font-medium text-[#2D3748]">Total Amount Due: <span className="text-[#D69E2E]">₹{totalAmount.toFixed(2)}</span></p>
        <p className="text-sm text-gray-600 mt-2">
          This is a simulated payment gateway. Clicking "Pay Now" will simulate a successful transaction.
        </p>
      </div>
      <Button
        onClick={handlePayment}
        disabled={isPending}
        className="w-full bg-[#D69E2E] hover:bg-[#c28b29] text-white font-semibold py-3 rounded-full transition-all duration-200"
      >
        {isPending ? 'Processing...' : `Pay Now ₹${totalAmount.toFixed(2)}`}
      </Button>
    </div>
  );
};

export default PaymentComponent;