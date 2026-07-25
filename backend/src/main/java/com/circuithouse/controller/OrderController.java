package com.circuithouse.controller;

import com.circuithouse.dto.CreateOrderRequest;
import com.circuithouse.dto.OrderResponse;
import com.circuithouse.service.OrderService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/v1/orders")
public class OrderController {

    private final OrderService orderService;

    public OrderController(OrderService orderService) {
        this.orderService = orderService;
    }

    @PostMapping
    public ResponseEntity<OrderResponse> createOrder(@Valid @RequestBody CreateOrderRequest request) {
        OrderResponse orderResponse = orderService.createOrder(request);
        return new ResponseEntity<>(orderResponse, HttpStatus.CREATED);
    }

    @GetMapping("/{orderId}")
    public ResponseEntity<OrderResponse> getOrderById(@PathVariable UUID orderId) {
        OrderResponse orderResponse = orderService.getOrderById(orderId);
        return ResponseEntity.ok(orderResponse);
    }

    @GetMapping("/customer/{customerEmail}")
    public ResponseEntity<List<OrderResponse>> getOrdersByCustomerEmail(@PathVariable String customerEmail) {
        List<OrderResponse> orders = orderService.getOrdersByCustomerEmail(customerEmail);
        return ResponseEntity.ok(orders);
    }
}