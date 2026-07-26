import { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { OrderResponseDto, OrderStatus } from '@/types/order';
import { Separator } from '@/components/ui/separator';

interface OrderDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  order: OrderResponseDto | null;
  onUpdateStatus: (orderId: string, status: OrderStatus) => void;
}

const OrderDetailModal: React.FC<OrderDetailModalProps> = ({
  isOpen,
  onClose,
  order,
  onUpdateStatus,
}) => {
  const [selectedStatus, setSelectedStatus] = useState<OrderStatus | null>(null);

  useEffect(() => {
    if (order?.status) {
      setSelectedStatus(order.status);
    }
  }, [order]);

  const handleStatusChange = (value: string) => {
    setSelectedStatus(value as OrderStatus);
  };

  const handleUpdateClick = () => {
    if (order?.id && selectedStatus) {
      onUpdateStatus(order.id, selectedStatus);
      onClose();
    }
  };

  if (!order) {
    return null;
  }

  const orderStatuses: OrderStatus[] = [
    'PENDING_PAYMENT',
    'RECEIVED',
    'PREPARING',
    'READY_FOR_DELIVERY',
    'OUT_FOR_DELIVERY',
    'DELIVERED',
    'CANCELLED',
  ];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] p-6 bg-white rounded-lg shadow-lg">
        <DialogHeader>
          <DialogTitle className="text-2xl font-semibold text-[#1A202C]">Order Details</DialogTitle>
          <DialogDescription className="text-[#2D3748]">
            View and update the status of this order.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="orderId" className="text-right font-medium text-gray-700">
              Order ID:
            </Label>
            <Input id="orderId" value={order.id ?? ''} readOnly className="col-span-3 mt-1 block w-full rounded-md border-gray-300 shadow-sm sm:text-sm" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="customerName" className="text-right font-medium text-gray-700">
              Customer Name:
            </Label>
            <Input id="customerName" value={order.customerName ?? ''} readOnly className="col-span-3 mt-1 block w-full rounded-md border-gray-300 shadow-sm sm:text-sm" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="customerEmail" className="text-right font-medium text-gray-700">
              Email:
            </Label>
            <Input id="customerEmail" value={order.customerEmail ?? ''} readOnly className="col-span-3 mt-1 block w-full rounded-md border-gray-300 shadow-sm sm:text-sm" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="customerPhone" className="text-right font-medium text-gray-700">
              Phone:
            </Label>
            <Input id="customerPhone" value={order.customerPhone ?? ''} readOnly className="col-span-3 mt-1 block w-full rounded-md border-gray-300 shadow-sm sm:text-sm" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="deliveryAddress" className="text-right font-medium text-gray-700">
              Address:
            </Label>
            <Input id="deliveryAddress" value={order.deliveryAddress ?? ''} readOnly className="col-span-3 mt-1 block w-full rounded-md border-gray-300 shadow-sm sm:text-sm" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="orderTime" className="text-right font-medium text-gray-700">
              Order Time:
            </Label>
            <Input id="orderTime" value={order.orderTime ? new Date(order.orderTime).toLocaleString() : ''} readOnly className="col-span-3 mt-1 block w-full rounded-md border-gray-300 shadow-sm sm:text-sm" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="totalAmount" className="text-right font-medium text-gray-700">
              Total Amount:
            </Label>
            <Input id="totalAmount" value={`$${(order.totalAmount ?? 0).toFixed(2)}`} readOnly className="col-span-3 mt-1 block w-full rounded-md border-gray-300 shadow-sm sm:text-sm" />
          </div>

          <Separator className="my-4" />

          <h3 className="text-lg font-semibold text-[#1A202C] col-span-4">Order Items</h3>
          {order.orderItems && order.orderItems.length > 0 ? (
            <div className="col-span-4 space-y-2">
              {order.orderItems.map((item, index) => (
                <div key={index} className="flex justify-between items-center text-sm text-[#2D3748]">
                  <span>{item.name} (x{item.quantity})</span>
                  <span>${(item.price ?? 0).toFixed(2)}</span>
                </div>
              ))}
            </div>
          ) : (
            <p className="col-span-4 text-sm text-gray-500">No items in this order.</p>
          )}

          <Separator className="my-4" />

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="status" className="text-right font-medium text-gray-700">
              Status:
            </Label>
            <Select onValueChange={handleStatusChange} value={selectedStatus ?? ''}>
              <SelectTrigger className="col-span-3 mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#D69E2E] focus:ring-[#D69E2E] sm:text-sm">
                <SelectValue placeholder="Select status" />
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
        <DialogFooter className="flex justify-end gap-2 pt-4">
          <Button type="button" onClick={onClose} className="secondary-cta">
            Cancel
          </Button>
          <Button type="submit" onClick={handleUpdateClick} className="primary-cta">
            Update Status
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default OrderDetailModal;