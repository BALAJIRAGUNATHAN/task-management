package com.nexus.api.service;

import com.nexus.api.dto.AuthRequest;
import com.nexus.api.dto.AuthResponse;
import com.nexus.api.dto.RegisterRequest;
import com.nexus.api.model.Role;
import com.nexus.api.model.User;
import com.nexus.api.repository.UserRepository;
import com.nexus.api.security.JwtService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthService {

        private final UserRepository repository;
        private final PasswordEncoder passwordEncoder;
        private final JwtService jwtService;
        private final AuthenticationManager authenticationManager;
        // private final CaptchaService captchaService; // Disabled for local testing

        public AuthResponse register(RegisterRequest request) {
                var user = User.builder()
                                .fullName(request.getFullName())
                                .email(request.getEmail())
                                .password(passwordEncoder.encode(request.getPassword()))
                                .role(Role.USER)
                                .build();
                repository.save(user);
                var jwtToken = jwtService.generateToken(user);
                return AuthResponse.builder()
                                .token(jwtToken)
                                .build();
        }

        public AuthResponse authenticate(AuthRequest request) {
                // Disabled for local testing without Redis
                // if (!captchaService.verifyToken(request.getCaptchaToken())) {
                // throw new RuntimeException("Invalid Captcha");
                // }

                authenticationManager.authenticate(
                                new UsernamePasswordAuthenticationToken(
                                                request.getEmail(),
                                                request.getPassword()));
                var user = repository.findByEmail(request.getEmail())
                                .orElseThrow();
                var jwtToken = jwtService.generateToken(user);
                return AuthResponse.builder()
                                .token(jwtToken)
                                .build();
        }
}
