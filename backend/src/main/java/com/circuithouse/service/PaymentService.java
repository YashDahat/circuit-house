package com.circuithouse.service;

import com.circuithouse.dto.PaymentRequest;
import com.circuithouse.dto.PaymentResponse;
import com.circuithouse.dto.PaymentVerificationRequest;
import com.circuithouse.exception.PaymentGatewayException;
import com.circuithouse.model.OrderStatus;
import org.springframework.stereotype.Service;
import java.util.UUID;
import com.circuithouse.service.OrderService;

@Service
public class PaymentService {

    private final OrderService orderService;

    public PaymentService(OrderService orderService) {
        this.orderService = orderService;
    }

    public PaymentResponse initiatePayment(PaymentRequest request) {
        // Simulate interaction with a payment gateway
        // In a real application, this would involve calling a third-party API
        try {
            // Simulate a successful payment initiation
            String gatewayOrderId = "PG_ORDER_" + UUID.randomUUID().toString();
            String signature = "PG_SIGNATURE_" + UUID.randomUUID().toString();
            return new PaymentResponse(gatewayOrderId, signature);
        } catch (Exception e) {
            // Simulate a payment gateway error
            throw new PaymentGatewayException("Failed to initiate payment with gateway: " + e.getMessage());
        }
    }

    public String verifyPayment(PaymentVerificationRequest request) {
        // Simulate signature verification
        // In a real application, this would involve cryptographic verification
        if (!isValidSignature(request.getPaymentId(), request.getOrderId(), request.getSignature())) {
            throw new IllegalArgumentException("Invalid payment signature.");
        }

        if ("SUCCESS".equalsIgnoreCase(request.getStatus())) {
            // Update order status to CONFIRMED
            orderService.updateOrderStatus(UUID.fromString(request.getOrderId()), OrderStatus.CONFIRMED);
            return "Payment verified successfully.";
        } else {
            // Handle other statuses like FAILED, PENDING, etc.
            // For now, we'll just return a generic message for non-success statuses
            return "Payment status is: " + request.getStatus();
        }
    }

    private boolean isValidSignature(String paymentId, String orderId, String signature) {
        // This is a placeholder for actual signature verification logic
        // In a real scenario, this would involve using a secret key and hashing algorithms
        return signature != null && signature.startsWith("PG_SIGNATURE_");
    }
}