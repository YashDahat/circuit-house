package com.circuithouse.service;

import org.springframework.stereotype.Service;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import com.circuithouse.service.NotificationService;

@Service
public class WhatsAppNotificationService implements NotificationService {

    private static final Logger logger = LoggerFactory.getLogger(WhatsAppNotificationService.class);

    @Override
    public void sendNotification(String recipient, String subject, String message) {
        // In a real application, this would integrate with a WhatsApp Business API provider
        // For demonstration purposes, we'll just log the notification details.
        logger.info("Sending WhatsApp notification to: {}", recipient);
        logger.info("Subject: {}", subject);
        logger.info("Message: {}", message);
        logger.info("WhatsApp API integration logic would go here.");

        // Example of error handling (would be more robust in a real scenario)
        try {
            // Simulate API call success/failure
            boolean apiCallSuccessful = true; // Replace with actual API call
            if (!apiCallSuccessful) {
                throw new RuntimeException("Failed to send WhatsApp message via API.");
            }
            logger.info("WhatsApp notification sent successfully to {}", recipient);
        } catch (Exception e) {
            logger.error("Error sending WhatsApp notification to {}: {}", recipient, e.getMessage());
            // Do not rethrow, as notifications are often a secondary concern
        }
    }
}