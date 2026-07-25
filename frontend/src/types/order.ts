// GENERATED from the backend API contract — do not edit by hand.
// Source of truth: backend controllers/DTOs (see docs/API_INVENTORY.json).

export interface OrderResponse {
  id: string | null;
  customerName: string | null;
  customerEmail: string | null;
  customerPhone: string | null;
  deliveryAddress: string | null;
  totalAmount: number | null;
  orderTime: string | null;
  status: OrderStatus | null;
  paymentGatewayOrderId: string | null;
  items: OrderItemResponse[] | null;
}

export interface CreateOrderRequest {
  customerName: string | null;
  customerEmail: string | null;
  customerPhone: string | null;
  deliveryAddress: string | null;
  items: OrderItemRequest[] | null;
}

export type OrderStatus = 'PENDING_PAYMENT' | 'RECEIVED' | 'PREPARING' | 'READY_FOR_PICKUP' | 'DELIVERED' | 'CANCELLED';

export interface OrderItemResponse {
  id: string | null;
  menuItemId: string | null;
  menuItemName: string | null;
  quantity: number | null;
  priceAtOrder: number | null;
}

export interface OrderItemRequest {
  menuItemId: string | null;
  quantity: number | null;
}

