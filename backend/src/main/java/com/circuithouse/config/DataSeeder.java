package com.circuithouse.config;

import com.circuithouse.model.Role;
import com.circuithouse.model.User;
import com.circuithouse.repository.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

@Configuration
public class DataSeeder {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public DataSeeder(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Bean
    public CommandLineRunner initDatabase() {
        return args -> {
            if (userRepository.findByEmail("admin@example.com").isEmpty()) {
                User adminUser = User.builder()
                        .firstName("Admin")
                        .lastName("User")
                        .email("admin@example.com")
                        .password(passwordEncoder.encode("password"))
                        .role(Role.ID) // Assuming Role.ID is intended for ADMIN, adjust if necessary
                        .build();
                userRepository.save(adminUser);
                System.out.println("Admin user created: " + adminUser.getEmail());
            }

            if (userRepository.findByEmail("user@example.com").isEmpty()) {
                User regularUser = User.builder()
                        .firstName("Regular")
                        .lastName("User")
                        .email("user@example.com")
                        .password(passwordEncoder.encode("password"))
                        .role(Role.NAME) // Assuming Role.NAME is intended for regular user, adjust if necessary
                        .build();
                userRepository.save(regularUser);
                System.out.println("Regular user created: " + regularUser.getEmail());
            }
        };
    }
}