import { useMutation, useQuery } from '@tanstack/react-query';
import { createOrderV2, getOrderById, getAllOrders, getOrdersByStatus, updateOrderStatus } from '@/services/orderService';
import type { CreateOrderRequest, OrderResponseDto, OrderStatus, UpdateOrderStatusRequest } from '@/types/order';

export const useCreateOrder = () => {
  return useMutation<OrderResponseDto, Error, CreateOrderRequest>({
    mutationFn: createOrderV2,
  });
};

export const useGetOrderById = (orderId: string) => {
  return useQuery<OrderResponseDto, Error>({
    queryKey: ['order', orderId],
    queryFn: () => getOrderById(orderId),
    enabled: !!orderId,
  });
};

export const useGetAllOrders = () => {
  return useQuery<OrderResponseDto[], Error>({
    queryKey: ['adminOrders'],
    queryFn: getAllOrders,
  });
};

export const useGetOrdersByStatus = (status: OrderStatus) => {
  return useQuery<OrderResponseDto[], Error>({
    queryKey: ['adminOrders', status],
    queryFn: () => getOrdersByStatus(status),
    enabled: !!status,
  });
};

export const useUpdateOrderStatus = () => {
  return useMutation<OrderResponseDto, Error, { id: string; request: UpdateOrderStatusRequest }>({
    mutationFn: ({ id, request }) => updateOrderStatus(id, request),
  });
};