package com.circuithouse.service;

import com.circuithouse.dto.CreateOrderRequest;
import com.circuithouse.dto.OrderItemRequest;
import com.circuithouse.dto.OrderItemResponse;
import com.circuithouse.dto.OrderResponse;
import com.circuithouse.dto.PaymentDetails;
import com.circuithouse.exception.ResourceNotFoundException;
import com.circuithouse.model.MenuItem;
import com.circuithouse.model.Order;
import com.circuithouse.model.OrderItem;
import com.circuithouse.model.OrderStatus;
import com.circuithouse.repository.MenuItemRepository;
import com.circuithouse.repository.OrderItemRepository;
import com.circuithouse.repository.OrderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;
import com.circuithouse.service.PaymentService;
import com.circuithouse.service.NotificationService;

@Service
public class OrderService {

    private final OrderRepository orderRepository;
    private final OrderItemRepository orderItemRepository;
    private final MenuItemRepository menuItemRepository;
    private final PaymentService paymentService;
    private final NotificationService notificationService;

    @Autowired
    public OrderService(OrderRepository orderRepository, OrderItemRepository orderItemRepository,
                        MenuItemRepository menuItemRepository, PaymentService paymentService,
                        NotificationService notificationService) {
        this.orderRepository = orderRepository;
        this.orderItemRepository = orderItemRepository;
        this.menuItemRepository = menuItemRepository;
        this.paymentService = paymentService;
        this.notificationService = notificationService;
    }

    @Transactional
    public OrderResponse createOrder(CreateOrderRequest request) {
        BigDecimal totalAmount = BigDecimal.ZERO;
        Order order = new Order();
        order.setCustomerName(request.getCustomerName());
        order.setCustomerEmail(request.getCustomerEmail());
        order.setCustomerPhone(request.getCustomerPhone());
        order.setDeliveryAddress(request.getDeliveryAddress());
        order.setOrderTime(LocalDateTime.now());
        order.setStatus(OrderStatus.PENDING_PAYMENT);

        List<OrderItem> orderItems = new java.util.ArrayList<>();
        for (OrderItemRequest itemRequest : request.getItems()) {
            MenuItem menuItem = menuItemRepository.findById(itemRequest.getMenuItemId())
                    .orElseThrow(() -> new ResourceNotFoundException("Menu item not found with ID: " + itemRequest.getMenuItemId()));

            OrderItem orderItem = new OrderItem();
            orderItem.setMenuItem(menuItem);
            orderItem.setQuantity(itemRequest.getQuantity());
            orderItem.setPriceAtOrder(menuItem.getPrice());
            orderItem.setOrder(order);
            orderItems.add(orderItem);

            totalAmount = totalAmount.add(menuItem.getPrice().multiply(BigDecimal.valueOf(itemRequest.getQuantity())));
        }

        order.setTotalAmount(totalAmount);
        order.setOrderItems(orderItems);
        Order savedOrder = orderRepository.save(order);
        orderItemRepository.saveAll(orderItems);

        try {
            PaymentDetails paymentDetails = paymentService.initiatePayment(savedOrder.getId(), totalAmount);
            savedOrder.setPaymentGatewayOrderId(paymentDetails.getPaymentGatewayOrderId());
            savedOrder = orderRepository.save(savedOrder);
        } catch (Exception e) {
            throw new com.circuithouse.exception.PaymentGatewayException("Failed to initiate payment for order: " + savedOrder.getId(), e);
        }

        return mapToOrderResponse(savedOrder);
    }

    @Transactional
    public OrderResponse updateOrderStatus(UUID orderId, OrderStatus newStatus) {
        Order order = orderRepository.findById(orderId)
                .orElseThrow(() -> new ResourceNotFoundException("Order not found with ID: " + orderId));

        order.setStatus(newStatus);
        Order updatedOrder = orderRepository.save(order);

        notificationService.sendOrderStatusUpdate(updatedOrder.getId(), updatedOrder.getStatus(), updatedOrder.getCustomerEmail());

        return mapToOrderResponse(updatedOrder);
    }

    public List<OrderResponse> getAllOrders() {
        return orderRepository.findAll().stream()
                .map(this::mapToOrderResponse)
                .collect(Collectors.toList());
    }

    public OrderResponse getOrderById(UUID orderId) {
        Order order = orderRepository.findById(orderId)
                .orElseThrow(() -> new ResourceNotFoundException("Order not found with ID: " + orderId));
        return mapToOrderResponse(order);
    }

    private OrderResponse mapToOrderResponse(Order order) {
        List<OrderItemResponse> itemResponses = order.getOrderItems().stream()
                .map(this::mapToOrderItemResponse)
                .collect(Collectors.toList());

        return OrderResponse.builder()
                .id(order.getId())
                .customerName(order.getCustomerName())
                .customerEmail(order.getCustomerEmail())
                .customerPhone(order.getCustomerPhone())
                .deliveryAddress(order.getDeliveryAddress())
                .totalAmount(order.getTotalAmount())
                .orderTime(order.getOrderTime())
                .status(order.getStatus())
                .paymentGatewayOrderId(order.getPaymentGatewayOrderId())
                .items(itemResponses)
                .build();
    }

    private OrderItemResponse mapToOrderItemResponse(OrderItem orderItem) {
        return OrderItemResponse.builder()
                .id(orderItem.getId())
                .menuItemId(orderItem.getMenuItem().getId())
                .menuItemName(orderItem.getMenuItem().getName())
                .quantity(orderItem.getQuantity())
                .priceAtOrder(orderItem.getPriceAtOrder())
                .build();
    }
}