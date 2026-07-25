import { OrderResponse, OrderStatus } from '@/types/order';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { format } from 'date-fns';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@radix-ui/react-select';

interface OrdersTableProps {
  orders: OrderResponse[];
  onViewDetails: (order: OrderResponse) => void;
  onUpdateStatus: (orderId: string, status: OrderStatus) => void;
}

export function OrdersTable({ orders, onViewDetails, onUpdateStatus }: OrdersTableProps) {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Order ID</TableHead>
            <TableHead>Customer Name</TableHead>
            <TableHead>Total Amount</TableHead>
            <TableHead>Order Time</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {orders.length === 0 ? (
            <TableRow>
              <TableCell colSpan={6} className="h-24 text-center">
                No orders found.
              </TableCell>
            </TableRow>
          ) : (
            orders.map((order) => (
              <TableRow key={order.orderId}>
                <TableCell className="font-medium">{order.orderId ?? 'N/A'}</TableCell>
                <TableCell>{order.customerName ?? 'N/A'}</TableCell>
                <TableCell>${(order.totalAmount ?? 0).toFixed(2)}</TableCell>
                <TableCell>
                  {order.orderTime ? format(new Date(order.orderTime), 'PPP p') : 'N/A'}
                </TableCell>
                <TableCell>
                  <Select
                    value={order.status ?? ''}
                    onValueChange={(value) => onUpdateStatus(order.orderId!, value as OrderStatus)}
                  >
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Select Status" />
                    </SelectTrigger>
                    <SelectContent>
                      {['PENDING', 'CONFIRMED', 'PREPARING', 'READY_FOR_PICKUP', 'DELIVERED', 'CANCELLED'].map(
                        (status) => (
                          <SelectItem key={status} value={status}>
                            {status.replace(/_/g, ' ')}
                          </SelectItem>
                        )
                      )}
                    </SelectContent>
                  </Select>
                </TableCell>
                <TableCell className="text-right">
                  <Button variant="outline" size="sm" onClick={() => onViewDetails(order)}>
                    View Details
                  </Button>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}