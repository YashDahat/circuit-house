package com.circuithouse.config;

import com.circuithouse.model.Role;
import com.circuithouse.model.User;
import com.circuithouse.repository.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Component
public class AdminInitializer implements CommandLineRunner {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public AdminInitializer(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public void run(String... args) throws Exception {
        if (userRepository.count() == 0) {
            User adminUser = User.builder()
                    .firstName("Admin")
                    .lastName("User")
                    .email("admin@example.com")
                    .password(passwordEncoder.encode("adminpassword"))
                    .role(Role.ID) // Assuming Role.ID represents the admin role based on the provided Role enum
                    .build();
            userRepository.save(adminUser);
            System.out.println("Default admin user created.");
        }
    }
}