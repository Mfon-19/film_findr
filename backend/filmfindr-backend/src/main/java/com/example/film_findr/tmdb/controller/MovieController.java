package com.example.film_findr.tmdb.controller;

import com.example.film_findr.auth.service.JwtService;
import com.example.film_findr.exceptions.DownstreamServiceException;
import com.example.film_findr.tmdb.dto.movie.MovieDetailsResultEnriched;
import com.example.film_findr.tmdb.dto.movie.MovieResultEnriched;
import com.example.film_findr.tmdb.service.TmdbService;
import io.jsonwebtoken.JwtException;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;
import reactor.core.publisher.Mono;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/movies")
@RequiredArgsConstructor
public class MovieController {
    private final TmdbService tmdb;
    private final JwtService jwt;

    @GetMapping("/trending")
    public Mono<ResponseEntity<List<MovieResultEnriched>>> trending(
            @RequestHeader(HttpHeaders.AUTHORIZATION) String authHeader) {

        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            return Mono.error(new ResponseStatusException(
                    HttpStatus.BAD_REQUEST, "Missing Bearer access token"));
        }

        String token = authHeader.substring("Bearer ".length()).trim();

        return Mono.fromCallable(() -> jwt.parseAccessToken(token))
                .then(tmdb.trendingWithNames())
                .map(ResponseEntity::ok)
                .onErrorResume(e -> Mono.error(
                        new ResponseStatusException(
                                HttpStatus.UNAUTHORIZED, "Token is expired or invalid", e)));
    }

    @PostMapping("/similar")
    public Mono<ResponseEntity<List<MovieResultEnriched>>> similar(
            @RequestHeader(HttpHeaders.AUTHORIZATION) String authHeader, @RequestBody Map<String, String> request) {

        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            return Mono.error(new ResponseStatusException(
                    HttpStatus.BAD_REQUEST, "Missing Bearer access token"));
        }

        String id = request.get("id");
        String token = authHeader.substring("Bearer ".length()).trim();

        return Mono.fromCallable(() -> jwt.parseAccessToken(token))
                .then(tmdb.similarMoviesWithNames(id))
                .map(ResponseEntity::ok)
                .onErrorResume(e -> Mono.error(
                        new ResponseStatusException(
                                HttpStatus.UNAUTHORIZED, "Token is expired or invalid", e)));
    }

    @GetMapping("/discover")
    public Mono<ResponseEntity<List<MovieResultEnriched>>> discover(
            @RequestHeader(HttpHeaders.AUTHORIZATION) String authHeader) {

        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            return Mono.error(new ResponseStatusException(
                    HttpStatus.BAD_REQUEST, "Missing Bearer access token"));
        }

        String token = authHeader.substring("Bearer ".length()).trim();

        return Mono.fromCallable(() -> jwt.parseAccessToken(token))
                .then(tmdb.discoverMoviesWithNames())
                .map(ResponseEntity::ok)
                .onErrorResume(e -> Mono.error(
                        new ResponseStatusException(
                                HttpStatus.UNAUTHORIZED, "Token is expired or invalid", e)));
    }

    @GetMapping("/top-rated")
    public Mono<ResponseEntity<List<MovieResultEnriched>>> topRated(
            @RequestHeader(HttpHeaders.AUTHORIZATION) String authHeader) {

        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            return Mono.error(new ResponseStatusException(
                    HttpStatus.BAD_REQUEST, "Missing Bearer access token"));
        }

        String token = authHeader.substring("Bearer ".length()).trim();

        return Mono.fromCallable(() -> jwt.parseAccessToken(token))
                .onErrorMap(JwtException.class,
                        ex -> new JwtException("Token invalid or expired", ex))
                .flatMap(ok -> tmdb.topRatedWithNames())
                .map(ResponseEntity::ok)
                .onErrorMap(DownstreamServiceException.class, ex ->
                        new ResponseStatusException(HttpStatus.BAD_GATEWAY, "TMDB request failed: " + ex.getMessage(), ex));
    }

    @PostMapping("/movie-details")
    public Mono<ResponseEntity<MovieDetailsResultEnriched>> movieDetails(
            @RequestHeader(HttpHeaders.AUTHORIZATION) String authHeader, @RequestBody Map<String, String> req
    ){
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            return Mono.error(new ResponseStatusException(
                    HttpStatus.BAD_REQUEST, "Missing Bearer access token"));
        }
        String id = req.get("id");
        String token = authHeader.substring("Bearer ".length()).trim();

        return Mono.fromCallable(() -> jwt.parseAccessToken(token))
                .onErrorMap(JwtException.class,
                        ex -> new JwtException("Token invalid or expired", ex))
                .flatMap(ok -> tmdb.moviesByIdWithPoster(id))
                .map(ResponseEntity::ok)
                .onErrorMap(DownstreamServiceException.class, ex ->
                        new ResponseStatusException(HttpStatus.BAD_GATEWAY, "TMDB request failed: " + ex.getMessage(), ex));
    }
}
