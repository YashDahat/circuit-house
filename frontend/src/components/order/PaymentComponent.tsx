import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface PaymentComponentProps {
  onProceedToPayment: () => void;
  totalAmount: number;
  isLoading: boolean;
}

const PaymentComponent: React.FC<PaymentComponentProps> = ({ onProceedToPayment, totalAmount, isLoading }) => {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Payment Information</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex justify-between items-center text-lg font-semibold">
          <span>Total Amount:</span>
          <span>${totalAmount.toFixed(2)}</span>
        </div>
        <Button
          onClick={onProceedToPayment}
          disabled={isLoading}
          className="w-full bg-[#D69E2E] hover:bg-[#B7872A] text-white font-semibold rounded-full px-8 py-3 transition-all duration-200"
        >
          {isLoading ? 'Processing Payment...' : 'Proceed to Payment'}
        </Button>
      </CardContent>
    </Card>
  );
};

export default PaymentComponent;