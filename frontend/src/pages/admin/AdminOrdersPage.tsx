import { useState } from 'react';
import AdminLayout from '@/components/AdminLayout';
import { useAllOrders, useUpdateOrderStatus } from '@/hooks/useOrders';
import { OrdersTable } from '@/components/order/OrdersTable';
import OrderDetailModal from '@/components/order/OrderDetailModal';
import { OrderResponse, OrderStatus } from '@/types/order';
import { toast } from 'sonner';
import { Loader2 } from 'lucide-react';

const AdminOrdersPage: React.FC = () => {
  const { data: orders, isLoading, isError } = useAllOrders();
  const updateOrderStatusMutation = useUpdateOrderStatus();
  const [selectedOrder, setSelectedOrder] = useState<OrderResponse | null>(null);

  const handleViewDetails = (order: OrderResponse) => {
    setSelectedOrder(order);
  };

  const handleUpdateStatus = async (orderId: string, status: OrderStatus) => {
    try {
      await updateOrderStatusMutation.mutateAsync(orderId);
      toast.success(`Order ${orderId} status changed to ${status}.`);
    } catch (error) {
      toast.error('There was an error updating the order status.');
    }
  };

  if (isLoading) {
    return (
      <AdminLayout>
        <section className="py-16 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="flex justify-center items-center h-64">
              <Loader2 className="h-8 w-8 animate-spin text-[#D69E2E]" />
            </div>
          </div>
        </section>
      </AdminLayout>
    );
  }

  if (isError) {
    return (
      <AdminLayout>
        <section className="py-16 px-4">
          <div className="max-w-7xl mx-auto">
            <p className="text-center text-red-500">Error loading orders.</p>
          </div>
        </section>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-8">Manage Orders</h1>
          {orders && orders.length > 0 ? (
            <OrdersTable
              orders={orders}
              onViewDetails={handleViewDetails}
              onUpdateStatus={handleUpdateStatus}
            />
          ) : (
            <div className="text-center py-10 text-gray-600">
              <p>No orders found.</p>
            </div>
          )}
        </div>
      </section>
      {selectedOrder && (
        <OrderDetailModal
          order={selectedOrder}
          onStatusUpdate={handleUpdateStatus}
        />
      )}
    </AdminLayout>
  );
};

export default AdminOrdersPage;