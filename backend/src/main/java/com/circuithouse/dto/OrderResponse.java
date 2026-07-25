package com.circuithouse.dto;

import jakarta.validation.constraints.*;
import java.util.List;
import java.util.UUID;
import java.time.LocalDateTime;
import lombok.Data;
import lombok.Builder;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import com.circuithouse.model.OrderStatus;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class OrderResponse {
    private UUID orderId;
    private String customerName;
    private String customerEmail;
    private String customerPhone;
    private LocalDateTime orderTime;
    private java.math.BigDecimal totalAmount;
    private OrderStatus status;
    private List<OrderItemResponse> orderItems;
}
