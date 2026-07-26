package com.circuithouse.service;

import org.springframework.stereotype.Service;
import com.circuithouse.service.NotificationService;

@Service
public class EmailNotificationService implements NotificationService {

    @Override
    public void sendNotification(String recipientEmail, String subject, String body) {
        // In a real application, this would integrate with an email sending library
        // like JavaMailSender, SendGrid, or AWS SES.
        // For this exercise, we will just log the email details.
        System.out.println("Sending email to: " + recipientEmail);
        System.out.println("Subject: " + subject);
        System.out.println("Body: " + body);
        System.out.println("Email sent successfully (simulated).");
    }
}