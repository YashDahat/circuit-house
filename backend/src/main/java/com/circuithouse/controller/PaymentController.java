package com.circuithouse.controller;

import com.circuithouse.dto.PaymentDetails;
import com.circuithouse.model.OrderStatus;
import com.circuithouse.service.OrderService;
import com.circuithouse.service.PaymentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.Map;
import java.util.UUID;

@RestController
@RequestMapping("/api/v1/payments")
public class PaymentController {

    private final PaymentService paymentService;
    private final OrderService orderService;

    @Autowired
    public PaymentController(PaymentService paymentService, OrderService orderService) {
        this.paymentService = paymentService;
        this.orderService = orderService;
    }

    @PostMapping("/initiate")
    public ResponseEntity<?> initiatePayment(@RequestBody Map<String, Object> request) {
        try {
            UUID orderId = UUID.fromString((String) request.get("orderId"));
            BigDecimal amount = new BigDecimal(request.get("amount").toString());
            PaymentDetails paymentDetails = paymentService.initiatePayment(orderId, amount);
            return ResponseEntity.ok(paymentDetails);
        } catch (PaymentGatewayException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Invalid orderId or amount format.");
        }
    }

    @PostMapping("/webhook")
    public ResponseEntity<?> handleWebhook(@RequestBody Map<String, String> payload) {
        String paymentGatewayOrderId = payload.get("razorpay_order_id");
        String razorpayPaymentId = payload.get("razorpay_payment_id");
        String razorpaySignature = payload.get("razorpay_signature");

        if (paymentGatewayOrderId == null || razorpayPaymentId == null || razorpaySignature == null) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Missing required webhook parameters.");
        }

        try {
            boolean isValidSignature = paymentService.verifyPaymentSignature(paymentGatewayOrderId, razorpayPaymentId, razorpaySignature);

            if (isValidSignature) {
                // Assuming paymentGatewayOrderId is the same as our internal orderId for simplicity
                // In a real scenario, you might need to fetch the order by paymentGatewayOrderId
                orderService.updateOrderStatus(UUID.fromString(paymentGatewayOrderId), OrderStatus.RECEIVED);
                return ResponseEntity.ok("Webhook processed successfully.");
            } else {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Invalid payment signature.");
            }
        } catch (PaymentGatewayException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Payment gateway error during signature verification: " + e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to update order status: " + e.getMessage());
        }
    }
}