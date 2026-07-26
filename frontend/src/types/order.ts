// GENERATED from the backend API contract — do not edit by hand.
// Source of truth: backend controllers/DTOs (see docs/API_INVENTORY.json).

export interface OrderResponseDto {
  id: string | null;
  customerName: string | null;
  customerEmail: string | null;
  customerPhone: string | null;
  deliveryAddress: string | null;
  orderTime: string | null;
  totalAmount: number | null;
  status: OrderStatus | null;
  orderItems: OrderItemDto[] | null;
}

export interface UpdateOrderStatusRequest {
  status: OrderStatus | null;
}

export interface PaymentOrderResponse {
  gatewayOrderId: string | null;
  gatewayKeyId: string | null;
  amount: number | null;
  currency: string | null;
  paymentRecordId: number | null;
}

export interface CreateOrderRequest {
  customerName: string | null;
  customerEmail: string | null;
  customerPhone: string | null;
  deliveryAddress: string | null;
  orderItems: OrderItemRequest[] | null;
}

export type OrderStatus = 'PENDING_PAYMENT' | 'RECEIVED' | 'PREPARING' | 'READY_FOR_DELIVERY' | 'OUT_FOR_DELIVERY' | 'DELIVERED' | 'CANCELLED';

export interface OrderItemDto {
  id: string | null;
  menuItemId: number | null;
  name: string | null;
  quantity: number | null;
  price: number | null;
}

export interface OrderItemRequest {
  menuItemId: number | null;
  quantity: number | null;
}

