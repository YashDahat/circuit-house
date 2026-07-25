import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { OrderResponse } from '@/types/order';

interface OrdersTableProps {
  orders: OrderResponse[];
  onViewOrderDetails: (orderId: string) => void;
}

export function OrdersTable({ orders, onViewOrderDetails }: OrdersTableProps) {
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
          {orders.length > 0 ? (
            orders.map((order) => (
              <TableRow key={order.id}>
                <TableCell className="font-medium">{order.id ?? 'N/A'}</TableCell>
                <TableCell>{order.customerName ?? 'N/A'}</TableCell>
                <TableCell>${(order.totalAmount ?? 0).toFixed(2)}</TableCell>
                <TableCell>{order.orderTime ? new Date(order.orderTime).toLocaleString() : 'N/A'}</TableCell>
                <TableCell>{order.status ?? 'N/A'}</TableCell>
                <TableCell className="text-right">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => order.id && onViewOrderDetails(order.id)}
                    className="transition-all duration-200 hover:bg-gray-100"
                  >
                    View Details
                  </Button>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={6} className="h-24 text-center">
                No orders found.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}