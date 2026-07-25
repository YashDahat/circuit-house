package com.circuithouse.model;

import jakarta.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;
import com.circuithouse.model.OrderStatus;
import com.circuithouse.model.OrderItem;

@Entity
@Table(name = "orders")
public class Order {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private UUID id;

    private String customerName;
    private String customerEmail;
    private String customerPhone;
    private String deliveryAddress;
    private BigDecimal totalAmount;
    private LocalDateTime orderTime;

    @Enumerated(EnumType.STRING)
    private OrderStatus status;

    private String paymentGatewayOrderId;

    @OneToMany(mappedBy = "order", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<OrderItem> orderItems;

    public Order() {
    }

    public Order(String customerName, String customerEmail, String customerPhone, String deliveryAddress, BigDecimal totalAmount, LocalDateTime orderTime, OrderStatus status) {
        this.customerName = customerName;
        this.customerEmail = customerEmail;
        this.customerPhone = customerPhone;
        this.deliveryAddress = deliveryAddress;
        this.totalAmount = totalAmount;
        this.orderTime = orderTime;
        this.status = status;
    }

    public UUID getId() {
        return id;
    }

    public void setId(UUID id) {
        this.id = id;
    }

    public String getCustomerName() {
        return customerName;
    }

    public void setCustomerName(String customerName) {
        this.customerName = customerName;
    }

    public String getCustomerEmail() {
        return customerEmail;
    }

    public void setCustomerEmail(String customerEmail) {
        this.customerEmail = customerEmail;
    }

    public String getCustomerPhone() {
        return customerPhone;
    }

    public void setCustomerPhone(String customerPhone) {
        this.customerPhone = customerPhone;
    }

    public String getDeliveryAddress() {
        return deliveryAddress;
    }

    public void setDeliveryAddress(String deliveryAddress) {
        this.deliveryAddress = deliveryAddress;
    }

    public BigDecimal getTotalAmount() {
        return totalAmount;
    }

    public void setTotalAmount(BigDecimal totalAmount) {
        this.totalAmount = totalAmount;
    }

    public LocalDateTime getOrderTime() {
        return orderTime;
    }

    public void setOrderTime(LocalDateTime orderTime) {
        this.orderTime = orderTime;
    }

    public OrderStatus getStatus() {
        return status;
    }

    public void setStatus(OrderStatus status) {
        this.status = status;
    }

    public String getPaymentGatewayOrderId() {
        return paymentGatewayOrderId;
    }

    public void setPaymentGatewayOrderId(String paymentGatewayOrderId) {
        this.paymentGatewayOrderId = paymentGatewayOrderId;
    }

    public List<OrderItem> getOrderItems() {
        return orderItems;
    }

    public void setOrderItems(List<OrderItem> orderItems) {
        this.orderItems = orderItems;
        for (OrderItem item : orderItems) {
            item.setOrder(this);
        }
    }
}