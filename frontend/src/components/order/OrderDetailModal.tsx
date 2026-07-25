import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { OrderResponse, OrderStatus } from '@/types/order';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@radix-ui/react-select';
import { useUpdateOrderStatus } from '@/hooks/useOrders';
import { useState } from 'react';
import { toast } from 'sonner';

interface OrderDetailModalProps {
  order: OrderResponse;
  onStatusUpdate: (orderId: string, status: OrderStatus) => void;
}

const OrderDetailModal: React.FC<OrderDetailModalProps> = ({ order, onStatusUpdate }) => {
  const [currentStatus, setCurrentStatus] = useState<OrderStatus>(order.status ?? 'PENDING');
  const updateOrderStatusMutation = useUpdateOrderStatus();

  const handleStatusChange = async (newStatus: OrderStatus) => {
    if (order.orderId) {
      try {
        await updateOrderStatusMutation.mutateAsync(order.orderId);
        setCurrentStatus(newStatus);
        onStatusUpdate(order.orderId, newStatus);
        toast.success(`Order ${order.orderId} status changed to ${newStatus}.`);
      } catch (error) {
        toast.error('There was an error updating the order status.');
      }
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="hover:bg-gray-100 transition-all duration-200">View Details</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px] p-6">
        <DialogHeader>
          <DialogTitle className="text-2xl font-semibold">Order Details (ID: {order.orderId})</DialogTitle>
          <DialogDescription className="text-gray-600">
            Comprehensive information about the order.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4 text-gray-700">
          <div className="grid grid-cols-2 items-center">
            <span className="font-medium">Customer Name:</span>
            <span>{order.customerName ?? 'N/A'}</span>
          </div>
          <div className="grid grid-cols-2 items-center">
            <span className="font-medium">Customer Email:</span>
            <span>{order.customerEmail ?? 'N/A'}</span>
          </div>
          <div className="grid grid-cols-2 items-center">
            <span className="font-medium">Customer Phone:</span>
            <span>{order.customerPhone ?? 'N/A'}</span>
          </div>
          <div className="grid grid-cols-2 items-center">
            <span className="font-medium">Order Time:</span>
            <span>{order.orderTime ? new Date(order.orderTime).toLocaleString() : 'N/A'}</span>
          </div>
          <div className="grid grid-cols-2 items-center">
            <span className="font-medium">Total Amount:</span>
            <span>${order.totalAmount?.toFixed(2) ?? '0.00'}</span>
          </div>
          <div className="grid grid-cols-2 items-center">
            <span className="font-medium">Status:</span>
            <Select value={currentStatus} onValueChange={(value: OrderStatus) => handleStatusChange(value)}>
              <SelectTrigger className="w-[180px] h-10 rounded-md border border-gray-300 bg-white px-3 py-2 text-sm ring-offset-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50">
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent className="z-50 min-w-[8rem] overflow-hidden rounded-md border bg-white p-1 text-gray-950 shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2">
                {['PENDING', 'CONFIRMED', 'PREPARING', 'READY_FOR_PICKUP', 'DELIVERED', 'CANCELLED'].map((status) => (
                  <SelectItem key={status} value={status} className="relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-gray-100 focus:text-gray-900 data-[disabled]:pointer-events-none data-[disabled]:opacity-50">
                    {status}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <h3 className="text-lg font-semibold mt-4">Order Items:</h3>
          {order.orderItems && order.orderItems.length > 0 ? (
            <div className="border rounded-md overflow-hidden">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Item Name</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Quantity</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {order.orderItems.map((item, index) => (
                    <tr key={index}>
                      <td className="px-6 py-4 whitespace-nowrap">{item.menuItemName ?? 'N/A'}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{item.quantity ?? 0}</td>
                      <td className="px-6 py-4 whitespace-nowrap">${item.priceAtOrder?.toFixed(2) ?? '0.00'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="text-gray-500">No items in this order.</p>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default OrderDetailModal;