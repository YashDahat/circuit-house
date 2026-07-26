import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '@/context/CartContext';
import { useCreateOrder } from '@/hooks/useOrders';
import { DeliveryAddressForm, DeliveryAddressFormData } from '@/components/order/DeliveryAddressForm';
import OrderSummary from '@/components/order/OrderSummary';
import PaymentComponent from '@/components/order/PaymentComponent';
import Layout from '@/components/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { toast } from 'sonner';
import { ROUTES } from '@/routes';
import { OrderItemRequest } from '@/types/order';

const OrderPage: React.FC = () => {
  const { cartItems, cartTotal, clearCart } = useCart();
  const navigate = useNavigate();
  const { mutate: createOrder, isPending: isCreatingOrder } = useCreateOrder();

  const [step, setStep] = useState(1);
  const [deliveryData, setDeliveryData] = useState<DeliveryAddressFormData | null>(null);

  const handleDeliverySubmit = (data: DeliveryAddressFormData) => {
    setDeliveryData(data);
    setStep(2);
  };

  const handleProceedToPayment = () => {
    if (!deliveryData || cartItems.length === 0) {
      toast.error('Please complete delivery details and ensure your cart is not empty.');
      return;
    }

    const orderItems: OrderItemRequest[] = cartItems.map((item) => ({
      menuItemId: item.menuItemId,
      quantity: item.quantity,
    }));

    createOrder(
      {
        customerName: deliveryData.customerName,
        customerEmail: deliveryData.customerEmail,
        customerPhone: deliveryData.customerPhone,
        deliveryAddress: deliveryData.deliveryAddress,
        orderItems: orderItems,
      },
      {
        onSuccess: (data) => {
          clearCart();
          toast.success('Order placed successfully!');
          navigate(`${ROUTES.ORDER_CONFIRMATION}?orderId=${data.id}`);
        },
        onError: (error) => {
          toast.error(`Failed to place order: ${error.message}`);
        },
      }
    );
  };

  return (
    <Layout>
      <section className="py-16 px-4 bg-[#F7FAFC]">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-center mb-12 text-[#2D3748]">
            Checkout
          </h1>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
              <Card className="bg-white rounded-xl shadow-md border border-gray-100 p-6">
                <CardHeader>
                  <CardTitle className="text-2xl font-semibold">
                    Step 1: Delivery Information
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <DeliveryAddressForm onSubmit={handleDeliverySubmit} initialData={deliveryData ?? undefined} />
                </CardContent>
              </Card>

              {step === 2 && (
                <Card className="bg-white rounded-xl shadow-md border border-gray-100 p-6">
                  <CardHeader>
                    <CardTitle className="text-2xl font-semibold">
                      Step 2: Payment
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <PaymentComponent
                      onProceedToPayment={handleProceedToPayment}
                      totalAmount={cartTotal}
                      isLoading={isCreatingOrder}
                    />
                  </CardContent>
                </Card>
              )}
            </div>
            <div className="lg:col-span-1">
              <OrderSummary />
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default OrderPage;