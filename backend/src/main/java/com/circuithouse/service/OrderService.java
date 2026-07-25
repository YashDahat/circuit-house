package com.circuithouse.service;

import com.circuithouse.dto.CreateOrderRequest;
import com.circuithouse.dto.OrderItemRequest;
import com.circuithouse.dto.OrderResponse;
import com.circuithouse.exception.ResourceNotFoundException;
import com.circuithouse.model.MenuItem;
import com.circuithouse.model.Order;
import com.circuithouse.model.OrderItem;
import com.circuithouse.model.OrderStatus;
import com.circuithouse.repository.MenuItemRepository;
import com.circuithouse.repository.OrderItemRepository;
import com.circuithouse.repository.OrderRepository;
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

    public OrderService(OrderRepository orderRepository, OrderItemRepository orderItemRepository,
                        MenuItemRepository menuItemRepository, NotificationService notificationService) {
        this.orderRepository = orderRepository;
        this.orderItemRepository = orderItemRepository;
        this.menuItemRepository = menuItemRepository;
        this.notificationService = notificationService;
    }

    @Transactional
    public OrderResponse createOrder(CreateOrderRequest request) {
        Order order = new Order();
        order.setCustomerName(request.getCustomerName());
        order.setCustomerEmail(request.getCustomerEmail());
        order.setCustomerPhone(request.getCustomerPhone());
        order.setOrderTime(LocalDateTime.now());
        order.setStatus(OrderStatus.PENDING);

        BigDecimal totalAmount = BigDecimal.ZERO;
        List<OrderItem> orderItems = new java.util.ArrayList<>();

        for (OrderItemRequest itemRequest : request.getOrderItems()) {
            MenuItem menuItem = menuItemRepository.findById(itemRequest.getMenuItemId())
                    .orElseThrow(() -> new ResourceNotFoundException("Menu item not found with ID: " + itemRequest.getMenuItemId()));

            if (!menuItem.isActive()) {
                throw new ResourceNotFoundException("Menu item is not active: " + menuItem.getName());
            }

            OrderItem orderItem = new OrderItem(order, menuItem, itemRequest.getQuantity(), menuItem.getPrice());
            orderItems.add(orderItem);
            totalAmount = totalAmount.add(menuItem.getPrice().multiply(BigDecimal.valueOf(itemRequest.getQuantity())));
        }

        order.setTotalAmount(totalAmount);
        order.setOrderItems(orderItems);

        Order savedOrder = orderRepository.save(order);
        orderItems.forEach(orderItem -> orderItem.setOrder(savedOrder));
        orderItemRepository.saveAll(orderItems);

        String confirmationMessage = String.format("Your order %s has been placed. Total: $%.2f",
                savedOrder.getOrderId().toString().substring(0, 8), savedOrder.getTotalAmount());
        notificationService.sendNotification(savedOrder.getCustomerPhone(), confirmationMessage);

        return mapToOrderResponse(savedOrder);
    }

    public OrderResponse getOrderById(UUID orderId) {
        Order order = orderRepository.findById(orderId)
                .orElseThrow(() -> new ResourceNotFoundException("Order not found with ID: " + orderId));
        return mapToOrderResponse(order);
    }

    public List<OrderResponse> getOrdersByCustomerEmail(String customerEmail) {
        List<Order> orders = orderRepository.findByCustomerEmail(customerEmail);
        return orders.stream()
                .map(this::mapToOrderResponse)
                .collect(Collectors.toList());
    }

    public List<OrderResponse> getAllOrders() {
        List<Order> orders = orderRepository.findAll();
        return orders.stream()
                .map(this::mapToOrderResponse)
                .collect(Collectors.toList());
    }

    @Transactional
    public OrderResponse updateOrderStatus(UUID orderId, OrderStatus newStatus) {
        Order order = orderRepository.findById(orderId)
                .orElseThrow(() -> new ResourceNotFoundException("Order not found with ID: " + orderId));

        order.setStatus(newStatus);
        Order updatedOrder = orderRepository.save(order);

        String statusUpdateMessage = String.format("Your order %s status has been updated to: %s",
                updatedOrder.getOrderId().toString().substring(0, 8), newStatus.name());
        notificationService.sendNotification(updatedOrder.getCustomerPhone(), statusUpdateMessage);

        return mapToOrderResponse(updatedOrder);
    }

    private OrderResponse mapToOrderResponse(Order order) {
        List<OrderItemResponse> itemResponses = order.getOrderItems().stream()
                .map(orderItem -> OrderItemResponse.builder()
                        .menuItemId(orderItem.getMenuItem().getId())
                        .menuItemName(orderItem.getMenuItem().getName())
                        .quantity(orderItem.getQuantity())
                        .priceAtOrder(orderItem.getPriceAtOrder())
                        .build())
                .collect(Collectors.toList());

        return OrderResponse.builder()
                .orderId(order.getOrderId())
                .customerName(order.getCustomerName())
                .customerEmail(order.getCustomerEmail())
                .customerPhone(order.getCustomerPhone())
                .orderTime(order.getOrderTime())
                .totalAmount(order.getTotalAmount())
                .status(order.getStatus())
                .orderItems(itemResponses)
                .build();
    }
}