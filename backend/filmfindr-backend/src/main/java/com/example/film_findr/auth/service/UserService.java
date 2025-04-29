package com.example.film_findr.auth.service;

import com.example.film_findr.auth.dto.LoginRequest;
import com.example.film_findr.auth.dto.LoginResponse;
import com.example.film_findr.auth.dto.RegisterRequest;
import com.example.film_findr.auth.model.User;
import com.example.film_findr.auth.repository.UserRepository;
import org.springframework.transaction.annotation.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.Duration;

@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;

    /**
     * Registers a new user and immediately returns JWT + refresh-token.
     *
     * @throws IllegalStateException if email already exists
     */
    @Transactional
    public LoginResponse register(RegisterRequest req) {
        if (userRepository.existsByEmail(req.email())) {
            throw new IllegalStateException("Email already in use");
        }

        User user = User.builder()
                .email(req.email())
                .username(req.username())
                .passwordHash(passwordEncoder.encode(req.password()))
                .roles("USER")
                .build();

        userRepository.save(user);

        return buildTokens(user);
    }

    /**
     * Authenticates email-password and returns fresh JWT + refresh-token
     */
    @Transactional(readOnly = true)
    public LoginResponse login(LoginRequest req) {
        User user = userRepository.findByEmailIgnoreCase(req.email())
                .orElseThrow(() -> new IllegalStateException("Invalid credentials"));

        if (!passwordEncoder.matches(req.password(), user.getPasswordHash())) {
            throw new IllegalStateException("Invalid credentials");
        }

        return buildTokens(user);
    }

    /**
     * Exchanges a valid refresh token for a new access token.
     */
    public LoginResponse refresh(String refreshToken) {
        String email = jwtService.parseRefreshToken(refreshToken);
        User user = userRepository.findByEmailIgnoreCase(email)
                .orElseThrow(() -> new IllegalArgumentException("User not found"));

        return buildTokens(user);
    }

    private LoginResponse buildTokens(User user) {
        Duration accessTtl = Duration.ofMinutes(15);
        Duration refreshTtl = Duration.ofDays(7);

        String accessToken = jwtService.issueAccessToken(
                user.getId(), user.getEmail(), user.getRoles(), accessTtl
        );

        String refreshToken = jwtService.issueRefreshToken(
                user.getId(), user.getEmail(), refreshTtl
        );

        return new LoginResponse(
                accessToken,
                accessTtl.toSeconds(),
                refreshToken,
                refreshTtl.toSeconds(),
                user
        );
    }
}
