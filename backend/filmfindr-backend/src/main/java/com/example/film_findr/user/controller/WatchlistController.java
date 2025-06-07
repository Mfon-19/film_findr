package com.example.film_findr.user.controller;

import com.example.film_findr.auth.service.JwtService;
import com.example.film_findr.user.dto.AddToWatchlistRequest;
import com.example.film_findr.user.dto.Content;
import com.example.film_findr.user.dto.RemoveWatchlistRequest;
import com.example.film_findr.user.dto.Watchlist;
import io.jsonwebtoken.JwtException;
import org.springframework.http.HttpHeaders;
import com.example.film_findr.user.service.WatchlistService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;
import reactor.core.publisher.Mono;

import java.util.List;
import java.util.Map;
import java.util.UUID;

@RequestMapping("/api/user")
@RequiredArgsConstructor
@RestController
public class WatchlistController {
    private final WatchlistService watchlistService;
    private final JwtService jwtService;

    @PostMapping("/add-to-watchlist")
    public void addToWatchlist(@RequestBody AddToWatchlistRequest req,
                               @RequestHeader(HttpHeaders.AUTHORIZATION) String authHeader){
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST, "Missing Bearer refresh token");
        }

        String token = authHeader.substring("Bearer ".length()).trim();

        if (jwtService.parseAccessToken(token).isEmpty()) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED,
                    "Token is expired or invalid");
        }

        watchlistService.addToWatchlist(req.userId(), req.content());
    }

    @DeleteMapping("/remove-from-watchlist")
    public void removeFromWatchlist(@RequestBody RemoveWatchlistRequest req,
                                    @RequestHeader(HttpHeaders.AUTHORIZATION) String authHeader){

        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST, "Missing Bearer refresh token");
        }

        String token = authHeader.substring("Bearer ".length()).trim();

        if (jwtService.parseAccessToken(token).isEmpty()) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED,
                    "Token is expired or invalid");
        }

        watchlistService.removeFromWatchlist(req.userId(), req.contentId());
    }

    @PostMapping("/get-watchlist")
    public List<Content> getWatchlist(@RequestHeader(HttpHeaders.AUTHORIZATION) String authHeader, @RequestBody Map<String, String> req){
        System.out.println("Request is: "+req);
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST, "Missing Bearer refresh token");
        }

        String token = authHeader.substring("Bearer ".length()).trim();

        if (jwtService.parseAccessToken(token).isEmpty()) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED,
                    "Token is expired or invalid");
        }

        UUID userId = UUID.fromString(req.get("userId"));

        return watchlistService.getWatchlist(userId);
    }
}
