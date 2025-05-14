package com.example.film_findr.tmdb.controller;

import com.example.film_findr.auth.service.JwtService;
import com.example.film_findr.tmdb.dto.movie.MovieResultEnriched;
import com.example.film_findr.tmdb.dto.tv.TvResultEnriched;
import com.example.film_findr.tmdb.service.TmdbService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;
import reactor.core.publisher.Mono;

import java.util.List;

@RestController
@RequestMapping("/api/tv")
@RequiredArgsConstructor
public class TvController {
    private final TmdbService tmdb;
    private final JwtService jwt;

    @GetMapping("/trending")
    public Mono<ResponseEntity<List<TvResultEnriched>>> trending(
            @RequestHeader(HttpHeaders.AUTHORIZATION) String authHeader) {

        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            return Mono.error(new ResponseStatusException(
                    HttpStatus.BAD_REQUEST, "Missing Bearer access token"));
        }

        String token = authHeader.substring("Bearer ".length()).trim();

        return Mono.fromCallable(() -> jwt.parseAccessToken(token))
                .then(tmdb.trendingShowsWithPosterAndNames())
                .map(ResponseEntity::ok)
                .onErrorResume(e -> Mono.error(
                        new ResponseStatusException(
                                HttpStatus.UNAUTHORIZED, "Token is expired or invalid", e)));
    }
}
