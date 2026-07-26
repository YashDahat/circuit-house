package com.circuithouse.model;

public enum OrderStatus {
    PENDING_PAYMENT,
    RECEIVED,
    PREPARING,
    READY_FOR_DELIVERY,
    OUT_FOR_DELIVERY,
    DELIVERED,
    CANCELLED
}
