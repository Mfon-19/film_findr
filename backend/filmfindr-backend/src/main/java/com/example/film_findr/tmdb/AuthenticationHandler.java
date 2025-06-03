package com.example.film_findr.tmdb;

import com.example.film_findr.auth.service.JwtService;
import io.jsonwebtoken.JwtException;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;
import org.springframework.web.server.ResponseStatusException;
import reactor.core.publisher.Mono;

@Component
@RequiredArgsConstructor
public class AuthenticationHandler {
    private final JwtService jwtService;

    public Mono<Void> validateToken(String authHeader) {
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            return Mono.error(new ResponseStatusException(
                    HttpStatus.BAD_REQUEST, "Missing Bearer access token"));
        }

        String token = authHeader.substring("Bearer ".length()).trim();

        return Mono.fromCallable(() -> jwtService.parseAccessToken(token))
                .onErrorMap(JwtException.class,
                        ex -> new ResponseStatusException(HttpStatus.UNAUTHORIZED,
                                "Token is expired or invalid", ex))
                .then();
    }
}
