package com.circuithouse.service;

import com.circuithouse.model.Order;
import com.circuithouse.model.Reservation;
import org.springframework.stereotype.Service;

@Service
public class NotificationService {

    public void sendOrderConfirmation(Order order) {
        String subject = "Order Confirmation - Circuit House";
        String body = String.format(
                "Dear %s,\n\n" +
                        "Thank you for your order with Circuit House. Your order #%s has been confirmed.\n\n" +
                        "Order Details:\n" +
                        "Total Amount: %.2f\n" +
                        "Delivery Address: %s\n" +
                        "Order Time: %s\n" +
                        "Status: %s\n\n" +
                        "We will notify you once your order is out for delivery.\n\n" +
                        "Sincerely,\n" +
                        "The Circuit House Team",
                order.getCustomerName(),
                order.getId().toString(),
                order.getTotalAmount(),
                order.getDeliveryAddress(),
                order.getOrderTime().toString(),
                order.getStatus().toString()
        );
        sendEmail(order.getCustomerEmail(), subject, body);
    }

    public void sendReservationConfirmation(Reservation reservation) {
        String subject = "Reservation Confirmation - Circuit House";
        String body = String.format(
                "Dear %s,\n\n" +
                        "Your reservation at Circuit House has been confirmed.\n\n" +
                        "Reservation Details:\n" +
                        "Reservation ID: %s\n" +
                        "Time: %s\n" +
                        "Number of Guests: %d\n" +
                        "Status: %s\n\n" +
                        "We look forward to seeing you!\n\n" +
                        "Sincerely,\n" +
                        "The Circuit House Team",
                reservation.getCustomerName(),
                reservation.getId().toString(),
                reservation.getReservationTime().toString(),
                reservation.getNumberOfGuests(),
                reservation.getStatus().toString()
        );
        sendEmail(reservation.getCustomerEmail(), subject, body);
    }

    private void sendEmail(String to, String subject, String body) {
        // In a real application, this would integrate with an actual email sending service
        // (e.g., JavaMailSender, SendGrid, Mailgun).
        // For this exercise, we will just print to console.
        System.out.println("--- Sending Email ---");
        System.out.println("To: " + to);
        System.out.println("Subject: " + subject);
        System.out.println("Body:\n" + body);
        System.out.println("---------------------\n");
    }
}