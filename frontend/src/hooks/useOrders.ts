import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createOrder } from '@/services/orderService';
import type { CreateOrderRequest, OrderResponse } from '@/types/order';
import { useCart } from '@/context/CartContext';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '@/routes';
import { toast } from 'sonner';

export const useCreateOrder = () => {
  const queryClient = useQueryClient();
  const { clearCart } = useCart();
  const navigate = useNavigate();

  return useMutation<OrderResponse, Error, CreateOrderRequest>({
    mutationFn: createOrder,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['orders'] });
      clearCart();
      toast.success('Order placed successfully!');
      navigate(ROUTES.HOME); // Navigate to home or a confirmation page
    },
    onError: (error) => {
      toast.error(`Failed to place order: ${error.message}`);
    },
  });
};