import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  createReservation,
  deleteReservation,
  getAllReservations,
  getReservationById,
  getReservationsByStatus,
  updateReservationStatus,
} from '@/services/reservationService';
import type { CreateReservationRequest, ReservationDto, ReservationStatus } from '@/types/reservation';

export const useCreateReservation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (reservation: CreateReservationRequest) => createReservation(reservation),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['reservations'] });
    },
  });
};

export const useReservation = (id: string) => {
  return useQuery<ReservationDto, Error>({
    queryKey: ['reservation', id],
    queryFn: () => getReservationById(id),
    enabled: !!id,
  });
};

export const useAllReservations = () => {
  return useQuery<ReservationDto[], Error>({
    queryKey: ['reservations'],
    queryFn: getAllReservations,
  });
};

export const useReservationsByStatus = (status: ReservationStatus) => {
  return useQuery<ReservationDto[], Error>({
    queryKey: ['reservations', { status }],
    queryFn: () => getReservationsByStatus(status),
    enabled: !!status,
  });
};

export const useUpdateReservationStatus = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => updateReservationStatus(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['reservations'] });
    },
  });
};

export const useDeleteReservation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => deleteReservation(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['reservations'] });
    },
  });
};