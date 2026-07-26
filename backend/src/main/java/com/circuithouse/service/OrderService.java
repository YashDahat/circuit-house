package com.circuithouse.service;

import com.circuithouse.dto.CreateOrderRequest;
import com.circuithouse.dto.OrderItemDto;
import com.circuithouse.dto.OrderResponseDto;
import com.circuithouse.dto.UpdateOrderStatusRequest;
import com.circuithouse.exception.ResourceNotFoundException;
import com.circuithouse.model.MenuItem;
import com.circuithouse.model.Order;
import com.circuithouse.model.OrderItem;
import com.circuithouse.model.OrderStatus;
import com.circuithouse.repository.MenuItemRepository;
import com.circuithouse.repository.OrderRepository;
import com.circuithouse.repository.OrderItemRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;
import com.circuithouse.service.NotificationService;

@Service
public class OrderService {

    private final OrderRepository orderRepository;
    private final OrderItemRepository orderItemRepository;
    private final MenuItemRepository menuItemRepository;
    private final NotificationService notificationService;

    public OrderService(OrderRepository orderRepository, OrderItemRepository orderItemRepository, MenuItemRepository menuItemRepository, NotificationService notificationService) {
        this.orderRepository = orderRepository;
        this.orderItemRepository = orderItemRepository;
        this.menuItemRepository = menuItemRepository;
        this.notificationService = notificationService;
    }

    @Transactional
    public OrderResponseDto createOrder(CreateOrderRequest request) {
        List<OrderItem> orderItems = request.getOrderItems().stream()
                .map(itemRequest -> {
                    MenuItem menuItem = menuItemRepository.findById(itemRequest.getMenuItemId())
                            .orElseThrow(() -> new ResourceNotFoundException("Menu item not found with ID: " + itemRequest.getMenuItemId()));
                    return new OrderItem(null, menuItem.getId(), menuItem.getName(), itemRequest.getQuantity(), menuItem.getPrice());
                })
                .collect(Collectors.toList());

        BigDecimal totalAmount = orderItems.stream()
                .map(item -> item.getPrice().multiply(BigDecimal.valueOf(item.getQuantity())))
                .reduce(BigDecimal.ZERO, BigDecimal::add);

        Order order = new Order();
        order.setCustomerId(UUID.randomUUID()); // Placeholder for actual customer ID
        order.setOrderTime(LocalDateTime.now());
        order.setStatus(OrderStatus.PENDING_PAYMENT);
        order.setTotalAmount(totalAmount);
        order.setItems(orderItems);

        Order savedOrder = orderRepository.save(order);

        for (OrderItem item : orderItems) {
            item.setOrder(savedOrder);
            orderItemRepository.save(item);
        }

        notificationService.sendOrderCreatedNotification(savedOrder.getId(), savedOrder.getCustomerId());

        return mapToOrderResponseDto(savedOrder);
    }

    public OrderResponseDto getOrderById(UUID orderId) {
        Order order = orderRepository.findById(orderId)
                .orElseThrow(() -> new ResourceNotFoundException("Order not found with ID: " + orderId));
        return mapToOrderResponseDto(order);
    }

    @Transactional
    public OrderResponseDto updateOrderStatus(UUID orderId, UpdateOrderStatusRequest request) {
        Order order = orderRepository.findById(orderId)
                .orElseThrow(() -> new ResourceNotFoundException("Order not found with ID: " + orderId));

        OrderStatus newStatus = request.getStatus();
        if (newStatus == null) {
            throw new IllegalArgumentException("New order status cannot be null.");
        }

        // Basic status transition validation (can be expanded)
        if (order.getStatus() == OrderStatus.DELIVERED || order.getStatus() == OrderStatus.CANCELLED) {
            throw new IllegalArgumentException("Cannot update status of a delivered or cancelled order.");
        }

        order.setStatus(newStatus);
        Order updatedOrder = orderRepository.save(order);

        notificationService.sendOrderStatusUpdateNotification(updatedOrder.getId(), updatedOrder.getCustomerId(), newStatus);

        return mapToOrderResponseDto(updatedOrder);
    }

    private OrderResponseDto mapToOrderResponseDto(Order order) {
        List<OrderItemDto> itemDtos = order.getItems().stream()
                .map(item -> OrderItemDto.builder()
                        .id(item.getId())
                        .menuItemId(item.getMenuItemId())
                        .name(item.getName())
                        .quantity(item.getQuantity())
                        .price(item.getPrice())
                        .build())
                .collect(Collectors.toList());

        return OrderResponseDto.builder()
                .id(order.getId())
                .customerName("Customer Name Placeholder") // Placeholder
                .customerEmail("customer@example.com") // Placeholder
                .customerPhone("123-456-7890") // Placeholder
                .deliveryAddress("Delivery Address Placeholder") // Placeholder
                .orderTime(order.getOrderTime())
                .totalAmount(order.getTotalAmount())
                .status(order.getStatus())
                .orderItems(itemDtos)
                .build();
    }
}