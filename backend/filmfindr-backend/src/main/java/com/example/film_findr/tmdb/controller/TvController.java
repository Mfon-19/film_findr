package com.example.film_findr.tmdb.controller;

import com.example.film_findr.tmdb.AuthenticationHandler;
import com.example.film_findr.tmdb.dto.SeasonRequest;
import com.example.film_findr.tmdb.dto.tv.SeasonDetails;
import com.example.film_findr.tmdb.dto.tv.TvDetailsEnriched;
import com.example.film_findr.tmdb.dto.tv.TvResultEnriched;
import com.example.film_findr.tmdb.service.TmdbService;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Mono;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/tv")
public class TvController extends BaseController {
    private final TmdbService tmdbService;

    public TvController(AuthenticationHandler authHandler, TmdbService tmdbService) {
        super(authHandler);
        this.tmdbService = tmdbService;
    }

    @GetMapping("/trending")
    public Mono<ResponseEntity<List<TvResultEnriched>>> trending(
            @RequestHeader(HttpHeaders.AUTHORIZATION) String authHeader) {
        return authenticatedRequest(authHeader, tmdbService.getTrendingShowsEnriched());
    }

    @GetMapping("/top-rated")
    public Mono<ResponseEntity<List<TvResultEnriched>>> topRated(
            @RequestHeader(HttpHeaders.AUTHORIZATION) String authHeader) {
        return authenticatedRequest(authHeader, tmdbService.getTopRatedShowsEnriched());
    }

    @PostMapping("/similar")
    public Mono<ResponseEntity<List<TvResultEnriched>>> similar(
            @RequestHeader(HttpHeaders.AUTHORIZATION) String authHeader,
            @RequestBody Map<String, String> request) {
        String id = extractRequestParam(request, "id");
        return authenticatedRequest(authHeader, tmdbService.getSimilarShowsEnriched(id));
    }

    @PostMapping("/show-details")
    public Mono<ResponseEntity<TvDetailsEnriched>> showDetails(
            @RequestHeader(HttpHeaders.AUTHORIZATION) String authHeader,
            @RequestBody Map<String, String> request) {
        String id = extractRequestParam(request, "id");
        return authenticatedRequest(authHeader, tmdbService.getShowByIdEnriched(id));
    }

    @PostMapping("/discover")
    public Mono<ResponseEntity<List<TvResultEnriched>>> discover(
            @RequestHeader(HttpHeaders.AUTHORIZATION) String authHeader,
            @RequestBody Map<String, String> request) {
        String page = extractRequestParam(request, "page");
        return authenticatedRequest(authHeader, tmdbService.discoverShowsEnriched(page));
    }

    @PostMapping("/search")
    public Mono<ResponseEntity<List<TvResultEnriched>>> search(
            @RequestHeader(HttpHeaders.AUTHORIZATION) String authHeader,
            @RequestBody Map<String, String> request) {
        String query = extractRequestParam(request, "query");
        return authenticatedRequest(authHeader, tmdbService.searchShowsEnriched(query));
    }
}