package com.circuithouse.controller;

import com.circuithouse.dto.CreateOrderRequest;
import com.circuithouse.dto.OrderResponse;
import com.circuithouse.exception.ResourceNotFoundException;
import com.circuithouse.service.OrderService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/orders")
public class OrderController {

    private final OrderService orderService;

    @Autowired
    public OrderController(OrderService orderService) {
        this.orderService = orderService;
    }

    @PostMapping
    public ResponseEntity<OrderResponse> createOrder(@Valid @RequestBody CreateOrderRequest request) {
        OrderResponse orderResponse = orderService.createOrder(request);
        return new ResponseEntity<>(orderResponse, HttpStatus.CREATED);
    }
}