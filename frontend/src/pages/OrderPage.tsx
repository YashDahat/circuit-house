import React, { useState } from 'react';
import Layout from '@/components/layout/Layout';
import { useCart } from '@/context/CartContext';
import { CartView } from '@/components/order/CartView';
import CheckoutForm from '@/components/order/CheckoutForm';
import PaymentComponent from '@/components/order/PaymentComponent';
import { CreateOrderRequest, OrderItemRequest } from '@/types/order';
import { useCreateOrder } from '@/hooks/useOrders';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '@/routes';

type OrderStep = 'cart' | 'details' | 'payment' | 'confirmation';

interface CheckoutFormValues {
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  deliveryAddress: string;
}

const OrderPage: React.FC = () => {
  const [currentStep, setCurrentStep] = useState<OrderStep>('cart');
  const [checkoutDetails, setCheckoutDetails] = useState<CheckoutFormValues | null>(null);
  const { cartItems, cartTotal, clearCart } = useCart();
  const navigate = useNavigate();

  const deliveryFee = 50.00;
  const totalAmount = cartTotal + deliveryFee;

  const handleProceedToCheckout = () => {
    if (cartItems.length === 0) {
      toast.error('Your cart is empty. Please add items before proceeding to checkout.');
      return;
    }
    setCurrentStep('details');
  };

  const handleCheckoutSubmit = (data: CheckoutFormValues) => {
    setCheckoutDetails(data);
    setCurrentStep('payment');
  };

  const handlePaymentSuccess = () => {
    clearCart();
    setCurrentStep('confirmation');
    toast.success('Your order has been placed successfully!');
    navigate(ROUTES.HOME); // Or to a dedicated order confirmation page
  };

  const orderItems: OrderItemRequest[] = cartItems.map(item => ({
    menuItemId: item.menuItemId,
    quantity: item.quantity,
  }));

  const orderData: CreateOrderRequest | null = checkoutDetails ? {
    customerName: checkoutDetails.customerName,
    customerEmail: checkoutDetails.customerEmail,
    customerPhone: checkoutDetails.customerPhone,
    deliveryAddress: checkoutDetails.deliveryAddress,
    items: orderItems,
  } : null;

  return (
    <Layout>
      <section className="py-16 px-4 bg-[#F7FAFC]">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-[#2D3748] mb-12 text-center">
            {currentStep === 'cart' && 'Your Order'}
            {currentStep === 'details' && 'Delivery Details'}
            {currentStep === 'payment' && 'Complete Your Payment'}
            {currentStep === 'confirmation' && 'Order Confirmed!'}
          </h1>

          {currentStep === 'cart' && (
            <CartView onProceedToCheckout={handleProceedToCheckout} />
          )}

          {currentStep === 'details' && (
            <div className="max-w-2xl mx-auto">
              <CheckoutForm onSubmit={handleCheckoutSubmit} />
            </div>
          )}

          {currentStep === 'payment' && orderData && (
            <div className="max-w-2xl mx-auto">
              <PaymentComponent
                orderData={orderData}
                totalAmount={totalAmount}
                onPaymentSuccess={handlePaymentSuccess}
              />
            </div>
          )}

          {currentStep === 'confirmation' && (
            <div className="text-center py-20 bg-white rounded-xl shadow-md border border-gray-100 max-w-2xl mx-auto">
              <h2 className="text-3xl font-semibold text-[#2D3748] mb-4">Thank You for Your Order!</h2>
              <p className="text-lg text-gray-600 mb-8">Your order has been successfully placed and is being processed.</p>
              <p className="text-md text-gray-500 mb-8">You will receive a confirmation email shortly.</p>
              <button
                onClick={() => navigate(ROUTES.HOME)}
                className="bg-[#D69E2E] hover:bg-[#c28b29] text-white font-semibold rounded-full px-8 py-3 transition-all duration-200"
              >
                Back to Home
              </button>
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
};

export default OrderPage;