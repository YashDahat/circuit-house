package com.circuithouse.service;

import com.circuithouse.dto.PaymentDetails;
import com.circuithouse.model.Order;
import com.circuithouse.repository.OrderRepository;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import com.razorpay.RazorpayClient;
import com.razorpay.RazorpayException;
import com.razorpay.Utils;

import java.math.BigDecimal;
import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

@Service
public class PaymentService {

    @Value("${razorpay.key.id}")
    private String razorpayKeyId;

    @Value("${razorpay.key.secret}")
    private String razorpayKeySecret;

    private final OrderRepository orderRepository;

    public PaymentService(OrderRepository orderRepository) {
        this.orderRepository = orderRepository;
    }

    public PaymentDetails initiatePayment(UUID orderId, BigDecimal amount) {
        try {
            RazorpayClient razorpay = new RazorpayClient(razorpayKeyId, razorpayKeySecret);

            Order order = orderRepository.findById(orderId)
                    .orElseThrow(() -> new PaymentGatewayException("Order not found with ID: " + orderId));

            JSONObject orderRequest = new JSONObject();
            orderRequest.put("amount", amount.multiply(new BigDecimal(100)).longValue()); // amount in paise
            orderRequest.put("currency", "INR");
            orderRequest.put("receipt", orderId.toString());

            com.razorpay.Order razorpayOrder = razorpay.orders.create(orderRequest);

            order.setPaymentGatewayOrderId(razorpayOrder.get("id"));
            orderRepository.save(order);

            return PaymentDetails.builder()
                    .paymentGatewayOrderId(razorpayOrder.get("id"))
                    .amount(amount)
                    .currency("INR")
                    .signature(null) // Signature is not available at this stage
                    .build();
        } catch (RazorpayException e) {
            throw new PaymentGatewayException("Failed to initiate payment with Razorpay: " + e.getMessage(), e);
        }
    }

    public boolean verifyPaymentSignature(String paymentGatewayOrderId, String razorpayPaymentId, String razorpaySignature) {
        try {
            Map<String, String> attributes = new HashMap<>();
            attributes.put("razorpay_order_id", paymentGatewayOrderId);
            attributes.put("razorpay_payment_id", razorpayPaymentId);
            attributes.put("razorpay_signature", razorpaySignature);

            return Utils.verifyPaymentSignature(attributes, razorpayKeySecret);
        } catch (RazorpayException e) {
            throw new PaymentGatewayException("Failed to verify payment signature: " + e.getMessage(), e);
        }
    }
}