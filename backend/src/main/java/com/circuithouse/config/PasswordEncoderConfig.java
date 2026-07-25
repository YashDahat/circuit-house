package com.circuithouse.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

/**
 * Extracted from the security configuration so the encoder bean has no
 * dependencies (can never participate in a bean cycle) and is guaranteed
 * to actually be registered (a plain, un-@Bean'd factory method compiles
 * clean but registers nothing).
 */
@Configuration
public class PasswordEncoderConfig {

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
}
