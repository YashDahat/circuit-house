import { useParams } from 'react-router-dom';
import { useGetOrderById } from '@/hooks/useOrders';
import Layout from '@/components/Layout';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Skeleton } from '@/components/ui/skeleton';

const OrderConfirmationPage = () => {
  const { orderId } = useParams<{ orderId: string }>();
  const { data: order, isLoading, isError, error } = useGetOrderById(orderId || '');

  if (isLoading) {
    return (
      <Layout>
        <section className="py-16 px-4">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold text-center mb-8">Order Confirmation</h1>
            <Card className="max-w-2xl mx-auto">
              <CardHeader>
                <Skeleton className="h-8 w-3/4 mb-2" />
                <Skeleton className="h-6 w-1/2" />
              </CardHeader>
              <CardContent>
                <Skeleton className="h-4 w-full mb-2" />
                <Skeleton className="h-4 w-full mb-2" />
                <Skeleton className="h-4 w-full mb-2" />
                <Separator className="my-4" />
                <Skeleton className="h-6 w-1/3 mb-4" />
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="flex justify-between items-center mb-2">
                    <Skeleton className="h-4 w-1/2" />
                    <Skeleton className="h-4 w-1/4" />
                  </div>
                ))}
                <Separator className="my-4" />
                <div className="flex justify-between items-center font-semibold">
                  <Skeleton className="h-6 w-1/4" />
                  <Skeleton className="h-6 w-1/4" />
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
      </Layout>
    );
  }

  if (isError) {
    return (
      <Layout>
        <section className="py-16 px-4">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold text-center mb-8">Order Confirmation</h1>
            <Card className="max-w-2xl mx-auto">
              <CardHeader>
                <CardTitle className="text-center text-red-600">Error</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p>Failed to load order details: {error?.message || 'Unknown error'}</p>
              </CardContent>
            </Card>
          </div>
        </section>
      </Layout>
    );
  }

  if (!order) {
    return (
      <Layout>
        <section className="py-16 px-4">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold text-center mb-8">Order Confirmation</h1>
            <Card className="max-w-2xl mx-auto">
              <CardHeader>
                <CardTitle className="text-center">Order Not Found</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p>The order with ID "{orderId}" could not be found.</p>
              </CardContent>
            </Card>
          </div>
        </section>
      </Layout>
    );
  }

  return (
    <Layout>
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-center mb-8">Order Confirmation</h1>
          <Card className="max-w-2xl mx-auto bg-white rounded-xl shadow-md border border-gray-100 p-6">
            <CardHeader>
              <CardTitle className="text-2xl font-semibold text-center text-[#D69E2E]">Order Placed Successfully!</CardTitle>
              <p className="text-center text-gray-600">Your order #{order.id} has been confirmed.</p>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 text-[#2D3748]">
                <p><strong>Customer Name:</strong> {order.customerName}</p>
                <p><strong>Email:</strong> {order.customerEmail}</p>
                <p><strong>Phone:</strong> {order.customerPhone}</p>
                <p><strong>Delivery Address:</strong> {order.deliveryAddress}</p>
                <p><strong>Order Time:</strong> {new Date(order.orderTime ?? '').toLocaleString()}</p>
                <p><strong>Status:</strong> <span className="font-medium text-[#D69E2E]">{order.status?.replace(/_/g, ' ')}</span></p>
              </div>

              <Separator className="my-6" />

              <h2 className="text-xl font-semibold mb-4 text-[#2D3748]">Order Items</h2>
              <div className="space-y-3">
                {order.orderItems?.map((item) => (
                  <div key={item.id} className="flex justify-between items-center text-[#2D3748]">
                    <span>{item.name} (x{item.quantity})</span>
                    <span>${(item.price ?? 0 * (item.quantity ?? 0)).toFixed(2)}</span>
                  </div>
                ))}
              </div>

              <Separator className="my-6" />

              <div className="flex justify-between items-center text-2xl font-bold text-[#2D3748]">
                <span>Total Amount:</span>
                <span>${order.totalAmount?.toFixed(2)}</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </Layout>
  );
};

export default OrderConfirmationPage;