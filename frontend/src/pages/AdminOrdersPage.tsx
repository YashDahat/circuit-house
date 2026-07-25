import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import AdminLayout from '@/components/layout/AdminLayout';
import { OrdersTable } from '@/components/admin/orders/OrdersTable';
import { OrderDetailView } from '@/components/admin/orders/OrderDetailView';
import { getAllOrders } from '@/services/orderService';
import { OrderResponse } from '@/types/order';
import { Loader2 } from 'lucide-react';

const AdminOrdersPage = () => {
  const { data: orders, isLoading, isError, error } = useQuery<OrderResponse[], Error>({
    queryKey: ['orders'],
    queryFn: getAllOrders,
  });

  const [isDetailViewOpen, setIsDetailViewOpen] = useState(false);
  const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null);

  const handleViewOrderDetails = (orderId: string) => {
    setSelectedOrderId(orderId);
    setIsDetailViewOpen(true);
  };

  const handleCloseDetailView = () => {
    setIsDetailViewOpen(false);
    setSelectedOrderId(null);
  };

  return (
    <AdminLayout>
      <section className="py-8 px-4">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold text-[#2D3748] mb-6">Manage Orders</h1>

          {isLoading ? (
            <div className="flex justify-center items-center h-64">
              <Loader2 className="h-10 w-10 animate-spin text-[#D69E2E]" />
              <span className="ml-4 text-lg text-gray-600">Loading orders...</span>
            </div>
          ) : isError ? (
            <div className="text-red-500 text-center py-8 text-lg">
              Error loading orders: {error?.message || 'Unknown error'}
            </div>
          ) : (
            <OrdersTable orders={orders ?? []} onViewOrderDetails={handleViewOrderDetails} />
          )}

          {selectedOrderId && (
            <OrderDetailView
              orderId={selectedOrderId}
              isOpen={isDetailViewOpen}
              onClose={handleCloseDetailView}
            />
          )}
        </div>
      </section>
    </AdminLayout>
  );
};

export default AdminOrdersPage;