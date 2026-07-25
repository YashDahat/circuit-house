package com.circuithouse.dto;

import jakarta.validation.constraints.*;
import java.util.List;
import java.util.UUID;
import java.time.LocalDateTime;
import lombok.Data;
import lombok.Builder;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import com.circuithouse.model.ReservationStatus;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ReservationDto {
    private UUID id;
    private LocalDateTime reservationTime;
    private Integer partySize;
    private String customerName;
    private String customerEmail;
    private String customerPhone;
    private ReservationStatus status;
}
