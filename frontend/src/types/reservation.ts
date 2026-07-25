// GENERATED from the backend API contract — do not edit by hand.
// Source of truth: backend controllers/DTOs (see docs/API_INVENTORY.json).

export interface ReservationDto {
  id: string | null;
  reservationTime: string | null;
  partySize: number | null;
  customerName: string | null;
  customerEmail: string | null;
  customerPhone: string | null;
  status: ReservationStatus | null;
}

export interface CreateReservationRequest {
  reservationTime: string | null;
  partySize: number | null;
  customerName: string | null;
  customerEmail: string | null;
  customerPhone: string | null;
}

export type ReservationStatus = 'PENDING' | 'CONFIRMED' | 'CANCELLED' | 'COMPLETED' | 'NO_SHOW';

