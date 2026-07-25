// GENERATED from the backend API contract — do not edit by hand.
// Source of truth: backend controllers/DTOs (see docs/API_INVENTORY.json).

export interface PaymentRequest {
  orderId: string | null;
  amount: number | null;
}

export interface PaymentVerificationRequest {
  paymentId: string | null;
  orderId: string | null;
  signature: string | null;
  status: string | null;
}

