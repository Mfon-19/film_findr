package com.example.film_findr.tmdb.controller;

import com.example.film_findr.auth.service.JwtService;
import com.example.film_findr.exceptions.DownstreamServiceException;
import com.example.film_findr.tmdb.dto.movie.MovieDetailsResultEnriched;
import com.example.film_findr.tmdb.dto.movie.MovieResultEnriched;
import com.example.film_findr.tmdb.dto.tv.TvDetailsEnriched;
import com.example.film_findr.tmdb.dto.tv.TvResultEnriched;
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

    @GetMapping("/top-rated")
    public Mono<ResponseEntity<List<TvResultEnriched>>> topRated(
            @RequestHeader(HttpHeaders.AUTHORIZATION) String authHeader) {

        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            return Mono.error(new ResponseStatusException(
                    HttpStatus.BAD_REQUEST, "Missing Bearer access token"));
        }

        String token = authHeader.substring("Bearer ".length()).trim();

        return Mono.fromCallable(() -> jwt.parseAccessToken(token))
                .onErrorMap(JwtException.class,
                        ex -> new JwtException("Token invalid or expired", ex))
                .flatMap(ok -> tmdb.topRatedShowsWithPosterAndNames())
                .map(ResponseEntity::ok)
                .onErrorMap(DownstreamServiceException.class, ex ->
                        new ResponseStatusException(HttpStatus.BAD_GATEWAY, "TMDB request failed: " + ex.getMessage(), ex));
    }

    @PostMapping("/similar")
    public Mono<ResponseEntity<List<TvResultEnriched>>> similar(
            @RequestHeader(HttpHeaders.AUTHORIZATION) String authHeader, @RequestBody Map<String, String> request) {

        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            return Mono.error(new ResponseStatusException(
                    HttpStatus.BAD_REQUEST, "Missing Bearer access token"));
        }

        String id = request.get("id");
        String token = authHeader.substring("Bearer ".length()).trim();

        return Mono.fromCallable(() -> jwt.parseAccessToken(token))
                .then(tmdb.similarShowsWithnames(id))
                .map(ResponseEntity::ok)
                .onErrorResume(e -> Mono.error(
                        new ResponseStatusException(
                                HttpStatus.UNAUTHORIZED, "Token is expired or invalid", e)));
    }

    @PostMapping("/show-details")
    public Mono<ResponseEntity<TvDetailsEnriched>> showDetails(
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
                .flatMap(ok -> tmdb.showByIdWithPoster(id))
                .map(ResponseEntity::ok)
                .onErrorMap(DownstreamServiceException.class, ex ->
                        new ResponseStatusException(HttpStatus.BAD_GATEWAY, "TMDB request failed: " + ex.getMessage(), ex));
    }

    @GetMapping("/discover")
    public Mono<ResponseEntity<List<TvResultEnriched>>> discover(
            @RequestHeader(HttpHeaders.AUTHORIZATION) String authHeader) {

        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            return Mono.error(new ResponseStatusException(
                    HttpStatus.BAD_REQUEST, "Missing Bearer access token"));
        }

        String token = authHeader.substring("Bearer ".length()).trim();

        return Mono.fromCallable(() -> jwt.parseAccessToken(token))
                .then(tmdb.discoverShowsWithNames())
                .map(ResponseEntity::ok)
                .onErrorResume(e -> Mono.error(
                        new ResponseStatusException(
                                HttpStatus.UNAUTHORIZED, "Token is expired or invalid", e)));
    }

}
