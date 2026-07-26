import { useMutation } from '@tanstack/react-query';
import { createReservation } from '@/services/reservationService';
import type { CreateReservationRequest, ReservationDto } from '@/types/reservation';

export const useCreateReservation = () => {
  return useMutation<ReservationDto, Error, CreateReservationRequest>({
    mutationFn: createReservation,
  });
};