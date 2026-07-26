// GENERATED from the backend API contract — do not edit by hand.
// Source of truth: backend controllers/DTOs (see docs/API_INVENTORY.json).

export interface ReservationDto {
  id: string | null;
  customerName: string | null;
  customerEmail: string | null;
  customerPhone: string | null;
  reservationTime: string | null;
  numberOfGuests: number | null;
  status: ReservationStatus | null;
  notes: string | null;
}

export interface UpdateReservationStatusRequest {
  status: ReservationStatus | null;
  notes: string | null;
}

export interface CreateReservationRequest {
  customerName: string | null;
  customerEmail: string | null;
  customerPhone: string | null;
  reservationTime: string | null;
  numberOfGuests: number | null;
  notes: string | null;
}

export type ReservationStatus = 'PENDING' | 'CONFIRMED' | 'CANCELLED' | 'COMPLETED' | 'NO_SHOW';

