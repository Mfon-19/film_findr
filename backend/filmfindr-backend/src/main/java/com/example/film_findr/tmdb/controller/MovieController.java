package com.example.film_findr.tmdb.controller;

import com.example.film_findr.tmdb.AuthenticationHandler;
import com.example.film_findr.tmdb.dto.movie.MovieDetailsResultEnriched;
import com.example.film_findr.tmdb.dto.movie.MovieResultEnriched;
import com.example.film_findr.tmdb.service.TmdbService;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Mono;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/movies")
public class MovieController extends BaseController {
    private final TmdbService tmdbService;

    public MovieController(AuthenticationHandler authHandler, TmdbService tmdbService) {
        super(authHandler);
        this.tmdbService = tmdbService;
    }

    @GetMapping("/trending")
    public Mono<ResponseEntity<List<MovieResultEnriched>>> trending(
            @RequestHeader(HttpHeaders.AUTHORIZATION) String authHeader) {
        return authenticatedRequest(authHeader, tmdbService.getTrendingMoviesEnriched());
    }

    @PostMapping("/similar")
    public Mono<ResponseEntity<List<MovieResultEnriched>>> similar(
            @RequestHeader(HttpHeaders.AUTHORIZATION) String authHeader,
            @RequestBody Map<String, String> request) {
        String id = extractRequestParam(request, "id");
        return authenticatedRequest(authHeader, tmdbService.getSimilarMoviesEnriched(id));
    }

    @PostMapping("/discover")
    public Mono<ResponseEntity<List<MovieResultEnriched>>> discover(
            @RequestHeader(HttpHeaders.AUTHORIZATION) String authHeader,
            @RequestBody Map<String, String> request) {
        String page = extractRequestParam(request, "page");
        return authenticatedRequest(authHeader, tmdbService.discoverMoviesEnriched(page));
    }

    @GetMapping("/top-rated")
    public Mono<ResponseEntity<List<MovieResultEnriched>>> topRated(
            @RequestHeader(HttpHeaders.AUTHORIZATION) String authHeader) {
        return authenticatedRequest(authHeader, tmdbService.getTopRatedMoviesEnriched());
    }

    @PostMapping("/movie-details")
    public Mono<ResponseEntity<MovieDetailsResultEnriched>> movieDetails(
            @RequestHeader(HttpHeaders.AUTHORIZATION) String authHeader,
            @RequestBody Map<String, String> request) {
        String id = extractRequestParam(request, "id");
        return authenticatedRequest(authHeader, tmdbService.getMovieByIdEnriched(id));
    }

    @PostMapping("/search")
    public Mono<ResponseEntity<List<MovieResultEnriched>>> search(
            @RequestHeader(HttpHeaders.AUTHORIZATION) String authHeader,
            @RequestBody Map<String, String> request) {
        String query = extractRequestParam(request, "query");
        return authenticatedRequest(authHeader, tmdbService.searchMoviesEnriched(query));
    }
}
