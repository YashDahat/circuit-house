import { useParams } from 'react-router-dom';
import { useOrder } from '@/hooks/useOrders';
import Layout from '@/components/Layout';
import { Card } from '@/components/ui/card';
import { Loader2, CheckCircle } from 'lucide-react';

const OrderConfirmationPage = () => {
  const { orderId } = useParams<{ orderId: string }>();
  const { data: order, isLoading, isError } = useOrder(orderId || '');

  if (isLoading) {
    return (
      <Layout>
        <section className="py-16 px-4">
          <div className="max-w-7xl mx-auto text-center">
            <Loader2 className="mx-auto h-12 w-12 animate-spin text-[#D69E2E]" />
            <p className="mt-4 text-lg text-[#2D3748]">Loading order details...</p>
          </div>
        </section>
      </Layout>
    );
  }

  if (isError || !order) {
    return (
      <Layout>
        <section className="py-16 px-4">
          <div className="max-w-7xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-red-600">Order Not Found</h1>
            <p className="mt-4 text-lg text-[#2D3748]">
              We could not find details for the order you are looking for. Please check the order ID or contact support.
            </p>
          </div>
        </section>
      </Layout>
    );
  }

  return (
    <Layout>
      <section className="py-16 px-4 bg-[#F7FAFC]">
        <div className="max-w-3xl mx-auto text-center">
          <CheckCircle className="mx-auto h-20 w-20 text-green-500" />
          <h1 className="text-4xl md:text-5xl font-bold text-[#2D3748] mt-6">Order Confirmed!</h1>
          <p className="mt-4 text-lg text-[#2D3748]">
            Thank you for your order, {order.customerName ?? 'customer'}! Your order has been successfully placed.
          </p>
          <Card className="mt-8 p-6 shadow-lg border border-gray-100 bg-white rounded-xl text-left">
            <h2 className="text-2xl font-semibold text-[#2D3748] mb-4">Order Details</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-[#2D3748]">
              <div>
                <p><strong>Order ID:</strong> {order.orderId}</p>
                <p><strong>Customer Name:</strong> {order.customerName}</p>
                <p><strong>Email:</strong> {order.customerEmail}</p>
                <p><strong>Phone:</strong> {order.customerPhone}</p>
              </div>
              <div>
                <p><strong>Order Time:</strong> {new Date(order.orderTime ?? '').toLocaleString()}</p>
                <p><strong>Status:</strong> <span className="font-medium text-[#D69E2E]">{order.status}</span></p>
                <p><strong>Total Amount:</strong> ${order.totalAmount?.toFixed(2)}</p>
              </div>
            </div>

            <h3 className="text-xl font-semibold text-[#2D3748] mt-6 mb-3">Items Ordered:</h3>
            <ul className="space-y-2">
              {order.orderItems?.map((item, index) => (
                <li key={index} className="flex justify-between items-center border-b pb-2 last:border-b-0 last:pb-0">
                  <span className="text-[#2D3748]">{item.menuItemName} (x{item.quantity})</span>
                  <span className="font-medium text-[#2D3748]">${(item.priceAtOrder && item.quantity) ? (item.priceAtOrder * item.quantity).toFixed(2) : '0.00'}</span>
                </li>
              ))}
            </ul>
          </Card>
        </div>
      </section>
    </Layout>
  );
};

export default OrderConfirmationPage;