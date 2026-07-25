package com.circuithouse.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

import java.time.LocalDateTime;
import java.util.UUID;
import com.circuithouse.model.ReservationStatus;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Reservation {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private UUID id;

    private LocalDateTime reservationTime;
    private int partySize;
    private String customerName;
    private String customerEmail;
    private String customerPhone;

    @Enumerated(EnumType.STRING)
    private ReservationStatus status = ReservationStatus.PENDING;
}