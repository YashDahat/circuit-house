package com.circuithouse.service;

public interface NotificationService {
    void sendNotification(String recipient, String subject, String message);
}