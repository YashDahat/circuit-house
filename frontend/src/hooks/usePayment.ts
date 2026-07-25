import { useState } from 'react';
import { initiatePayment, verifyPayment } from '@/services/paymentService';
import type { PaymentRequest, PaymentVerificationRequest } from '@/types/payment';

interface PaymentResponse {
  paymentId: string | null;
  redirectUrl: string | null;
}

export const usePayment = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const initiatePaymentProcess = async (request: PaymentRequest) => {
    setIsLoading(true);
    setError(null);
    try {
      // The backend initiatePayment endpoint is expected to return a PaymentResponse
      // with redirectUrl, but the generated service currently returns void.
      // Assuming a temporary workaround or a future update to the service/backend.
      // For now, we'll simulate the redirect URL.
      // In a real scenario, the service would return { paymentId: string, redirectUrl: string }
      await initiatePayment(request);
      
      // Simulate a redirect URL from a successful initiation
      const simulatedPaymentId = `pay_${Date.now()}`; // Placeholder for actual payment ID
      const simulatedRedirectUrl = `/order-confirmation?paymentId=${simulatedPaymentId}&orderId=${request.orderId}&status=success&signature=mock_signature`;

      if (simulatedRedirectUrl) {
        window.location.href = simulatedRedirectUrl;
      } else {
        throw new Error('Payment initiation failed: No redirect URL provided.');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to initiate payment.');
    } finally {
      setIsLoading(false);
    }
  };

  const verifyPaymentProcess = async (request: PaymentVerificationRequest) => {
    setIsLoading(true);
    setError(null);
    try {
      await verifyPayment(request);
      // Payment verified successfully, handle further actions like updating order status
      // or navigating to a success page.
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to verify payment.');
    } finally {
      setIsLoading(false);
    }
  };

  return {
    initiatePayment: initiatePaymentProcess,
    verifyPayment: verifyPaymentProcess,
    isLoading,
    error,
  };
};