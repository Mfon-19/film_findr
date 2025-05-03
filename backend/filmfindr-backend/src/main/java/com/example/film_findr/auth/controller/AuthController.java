package com.example.film_findr.auth.controller;

import com.example.film_findr.auth.dto.LoginRequest;
import com.example.film_findr.auth.dto.LoginResponse;
import com.example.film_findr.auth.dto.RegisterRequest;
import com.example.film_findr.auth.service.UserService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

/**
 * Handles email-password registration, login, and refresh-token exchange.
 * <p>
 * Access- and refresh-tokens are returned in the JSON body so that
 * Auth.js on the Next.js side can store them however it likes.
 */
@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {
    private final UserService userService;

    /**
     * Handles user registration requests.
     * <p>
     * Accepts a {@link RegisterRequest}, processes the registration,
     * and returns a {@link LoginResponse} with HTTP status {@code 201 Created}.
     */
    @PostMapping("/register")
    public ResponseEntity<LoginResponse> register(
            @Valid @RequestBody RegisterRequest request
    ) {
        LoginResponse loginResponse = userService.register(request);
        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(loginResponse);
    }

    /**
     * Handles user login requests.
     * <p>
     * Accepts a {@link LoginRequest}, processes the login,
     * and returns a {@link LoginResponse} with HTTP status {@code 200 OK}.
     */
    @PostMapping("/login")
    public ResponseEntity<LoginResponse> login(
            @Valid @RequestBody LoginRequest request
    ) {
        LoginResponse loginResponse = userService.login(request);
        return ResponseEntity.ok(loginResponse);
    }

    /**
     * Refreshes the access token using the provided refresh token.
     * <p>
     * Expects a Bearer token in the {@code Authorization} header.
     * Returns a new {@link LoginResponse} containing refreshed tokens.
     */
    @PostMapping("/refresh")
    public ResponseEntity<LoginResponse> refresh(
            @RequestHeader(HttpHeaders.AUTHORIZATION) String authHeader) {

        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST, "Missing Bearer refresh token");
        }

        String refreshToken = authHeader.substring("Bearer ".length()).trim();

        try {
            LoginResponse loginResponse = userService.refresh(refreshToken);
            return ResponseEntity.ok(loginResponse);

        } catch (Exception e) {
            throw new ResponseStatusException(
                    HttpStatus.UNAUTHORIZED, "Token is expired or invalid");
        }
    }
}
