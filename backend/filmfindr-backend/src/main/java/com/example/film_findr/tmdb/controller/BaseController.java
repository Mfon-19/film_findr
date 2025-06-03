package com.example.film_findr.tmdb.controller;

import com.example.film_findr.exceptions.DownstreamServiceException;
import com.example.film_findr.tmdb.AuthenticationHandler;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.server.ResponseStatusException;
import reactor.core.publisher.Mono;

import java.util.Map;

@RequiredArgsConstructor
public abstract class BaseController {
    protected final AuthenticationHandler authHandler;

    protected <T> Mono<ResponseEntity<T>> authenticatedRequest(
            String authHeader,
            Mono<T> serviceCall) {
        return authHandler.validateToken(authHeader)
                .then(serviceCall)
                .map(ResponseEntity::ok)
                .onErrorMap(DownstreamServiceException.class, ex ->
                        new ResponseStatusException(HttpStatus.BAD_GATEWAY,
                                "TMDB request failed: " + ex.getMessage(), ex));
    }

    protected String extractRequestParam(Map<String, String> request, String key) {
        return request.get(key);
    }
}
