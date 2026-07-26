import React, { useState } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import OrdersTable from '@/components/admin/orders/OrdersTable';
import OrderDetailModal from '@/components/admin/orders/OrderDetailModal';
import { useGetAllOrders, useUpdateOrderStatus } from '@/hooks/useOrders';
import { OrderResponseDto, OrderStatus } from '@/types/order';
import { toast } from 'sonner';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Skeleton } from '@/components/ui/skeleton';

const AdminOrdersPage: React.FC = () => {
  const { data: orders, isLoading, error, refetch } = useGetAllOrders();
  const updateOrderStatusMutation = useUpdateOrderStatus();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<OrderResponseDto | null>(null);
  const [filterStatus, setFilterStatus] = useState<OrderStatus | 'ALL'>('ALL');

  const handleViewDetails = (order: OrderResponseDto) => {
    setSelectedOrder(order);
    setIsModalOpen(true);
  };

  const handleUpdateStatus = async (orderId: string, status: OrderStatus) => {
    try {
      await updateOrderStatusMutation.mutateAsync({ id: orderId, request: { status } });
      toast.success('Order status updated successfully!');
      refetch();
    } catch (err) {
      toast.error('Failed to update order status.');
      console.error('Error updating order status:', err);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedOrder(null);
  };

  const handleFilterChange = (value: string) => {
    setFilterStatus(value as OrderStatus | 'ALL');
  };

  const filteredOrders = orders?.filter(order =>
    filterStatus === 'ALL' || order.status === filterStatus
  ) || [];

  const orderStatuses: (OrderStatus | 'ALL')[] = [
    'ALL',
    'PENDING_PAYMENT',
    'RECEIVED',
    'PREPARING',
    'READY_FOR_DELIVERY',
    'OUT_FOR_DELIVERY',
    'DELIVERED',
    'CANCELLED',
  ];

  return (
    <AdminLayout>
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold text-[#1A202C] mb-8">Order Management</h1>

          {error && <p className="text-red-500">Error loading orders: {error.message}</p>}

          <div className="mb-6 flex justify-between items-center">
            <div className="w-48">
              <Select onValueChange={handleFilterChange} value={filterStatus}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Filter by Status" />
                </SelectTrigger>
                <SelectContent>
                  {orderStatuses.map((status) => (
                    <SelectItem key={status} value={status}>
                      {status.replace(/_/g, ' ')}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {isLoading ? (
            <div className="space-y-4">
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-10 w-full" />
            </div>
          ) : (
            <OrdersTable
              orders={filteredOrders}
              onViewDetails={handleViewDetails}
              onUpdateStatus={handleUpdateStatus}
            />
          )}

          <OrderDetailModal
            isOpen={isModalOpen}
            onClose={handleCloseModal}
            order={selectedOrder}
            onUpdateStatus={handleUpdateStatus}
          />
        </div>
      </section>
    </AdminLayout>
  );
};

export default AdminOrdersPage;