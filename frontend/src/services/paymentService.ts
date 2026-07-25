// GENERATED from the backend API contract — do not edit by hand.
// One function per endpoint; paths and types are ground truth.

import apiClient from '@/api/client';

export const initiatePayment = async (request: unknown): Promise<void> => {
  await apiClient.post<void>('/api/v1/payments/initiate', request);
};

export const handleWebhook = async (request: unknown): Promise<void> => {
  await apiClient.post<void>('/api/v1/payments/webhook', request);
};

