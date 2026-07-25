// GENERATED from the backend API contract — do not edit by hand.
// Source of truth: backend controllers/DTOs (see docs/API_INVENTORY.json).

export interface OrderResponse {
  orderId: string | null;
  customerName: string | null;
  customerEmail: string | null;
  customerPhone: string | null;
  orderTime: string | null;
  totalAmount: number | null;
  status: OrderStatus | null;
  orderItems: OrderItemResponse[] | null;
}

export interface CreateOrderRequest {
  customerName: string | null;
  customerEmail: string | null;
  customerPhone: string | null;
  orderItems: OrderItemRequest[] | null;
}

export type OrderStatus = 'PENDING' | 'CONFIRMED' | 'PREPARING' | 'READY_FOR_PICKUP' | 'DELIVERED' | 'CANCELLED';

export interface OrderItemResponse {
  menuItemId: string | null;
  menuItemName: string | null;
  quantity: number | null;
  priceAtOrder: number | null;
}

export interface OrderItemRequest {
  menuItemId: string | null;
  quantity: number | null;
}

