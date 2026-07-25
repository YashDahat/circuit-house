import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  createOrder,
  getAllOrders,
  getOrderById,
  getOrdersByCustomerEmail,
  updateOrderStatus,
} from '@/services/orderService';
import type { CreateOrderRequest, OrderResponse } from '@/types/order';

export const useCreateOrder = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (request: CreateOrderRequest) => createOrder(request),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['orders'] });
      queryClient.invalidateQueries({ queryKey: ['allOrders'] });
    },
  });
};

export const useOrder = (orderId: string) => {
  return useQuery<OrderResponse, Error>({
    queryKey: ['order', orderId],
    queryFn: () => getOrderById(orderId),
    enabled: !!orderId,
  });
};

export const useOrdersByCustomerEmail = (customerEmail: string) => {
  return useQuery<OrderResponse[], Error>({
    queryKey: ['ordersByCustomerEmail', customerEmail],
    queryFn: () => getOrdersByCustomerEmail(customerEmail),
    enabled: !!customerEmail,
  });
};

export const useAllOrders = () => {
  return useQuery<OrderResponse[], Error>({
    queryKey: ['allOrders'],
    queryFn: getAllOrders,
  });
};

export const useUpdateOrderStatus = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (orderId: string) => updateOrderStatus(orderId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['orders'] });
      queryClient.invalidateQueries({ queryKey: ['allOrders'] });
    },
  });
};