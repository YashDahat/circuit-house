package com.circuithouse.service;

import com.circuithouse.dto.CreateReservationRequest;
import com.circuithouse.dto.ReservationDto;
import com.circuithouse.dto.UpdateReservationStatusRequest;
import com.circuithouse.exception.ResourceNotFoundException;
import com.circuithouse.model.Reservation;
import com.circuithouse.model.ReservationStatus;
import com.circuithouse.repository.ReservationRepository;
import com.circuithouse.service.NotificationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class ReservationService {

    private final ReservationRepository reservationRepository;
    private final NotificationService notificationService;

    @Autowired
    public ReservationService(ReservationRepository reservationRepository, NotificationService notificationService) {
        this.reservationRepository = reservationRepository;
        this.notificationService = notificationService;
    }

    public ReservationDto createReservation(CreateReservationRequest request) {
        // 1. Validate the incoming request (already handled by DTO annotations and controller validation)

        // 2. Check for table availability (simple check: no overlapping reservations for now)
        // This is a simplified check. A real system would have tables, capacities, etc.
        // For now, let's assume a maximum of 10 guests per reservation and no more than 5 active reservations at any 1-hour slot.
        LocalDateTime startTime = request.getReservationTime().minusMinutes(30);
        LocalDateTime endTime = request.getReservationTime().plusMinutes(30);
        List<Reservation> overlappingReservations = reservationRepository.findByReservationTimeBetween(startTime, endTime);

        if (overlappingReservations.size() >= 5) { // Example: max 5 concurrent reservations
            throw new IllegalArgumentException("No tables available at the requested time.");
        }
        if (request.getNumberOfGuests() < 1 || request.getNumberOfGuests() > 20) {
            throw new IllegalArgumentException("Number of guests must be between 1 and 20.");
        }

        // 3. Creates a new Reservation entity with PENDING status.
        Reservation reservation = new Reservation();
        reservation.setCustomerName(request.getCustomerName());
        reservation.setCustomerEmail(request.getCustomerEmail());
        reservation.setCustomerPhone(request.getCustomerPhone());
        reservation.setReservationTime(request.getReservationTime());
        reservation.setNumberOfGuests(request.getNumberOfGuests());
        reservation.setStatus(ReservationStatus.PENDING);
        reservation.setNotes(request.getNotes());

        // 4. Saves the reservation using reservationRepository.save().
        Reservation savedReservation = reservationRepository.save(reservation);

        // 5. Calls notificationService.sendNotification
        notificationService.sendNotification(
                request.getCustomerEmail(),
                "Reservation Confirmation - Circuit House",
                "Your reservation for " + request.getNumberOfGuests() + " guests at " + request.getReservationTime() + " is pending confirmation."
        );

        // 6. Returns a ReservationDto representation of the created reservation.
        return convertToDto(savedReservation);
    }

    public ReservationDto getReservationById(UUID id) {
        Reservation reservation = reservationRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Reservation not found with id: " + id));
        return convertToDto(reservation);
    }

    public List<ReservationDto> getAllReservations() {
        return reservationRepository.findAll().stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    public List<ReservationDto> getReservationsByStatus(ReservationStatus status) {
        return reservationRepository.findByStatus(status).stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    public ReservationDto updateReservationStatus(UUID id, UpdateReservationStatusRequest request) {
        Reservation reservation = reservationRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Reservation not found with id: " + id));

        ReservationStatus oldStatus = reservation.getStatus();
        reservation.setStatus(request.getStatus());
        reservation.setNotes(request.getNotes());

        Reservation updatedReservation = reservationRepository.save(reservation);

        // Send notification based on status change
        if (request.getStatus() == ReservationStatus.CONFIRMED && oldStatus != ReservationStatus.CONFIRMED) {
            notificationService.sendNotification(
                    reservation.getCustomerEmail(),
                    "Reservation Confirmed - Circuit House",
                    "Your reservation for " + reservation.getNumberOfGuests() + " guests at " + reservation.getReservationTime() + " has been confirmed."
            );
        } else if (request.getStatus() == ReservationStatus.CANCELLED && oldStatus != ReservationStatus.CANCELLED) {
            notificationService.sendNotification(
                    reservation.getCustomerEmail(),
                    "Reservation Cancelled - Circuit House",
                    "Your reservation for " + reservation.getNumberOfGuests() + " guests at " + reservation.getReservationTime() + " has been cancelled."
            );
        }

        return convertToDto(updatedReservation);
    }

    public void deleteReservation(UUID id) {
        if (!reservationRepository.existsById(id)) {
            throw new ResourceNotFoundException("Reservation not found with id: " + id);
        }
        reservationRepository.deleteById(id);
    }

    private ReservationDto convertToDto(Reservation reservation) {
        return ReservationDto.builder()
                .id(reservation.getId())
                .customerName(reservation.getCustomerName())
                .customerEmail(reservation.getCustomerEmail())
                .customerPhone(reservation.getCustomerPhone())
                .reservationTime(reservation.getReservationTime())
                .numberOfGuests(reservation.getNumberOfGuests())
                .status(reservation.getStatus())
                .notes(reservation.getNotes())
                .build();
    }
}