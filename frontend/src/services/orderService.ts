// GENERATED from the backend API contract — do not edit by hand.
// One function per endpoint; paths and types are ground truth.

import apiClient from '@/api/client';
import type { CreateOrderRequest, OrderResponseDto, PaymentOrderResponse, UpdateOrderStatusRequest } from '@/types/order';
import type { CreatePaymentRequest } from '@/types/payment';

export const createOrder = async (request: CreatePaymentRequest): Promise<PaymentOrderResponse> => {
  const response = await apiClient.post<PaymentOrderResponse>('/api/v1/payments/create-order', request);
  return response.data;
};

export const createOrderV2 = async (request: CreateOrderRequest): Promise<OrderResponseDto> => {
  const response = await apiClient.post<OrderResponseDto>('/api/v1/orders', request);
  return response.data;
};

export const getOrderById = async (orderId: string): Promise<OrderResponseDto> => {
  const response = await apiClient.get<OrderResponseDto>(`/api/v1/orders/${orderId}`);
  return response.data;
};

export const getAllOrders = async (): Promise<OrderResponseDto[]> => {
  const response = await apiClient.get<OrderResponseDto[]>('/api/v1/admin/orders');
  return response.data;
};

export const getOrdersByStatus = async (status: OrderStatus): Promise<OrderResponseDto[]> => {
  const response = await apiClient.get<OrderResponseDto[]>(`/api/v1/admin/orders/status/${status}`);
  return response.data;
};

export const updateOrderStatus = async (id: string, request: UpdateOrderStatusRequest): Promise<OrderResponseDto> => {
  const response = await apiClient.put<OrderResponseDto>(`/api/v1/admin/orders/${id}/status`, request);
  return response.data;
};

