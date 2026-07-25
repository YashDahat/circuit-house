import { useQuery } from '@tanstack/react-query';
import { getOrderById } from '@/services/orderService';
import { OrderResponse } from '@/types/order';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Loader2 } from 'lucide-react';

interface OrderDetailViewProps {
  orderId: string;
  isOpen: boolean;
  onClose: () => void;
}

export const OrderDetailView = ({ orderId, isOpen, onClose }: OrderDetailViewProps) => {
  const { data: order, isLoading, isError, error } = useQuery<OrderResponse, Error>({
    queryKey: ['order', orderId],
    queryFn: () => getOrderById(orderId),
    enabled: isOpen && !!orderId,
  });

  if (!isOpen) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] p-6">
        <DialogHeader>
          <DialogTitle className="text-2xl font-semibold">Order Details</DialogTitle>
          <DialogDescription>Detailed information about the selected order.</DialogDescription>
        </DialogHeader>

        {isLoading ? (
          <div className="flex justify-center items-center h-40">
            <Loader2 className="h-8 w-8 animate-spin text-[#D69E2E]" />
            <span className="ml-2 text-gray-600">Loading order details...</span>
          </div>
        ) : isError ? (
          <div className="text-red-500 text-center py-4">
            Error loading order: {error?.message || 'Unknown error'}
          </div>
        ) : order ? (
          <div className="space-y-4 text-[#2D3748]">
            <div>
              <h3 className="font-bold text-lg mb-2">Customer Information</h3>
              <p><strong>Name:</strong> {order.customerName ?? 'N/A'}</p>
              <p><strong>Email:</strong> {order.customerEmail ?? 'N/A'}</p>
              <p><strong>Phone:</strong> {order.customerPhone ?? 'N/A'}</p>
              <p><strong>Address:</strong> {order.deliveryAddress ?? 'N/A'}</p>
            </div>

            <Separator />

            <div>
              <h3 className="font-bold text-lg mb-2">Order Summary</h3>
              <p><strong>Order ID:</strong> {order.id ?? 'N/A'}</p>
              <p><strong>Order Time:</strong> {order.orderTime ? new Date(order.orderTime).toLocaleString() : 'N/A'}</p>
              <p><strong>Status:</strong> <span className="font-semibold text-[#D69E2E]">{order.status ?? 'N/A'}</span></p>
              <p><strong>Total Amount:</strong> ${order.totalAmount?.toFixed(2) ?? '0.00'}</p>
              {order.paymentGatewayOrderId && <p><strong>Payment Gateway Order ID:</strong> {order.paymentGatewayOrderId}</p>}
            </div>

            <Separator />

            <div>
              <h3 className="font-bold text-lg mb-2">Items Ordered</h3>
              {order.items && order.items.length > 0 ? (
                <ul className="list-disc pl-5 space-y-1">
                  {order.items.map((item) => (
                    <li key={item.id}>
                      {item.quantity} x {item.menuItemName ?? 'Unknown Item'} (${item.priceAtOrder?.toFixed(2) ?? '0.00'} each)
                    </li>
                  ))}
                </ul>
              ) : (
                <p>No items found for this order.</p>
              )}
            </div>
          </div>
        ) : (
          <div className="text-center py-4 text-gray-600">No order data available.</div>
        )}

        <div className="flex justify-end mt-6">
          <Button onClick={onClose} className="bg-[#D69E2E] hover:bg-[#B78822] text-white font-semibold rounded-full px-8 py-3 transition-all duration-200">
            Close
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};