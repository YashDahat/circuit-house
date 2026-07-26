package com.circuithouse.controller;

import com.circuithouse.dto.TestimonialDto;
import com.circuithouse.service.TestimonialService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/v1/testimonials")
public class TestimonialController {

    private final TestimonialService testimonialService;

    public TestimonialController(TestimonialService testimonialService) {
        this.testimonialService = testimonialService;
    }

    @GetMapping
    public ResponseEntity<List<TestimonialDto>> getAllApprovedTestimonials() {
        List<TestimonialDto> testimonials = testimonialService.getAllApprovedTestimonials();
        return ResponseEntity.ok(testimonials);
    }
}