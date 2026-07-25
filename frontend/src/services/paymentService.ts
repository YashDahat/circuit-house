// GENERATED from the backend API contract — do not edit by hand.
// One function per endpoint; paths and types are ground truth.

import apiClient from '@/api/client';
import type { PaymentRequest, PaymentVerificationRequest } from '@/types/payment';

export const initiatePayment = async (request: PaymentRequest): Promise<void> => {
  await apiClient.post<void>('/api/v1/payments/initiate', request);
};

export const verifyPayment = async (request: PaymentVerificationRequest): Promise<void> => {
  await apiClient.post<void>('/api/v1/payments/verify', request);
};

