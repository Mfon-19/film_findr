package com.example.film_findr.tmdb.dto;

public record SeasonRequest(
        String seriesId,
        int seasons
) {
}
