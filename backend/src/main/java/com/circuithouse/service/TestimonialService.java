package com.circuithouse.service;

import com.circuithouse.dto.TestimonialDto;
import com.circuithouse.exception.ResourceNotFoundException;
import com.circuithouse.model.Testimonial;
import com.circuithouse.repository.TestimonialRepository;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class TestimonialService {

    private final TestimonialRepository testimonialRepository;

    public TestimonialService(TestimonialRepository testimonialRepository) {
        this.testimonialRepository = testimonialRepository;
    }

    public List<TestimonialDto> getAllApprovedTestimonials() {
        return testimonialRepository.findByApprovedTrueOrderByDateDesc().stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    public List<TestimonialDto> getAllTestimonials() {
        return testimonialRepository.findAll(Sort.by(Sort.Direction.DESC, "date")).stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    public TestimonialDto getTestimonialById(UUID id) {
        Testimonial testimonial = testimonialRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Testimonial not found with id: " + id));
        return convertToDto(testimonial);
    }

    public TestimonialDto createTestimonial(TestimonialDto testimonialDto) {
        if (testimonialDto.getRating() == null || testimonialDto.getRating() < 1 || testimonialDto.getRating() > 5) {
            throw new IllegalArgumentException("Rating must be between 1 and 5.");
        }

        Testimonial testimonial = convertToEntity(testimonialDto);
        testimonial.setDate(LocalDateTime.now());
        testimonial.setApproved(false);
        Testimonial savedTestimonial = testimonialRepository.save(testimonial);
        return convertToDto(savedTestimonial);
    }

    public TestimonialDto updateTestimonial(UUID id, TestimonialDto testimonialDto) {
        Testimonial existingTestimonial = testimonialRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Testimonial not found with id: " + id));

        if (testimonialDto.getRating() == null || testimonialDto.getRating() < 1 || testimonialDto.getRating() > 5) {
            throw new IllegalArgumentException("Rating must be between 1 and 5.");
        }

        existingTestimonial.setAuthor(testimonialDto.getAuthor());
        existingTestimonial.setContent(testimonialDto.getContent());
        existingTestimonial.setRating(testimonialDto.getRating());
        existingTestimonial.setApproved(testimonialDto.getApproved());

        Testimonial updatedTestimonial = testimonialRepository.save(existingTestimonial);
        return convertToDto(updatedTestimonial);
    }

    public void deleteTestimonial(UUID id) {
        if (!testimonialRepository.existsById(id)) {
            throw new ResourceNotFoundException("Testimonial not found with id: " + id);
        }
        testimonialRepository.deleteById(id);
    }

    private TestimonialDto convertToDto(Testimonial testimonial) {
        return TestimonialDto.builder()
                .id(testimonial.getId())
                .author(testimonial.getAuthor())
                .content(testimonial.getContent())
                .rating(testimonial.getRating())
                .date(testimonial.getDate())
                .approved(testimonial.isApproved())
                .build();
    }

    private Testimonial convertToEntity(TestimonialDto testimonialDto) {
        return new Testimonial(
                testimonialDto.getId(),
                testimonialDto.getAuthor(),
                testimonialDto.getContent(),
                testimonialDto.getRating(),
                testimonialDto.getDate(),
                testimonialDto.getApproved()
        );
    }
}