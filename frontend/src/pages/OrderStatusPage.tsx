import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useGetOrderById } from '@/hooks/useOrders';
import Layout from '@/components/Layout';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Skeleton } from '@/components/ui/skeleton';
import { AlertCircle, Package } from 'lucide-react';

const OrderStatusPage = () => {
  const { orderId: paramOrderId } = useParams<{ orderId: string }>();
  const [inputOrderId, setInputOrderId] = useState<string>(paramOrderId || '');
  const [searchOrderId, setSearchOrderId] = useState<string>(paramOrderId || '');

  const { data: order, isLoading, isError, error } = useGetOrderById(searchOrderId);

  const handleSearch = () => {
    setSearchOrderId(inputOrderId);
  };

  return (
    <Layout>
      <section className="py-16 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-center mb-12 text-[#2D3748]">Order Status</h1>

          <div className="max-w-md mx-auto mb-8">
            <div className="flex space-x-2">
              <Input
                type="text"
                placeholder="Enter Order ID"
                value={inputOrderId}
                onChange={(e) => setInputOrderId(e.target.value)}
                className="flex-grow"
              />
              <Button onClick={handleSearch} className="bg-[#D69E2E] hover:bg-[#B7872A] text-white font-semibold transition-all duration-200">
                Track Order
              </Button>
            </div>
          </div>

          {searchOrderId && (
            <div className="max-w-3xl mx-auto">
              {isLoading ? (
                <Card className="p-6">
                  <Skeleton className="h-8 w-3/4 mb-4" />
                  <Skeleton className="h-4 w-1/2 mb-2" />
                  <Skeleton className="h-4 w-full mb-2" />
                  <Skeleton className="h-4 w-full mb-2" />
                  <Skeleton className="h-4 w-2/3 mb-4" />
                  <Separator className="my-4" />
                  <Skeleton className="h-6 w-1/3 mb-4" />
                  <Skeleton className="h-4 w-full mb-2" />
                  <Skeleton className="h-4 w-full mb-2" />
                </Card>
              ) : isError ? (
                <Card className="p-6 text-center border-red-400 bg-red-50">
                  <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
                  <CardTitle className="text-red-600 mb-2">Error</CardTitle>
                  <p className="text-red-500">Failed to fetch order details. {error?.message || 'Please check the Order ID and try again.'}</p>
                </Card>
              ) : order ? (
                <Card className="p-6 shadow-lg">
                  <CardHeader className="p-0 mb-4">
                    <CardTitle className="text-2xl font-semibold flex items-center">
                      <Package className="mr-2 text-[#D69E2E]" /> Order #{order.id}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-0">
                    <p className="text-lg mb-2">
                      <span className="font-medium">Status:</span> <span className="text-[#D69E2E] font-semibold">{order.status?.replace(/_/g, ' ')}</span>
                    </p>
                    <p className="text-gray-700 mb-2">
                      <span className="font-medium">Customer:</span> {order.customerName} ({order.customerEmail})
                    </p>
                    <p className="text-gray-700 mb-2">
                      <span className="font-medium">Delivery Address:</span> {order.deliveryAddress}
                    </p>
                    <p className="text-gray-700 mb-4">
                      <span className="font-medium">Order Time:</span> {new Date(order.orderTime ?? '').toLocaleString()}
                    </p>

                    <Separator className="my-6" />

                    <h3 className="text-xl font-semibold mb-4">Order Items</h3>
                    {order.orderItems && order.orderItems.length > 0 ? (
                      <ul className="space-y-2">
                        {order.orderItems.map((item) => (
                          <li key={item.id} className="flex justify-between items-center text-gray-800">
                            <span>{item.name} x {item.quantity}</span>
                            <span>${(item.price ?? 0 * (item.quantity ?? 0)).toFixed(2)}</span>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-gray-600">No items found for this order.</p>
                    )}

                    <Separator className="my-6" />

                    <div className="flex justify-between items-center text-xl font-bold">
                      <span>Total Amount:</span>
                      <span className="text-[#D69E2E]">${order.totalAmount?.toFixed(2)}</span>
                    </div>
                  </CardContent>
                </Card>
              ) : (
                <Card className="p-6 text-center border-gray-200 bg-gray-50">
                  <Package className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <CardTitle className="text-gray-700 mb-2">No Order Found</CardTitle>
                  <p className="text-gray-500">Enter an Order ID above to check its status.</p>
                </Card>
              )}
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
};

export default OrderStatusPage;