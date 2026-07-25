package com.circuithouse.repository;

import com.circuithouse.model.Reservation;
import com.circuithouse.model.ReservationStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Repository
public interface ReservationRepository extends JpaRepository<Reservation, UUID> {
    List<Reservation> findByReservationTime(LocalDateTime reservationTime);
    List<Reservation> findByStatus(ReservationStatus status);
    List<Reservation> findByCustomerEmail(String customerEmail);
}