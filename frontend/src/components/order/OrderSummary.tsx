import { useCart } from '@/context/CartContext';

const DELIVERY_FEE = 50.00;

const OrderSummary = () => {
  const { cartTotal } = useCart();

  const totalAmount = cartTotal + DELIVERY_FEE;

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-4">Order Summary</h2>
      <div className="space-y-2">
        <div className="flex justify-between">
          <span>Subtotal:</span>
          <span>₹{cartTotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between">
          <span>Delivery Fee:</span>
          <span>₹{DELIVERY_FEE.toFixed(2)}</span>
        </div>
        <div className="flex justify-between font-bold text-lg border-t pt-2 mt-2">
          <span>Total:</span>
          <span>₹{totalAmount.toFixed(2)}</span>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;