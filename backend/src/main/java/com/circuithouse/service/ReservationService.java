package com.circuithouse.service;

import com.circuithouse.dto.CreateReservationRequest;
import com.circuithouse.dto.ReservationDto;
import com.circuithouse.exception.ResourceNotFoundException;
import com.circuithouse.model.Reservation;
import com.circuithouse.model.ReservationStatus;
import com.circuithouse.repository.ReservationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class ReservationService {

    private final ReservationRepository reservationRepository;

    @Autowired
    public ReservationService(ReservationRepository reservationRepository) {
        this.reservationRepository = reservationRepository;
    }

    public ReservationDto createReservation(CreateReservationRequest request) {
        // Simple availability check: check if there are any existing reservations within a 1-hour window
        // This is a placeholder; a real system would have more sophisticated table management.
        LocalDateTime startTime = request.getReservationTime().minusHours(1);
        LocalDateTime endTime = request.getReservationTime().plusHours(1);
        List<Reservation> existingReservations = reservationRepository.findByReservationTimeBetween(startTime, endTime);

        // For simplicity, assume only one reservation can be made per hour for any party size.
        // In a real system, this would involve checking available tables, capacity, etc.
        if (!existingReservations.isEmpty()) {
            throw new IllegalStateException("No availability at the requested time.");
        }

        Reservation reservation = new Reservation();
        reservation.setReservationTime(request.getReservationTime());
        reservation.setPartySize(request.getPartySize());
        reservation.setCustomerName(request.getCustomerName());
        reservation.setCustomerEmail(request.getCustomerEmail());
        reservation.setCustomerPhone(request.getCustomerPhone());
        reservation.setStatus(ReservationStatus.PENDING);

        Reservation savedReservation = reservationRepository.save(reservation);
        return mapToDto(savedReservation);
    }

    public ReservationDto getReservationById(UUID id) {
        Reservation reservation = reservationRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Reservation not found with id: " + id));
        return mapToDto(reservation);
    }

    public List<ReservationDto> getAllReservations() {
        return reservationRepository.findAll().stream()
                .map(this::mapToDto)
                .collect(Collectors.toList());
    }

    public List<ReservationDto> getReservationsByStatus(ReservationStatus status) {
        // Assuming findByStatus method exists in repository, if not, it should be added.
        // For now, we'll filter from all reservations.
        return reservationRepository.findAll().stream()
                .filter(reservation -> reservation.getStatus().equals(status))
                .map(this::mapToDto)
                .collect(Collectors.toList());
    }

    public ReservationDto updateReservationStatus(UUID id, ReservationStatus newStatus) {
        Reservation reservation = reservationRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Reservation not found with id: " + id));
        reservation.setStatus(newStatus);
        Reservation updatedReservation = reservationRepository.save(reservation);
        return mapToDto(updatedReservation);
    }

    public void deleteReservation(UUID id) {
        if (!reservationRepository.existsById(id)) {
            throw new ResourceNotFoundException("Reservation not found with id: " + id);
        }
        reservationRepository.deleteById(id);
    }

    private ReservationDto mapToDto(Reservation reservation) {
        return ReservationDto.builder()
                .id(reservation.getId())
                .reservationTime(reservation.getReservationTime())
                .partySize(reservation.getPartySize())
                .customerName(reservation.getCustomerName())
                .customerEmail(reservation.getCustomerEmail())
                .customerPhone(reservation.getCustomerPhone())
                .status(reservation.getStatus())
                .build();
    }
}